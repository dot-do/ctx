# Appendix C: Building Your First AI Service

This appendix provides a hands-on tutorial for building a Services-as-Software product. We'll build a simple but functional AI-powered service from scratch, deployable in an afternoon.

## Project: AI Contract Reviewer

We'll build a contract review service that:
- Accepts PDF contracts via upload
- Extracts key terms and obligations
- Identifies potential risks
- Provides a summary and recommendations
- Outputs a structured review report

**Target users**: Small businesses, freelancers, individuals who can't afford $300/hour lawyers

**Business model**: $29/contract or $99/month subscription (5 contracts)

**Time to build**: 4-6 hours (with this guide)

**Monthly costs at 1000 contracts/month**: ~$100-150

## Prerequisites

- Basic programming knowledge (Python or TypeScript)
- OpenAI API key ($5-10 credit is enough to start)
- (Optional) Cloudflare account for deployment

## Architecture

```
User Interface (HTML/JS)
       ↓
API Endpoint (Cloudflare Worker or Flask)
       ↓
PDF Parser (PyPDF2 or pdf-parse)
       ↓
OpenAI GPT-4 (Contract analysis)
       ↓
Response Formatter
       ↓
PDF Report Generator
```

## Step 1: Set Up Environment

### Option A: Python + Flask
```bash
mkdir ai-contract-reviewer
cd ai-contract-reviewer

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

pip install flask openai PyPDF2 reportlab python-dotenv

# Create .env file
echo "OPENAI_API_KEY=your_key_here" > .env
```

### Option B: TypeScript + Cloudflare Workers
```bash
mkdir ai-contract-reviewer
cd ai-contract-reviewer

npm create cloudflare@latest
# Choose: basic worker template

npm install openai pdf-parse
```

## Step 2: PDF Text Extraction

### Python Version (extract_pdf.py)
```python
import PyPDF2
from typing import List

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract text from PDF file"""
    text = ""

    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        num_pages = len(pdf_reader.pages)

        for page_num in range(num_pages):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()

    return text

def chunk_text(text: str, chunk_size: int = 4000) -> List[str]:
    """Split text into manageable chunks for AI processing"""
    words = text.split()
    chunks = []
    current_chunk = []
    current_length = 0

    for word in words:
        current_length += len(word) + 1
        if current_length > chunk_size:
            chunks.append(' '.join(current_chunk))
            current_chunk = [word]
            current_length = len(word)
        else:
            current_chunk.append(word)

    if current_chunk:
        chunks.append(' '.join(current_chunk))

    return chunks
```

### TypeScript Version (extract.ts)
```typescript
import pdfParse from 'pdf-parse';

export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
    const data = await pdfParse(pdfBuffer);
    return data.text;
}

export function chunkText(text: string, chunkSize: number = 4000): string[] {
    const words = text.split(' ');
    const chunks: string[] = [];
    let currentChunk: string[] = [];
    let currentLength = 0;

    for (const word of words) {
        currentLength += word.length + 1;
        if (currentLength > chunkSize) {
            chunks.push(currentChunk.join(' '));
            currentChunk = [word];
            currentLength = word.length;
        } else {
            currentChunk.push(word);
        }
    }

    if (currentChunk.length > 0) {
        chunks.push(currentChunk.join(' '));
    }

    return chunks;
}
```

## Step 3: AI Contract Analysis

### Python Version (analyze.py)
```python
import os
from openai import OpenAI
from typing import Dict, List
import json

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def analyze_contract(contract_text: str) -> Dict:
    """Analyze contract using GPT-4"""

    system_prompt = """You are an expert contract reviewer. Analyze the provided contract and extract:

1. Contract Type (e.g., Employment, NDA, Service Agreement)
2. Parties Involved
3. Key Terms and Obligations
4. Payment Terms
5. Duration/Term
6. Termination Clauses
7. Potential Risks or Red Flags
8. Missing Standard Clauses
9. Overall Risk Assessment (Low/Medium/High)
10. Recommendations

Provide output as structured JSON."""

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Contract to review:\n\n{contract_text}"}
        ],
        response_format={"type": "json_object"},
        temperature=0.1  # Low temperature for consistency
    )

    result = json.loads(response.choices[0].message.content)
    return result

def analyze_contract_long(chunks: List[str]) -> Dict:
    """Analyze long contracts in multiple passes"""

    # First pass: extract key information from each chunk
    chunk_analyses = []
    for i, chunk in enumerate(chunks):
        print(f"Analyzing chunk {i+1}/{len(chunks)}...")

        analysis = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "Extract key contractual terms, obligations, and risks from this contract section. Output as JSON."
                },
                {"role": "user", "content": chunk}
            ],
            response_format={"type": "json_object"},
            temperature=0.1
        )

        chunk_analyses.append(json.loads(analysis.choices[0].message.content))

    # Second pass: synthesize all chunks
    synthesis_prompt = f"""You are reviewing a contract that was analyzed in {len(chunks)} sections.

Here are the analyses of each section:

{json.dumps(chunk_analyses, indent=2)}

Provide a comprehensive contract review including:
1. Contract Type
2. Parties
3. Key Terms and Obligations
4. Payment Terms
5. Duration
6. Termination Clauses
7. Potential Risks
8. Missing Clauses
9. Risk Assessment
10. Recommendations

Output as JSON."""

    final_analysis = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are an expert contract reviewer."},
            {"role": "user", "content": synthesis_prompt}
        ],
        response_format={"type": "json_object"},
        temperature=0.1
    )

    return json.loads(final_analysis.choices[0].message.content)
```

### TypeScript Version (analyze.ts)
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

interface ContractAnalysis {
    contractType: string;
    parties: string[];
    keyTerms: string[];
    paymentTerms: string;
    duration: string;
    terminationClauses: string[];
    risks: string[];
    missingClauses: string[];
    riskAssessment: 'Low' | 'Medium' | 'High';
    recommendations: string[];
}

export async function analyzeContract(contractText: string): Promise<ContractAnalysis> {
    const systemPrompt = `You are an expert contract reviewer. Analyze the provided contract and extract:

1. Contract Type (e.g., Employment, NDA, Service Agreement)
2. Parties Involved
3. Key Terms and Obligations
4. Payment Terms
5. Duration/Term
6. Termination Clauses
7. Potential Risks or Red Flags
8. Missing Standard Clauses
9. Overall Risk Assessment (Low/Medium/High)
10. Recommendations

Provide output as structured JSON.`;

    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Contract to review:\n\n${contractText}` }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.1
    });

    return JSON.parse(response.choices[0].message.content!) as ContractAnalysis;
}
```

## Step 4: API Endpoint

### Python Version (app.py)
```python
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from extract_pdf import extract_text_from_pdf, chunk_text
from analyze import analyze_contract, analyze_contract_long
from report import generate_pdf_report
import tempfile

app = Flask(__name__)
CORS(app)

@app.route('/api/review', methods=['POST'])
def review_contract():
    """Main endpoint for contract review"""

    # Check if file was uploaded
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if not file.filename.endswith('.pdf'):
        return jsonify({'error': 'Only PDF files are supported'}), 400

    try:
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp:
            file.save(tmp.name)
            tmp_path = tmp.name

        # Extract text
        contract_text = extract_text_from_pdf(tmp_path)

        # Check length and analyze
        if len(contract_text) < 10000:
            analysis = analyze_contract(contract_text)
        else:
            chunks = chunk_text(contract_text, 4000)
            analysis = analyze_contract_long(chunks)

        # Generate report
        report_path = generate_pdf_report(analysis, file.filename)

        # Clean up
        os.unlink(tmp_path)

        return send_file(
            report_path,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=f'review_{file.filename}'
        )

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, port=3000)
```

### TypeScript Version (worker.ts)
```typescript
import { Env } from './types';
import { extractTextFromPDF } from './extract';
import { analyzeContract } from './analyze';

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url);

        // Health check
        if (url.pathname === '/health') {
            return new Response(JSON.stringify({ status: 'healthy' }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Contract review endpoint
        if (url.pathname === '/api/review' && request.method === 'POST') {
            try {
                const formData = await request.formData();
                const file = formData.get('file') as File;

                if (!file) {
                    return new Response(JSON.stringify({ error: 'No file uploaded' }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                // Extract text
                const buffer = Buffer.from(await file.arrayBuffer());
                const contractText = await extractTextFromPDF(buffer);

                // Analyze contract
                const analysis = await analyzeContract(contractText);

                return new Response(JSON.stringify(analysis), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });

            } catch (error) {
                return new Response(JSON.stringify({ error: error.message }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }

        return new Response('Not Found', { status: 404 });
    }
};
```

## Step 5: Simple Frontend

### HTML + JavaScript (index.html)
```html
<!DOCTYPE html>
<html>
<head>
    <title>AI Contract Reviewer</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
        }
        .upload-area {
            border: 2px dashed #ccc;
            border-radius: 8px;
            padding: 40px;
            text-align: center;
            margin: 20px 0;
        }
        button {
            background: #007bff;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
        #result {
            margin-top: 30px;
            padding: 20px;
            background: #f5f5f5;
            border-radius: 8px;
        }
        .risk-high { color: #d9534f; font-weight: bold; }
        .risk-medium { color: #f0ad4e; font-weight: bold; }
        .risk-low { color: #5cb85c; font-weight: bold; }
    </style>
</head>
<body>
    <h1>AI Contract Reviewer</h1>
    <p>Upload a contract (PDF) for instant AI-powered review</p>

    <div class="upload-area">
        <input type="file" id="fileInput" accept=".pdf" />
        <p>or drag and drop your PDF here</p>
    </div>

    <button id="reviewBtn" onclick="reviewContract()">Review Contract</button>

    <div id="result" style="display: none;"></div>

    <script>
        async function reviewContract() {
            const fileInput = document.getElementById('fileInput');
            const button = document.getElementById('reviewBtn');
            const result = document.getElementById('result');

            if (!fileInput.files || fileInput.files.length === 0) {
                alert('Please select a PDF file');
                return;
            }

            const formData = new FormData();
            formData.append('file', fileInput.files[0]);

            button.disabled = true;
            button.textContent = 'Analyzing...';
            result.style.display = 'none';

            try {
                const response = await fetch('/api/review', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Review failed');
                }

                const analysis = await response.json();
                displayResult(analysis);

            } catch (error) {
                alert('Error: ' + error.message);
            } finally {
                button.disabled = false;
                button.textContent = 'Review Contract';
            }
        }

        function displayResult(analysis) {
            const result = document.getElementById('result');
            const riskClass = `risk-${analysis.riskAssessment.toLowerCase()}`;

            result.innerHTML = `
                <h2>Contract Review Results</h2>

                <h3>Contract Type</h3>
                <p>${analysis.contractType}</p>

                <h3>Parties</h3>
                <ul>${analysis.parties.map(p => `<li>${p}</li>`).join('')}</ul>

                <h3>Key Terms</h3>
                <ul>${analysis.keyTerms.map(t => `<li>${t}</li>`).join('')}</ul>

                <h3>Risk Assessment</h3>
                <p class="${riskClass}">${analysis.riskAssessment} Risk</p>

                <h3>Identified Risks</h3>
                <ul>${analysis.risks.map(r => `<li>${r}</li>`).join('')}</ul>

                <h3>Recommendations</h3>
                <ul>${analysis.recommendations.map(r => `<li>${r}</li>`).join('')}</ul>
            `;

            result.style.display = 'block';
        }
    </script>
</body>
</html>
```

## Step 6: Deploy

### Option A: Deploy Python Flask to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Create `vercel.json`:
```json
{
    "version": 2,
    "builds": [
        {
            "src": "app.py",
            "use": "@vercel/python"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "app.py"
        }
    ]
}
```

3. Deploy:
```bash
vercel
```

### Option B: Deploy to Cloudflare Workers

```bash
npx wrangler deploy
```

## Step 7: Add Pricing and Payments (Stripe)

```python
import stripe
from flask import request, jsonify

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

@app.route('/api/create-checkout', methods=['POST'])
def create_checkout():
    """Create Stripe checkout session"""

    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': 'AI Contract Review',
                    },
                    'unit_amount': 2900,  # $29.00
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=request.host_url + 'success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=request.host_url + 'cancel',
        )

        return jsonify({'checkoutUrl': checkout_session.url})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

## Cost Analysis

**Monthly costs at 1,000 contracts/month:**

- OpenAI API: ~$50-80 (assuming avg 5,000 tokens input, 2,000 tokens output per contract)
- Hosting (Cloudflare Workers or Vercel): $0-20
- Stripe fees: $29 × 1,000 × 0.029 + $0.30 × 1,000 = $1,141
- **Total costs**: ~$1,200
- **Revenue**: $29,000
- **Gross margin**: ~96%

## Improvements and Extensions

1. **Add authentication**: Implement user accounts with JWT or Auth0
2. **Contract templates**: Provide pre-filled templates for common contracts
3. **Version comparison**: Compare different versions of contracts
4. **Clause library**: Build database of standard/recommended clauses
5. **Email delivery**: Email report instead of download
6. **Subscription model**: Implement monthly subscriptions for businesses
7. **API access**: Provide API for integration with other tools
8. **Multi-language**: Support contracts in multiple languages
9. **Collaboration**: Allow teams to review contracts together
10. **Contract generation**: Not just review, but generate contracts from requirements

## Next Steps

1. **Test thoroughly**: Review 50-100 sample contracts to validate accuracy
2. **Get legal review**: Have actual lawyers review your AI's output
3. **Add disclaimers**: Make clear this is AI-assisted, not legal advice
4. **Compliance**: Understand regulations in your target markets
5. **Launch**: Start with friends/family, gather feedback
6. **Iterate**: Improve prompts, add features based on usage
7. **Scale**: Optimize costs, improve performance, expand to new contract types

## Key Lessons

- Start simple, add complexity only when needed
- Use GPT-4 for quality, GPT-4o-mini for cost optimization
- Test with real contracts, not just demo data
- Be transparent about AI limitations
- Focus on specific use case (contracts) rather than trying to do everything
- Price based on value delivered, not cost (cost is $0.50, charge $29)

---

This appendix demonstrates that building a Services-as-Software product is accessible to developers with basic skills. The real challenge isn't technology—it's distribution, trust-building, and understanding your target market's needs.
