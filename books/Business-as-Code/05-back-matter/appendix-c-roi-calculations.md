# Appendix C: ROI Calculation Models

This appendix provides practical frameworks and formulas for calculating return on investment (ROI) for Business-as-Code initiatives. Use these models to build business cases, prioritize projects, and measure success.

## Basic ROI Formula

```
ROI = (Total Benefits - Total Costs) / Total Costs × 100%

Payback Period = Total Costs / Annual Benefits
```

## Cost Components

### One-Time Implementation Costs

**Development Costs**
```
Development Cost = (Team Size × Average Salary × Time in Months) + Contractor Fees
```

Example:
- 2 developers × $150K annual salary × 3 months = $75,000
- 1 contractor × $10,000/month × 2 months = $20,000
- **Total Development Cost = $95,000**

**Infrastructure Setup**
```
Infrastructure Setup = Cloud Setup + Software Licenses + Training Costs
```

Example:
- Cloud infrastructure setup: $5,000
- Software licenses (annual): $12,000
- Training costs: $10,000
- **Total Infrastructure Setup = $27,000**

**Data Preparation**
```
Data Prep Cost = Data Cleaning + Data Migration + Knowledge Base Creation
```

Example:
- Data cleaning (80 hours × $100/hour): $8,000
- Knowledge base creation (120 hours × $100/hour): $12,000
- **Total Data Prep = $20,000**

### Ongoing Operating Costs

**AI API Costs**
```
Monthly API Cost = (Requests/Month × Avg Tokens/Request × Price/Token)
```

Example (Customer Service Bot):
- 50,000 requests/month
- 1,000 tokens average (500 input + 500 output)
- $0.01 per 1K input tokens, $0.03 per 1K output tokens
- Cost = 50,000 × (500 × $0.00001 + 500 × $0.00003)
- **Monthly API Cost = $1,000**
- **Annual API Cost = $12,000**

**Infrastructure Costs**
```
Monthly Infrastructure = Cloud Hosting + Database + Vector DB + Monitoring
```

Example:
- Cloud hosting: $500/month
- Database: $200/month
- Vector database: $300/month
- Monitoring tools: $100/month
- **Monthly Infrastructure = $1,100**
- **Annual Infrastructure = $13,200**

**Maintenance and Support**
```
Annual Maintenance = (FTE Allocation × Annual Salary) + Vendor Support
```

Example:
- 0.25 FTE engineer × $150K = $37,500
- Vendor support contracts = $5,000
- **Annual Maintenance = $42,500**

## Benefit Components

### Labor Cost Savings

**Time Savings per Transaction**
```
Time Saved = (Manual Time - Automated Time) × Hourly Labor Cost × Volume
```

Example (Document Review):
- Manual time: 4 hours per document
- Automated time: 0.5 hours (30 min human review)
- Time saved: 3.5 hours per document
- Labor cost: $50/hour (fully loaded)
- Volume: 1,000 documents/year
- **Annual Savings = 3.5 × $50 × 1,000 = $175,000**

**FTE Reduction or Redeployment**
```
FTE Savings = Number of FTEs × Average Fully-Loaded Cost
```

Example (Bookkeeping Automation):
- 2.5 FTE bookkeepers replaced or redeployed
- Fully-loaded cost: $75K/year each
- **Annual FTE Savings = 2.5 × $75,000 = $187,500**

### Error Reduction

**Error Cost Savings**
```
Error Savings = (Manual Error Rate - AI Error Rate) × Volume × Cost per Error
```

Example (Invoice Processing):
- Manual error rate: 5%
- AI error rate: 0.5%
- Volume: 10,000 invoices/year
- Cost per error: $200 (correction cost + customer impact)
- **Annual Error Savings = (0.05 - 0.005) × 10,000 × $200 = $90,000**

### Speed/Throughput Improvements

**Revenue from Faster Processing**
```
Additional Revenue = Increased Capacity × Revenue per Transaction × Conversion Rate
```

Example (Lead Qualification):
- Manual capacity: 100 leads/day
- AI capacity: 500 leads/day
- Increased capacity: 400 leads/day
- Revenue per converted lead: $5,000
- Conversion rate: 10%
- Working days: 250/year
- **Additional Revenue = 400 × 250 × 0.10 × $5,000 = $5,000,000**

### Quality/Satisfaction Improvements

**Customer Retention Value**
```
Retention Value = (Improved Retention Rate × Customer Base × Annual Customer Value)
```

Example (Customer Support):
- Customer base: 5,000 customers
- Improved retention: 2% (from 90% to 92%)
- Annual customer value: $1,200
- **Annual Retention Value = 0.02 × 5,000 × $1,200 = $120,000**

## Complete ROI Examples

### Example 1: Customer Service Automation

**Scenario**: Automate tier-1 customer support with AI chatbot

**Costs:**

One-Time:
- Development: $80,000
- Infrastructure setup: $20,000
- Training/knowledge base: $30,000
- **Total One-Time: $130,000**

Annual Operating:
- API costs: $24,000 (50K requests/month)
- Infrastructure: $12,000
- Maintenance: $30,000 (0.2 FTE)
- **Total Annual Operating: $66,000**

**Benefits:**

- Reduce support agents: 3 FTE × $60K = **$180,000/year**
- Faster response time increases retention by 1%: 10,000 customers × 0.01 × $800 = **$80,000/year**
- Handle 50% more support volume with same team = capacity for growth
- **Total Annual Benefits: $260,000**

**ROI Calculation:**

Year 1:
- Benefits: $260,000
- Costs: $130,000 (one-time) + $66,000 (operating) = $196,000
- **Net Benefit: $64,000**
- **ROI: 33%**

Year 2+:
- Benefits: $260,000
- Costs: $66,000 (operating only)
- **Net Benefit: $194,000**
- **ROI: 294%**

**Payback Period: 7.5 months**

### Example 2: Automated Bookkeeping (SMB)

**Scenario**: Replace manual bookkeeping with AI system (Pilot.com-style)

**Costs:**

One-Time:
- Integration with accounting systems: $15,000
- Data migration: $10,000
- Staff training: $5,000
- **Total One-Time: $30,000**

Annual Operating:
- AI bookkeeping platform: $1,200/year
- Spot-check review (0.1 FTE × $70K): $7,000
- **Total Annual Operating: $8,200**

**Benefits:**

- Replace bookkeeper: 1 FTE × $60K = **$60,000/year**
- Reduce errors: 4% → 0.5%, 2,000 transactions × 0.035 × $100 = **$7,000/year**
- Faster monthly close enables better decisions = **$10,000/year** (estimated)
- **Total Annual Benefits: $77,000**

**ROI Calculation:**

Year 1:
- Benefits: $77,000
- Costs: $30,000 (one-time) + $8,200 (operating) = $38,200
- **Net Benefit: $38,800**
- **ROI: 102%**

Year 2+:
- Benefits: $77,000
- Costs: $8,200
- **Net Benefit: $68,800**
- **ROI: 839%**

**Payback Period: 5.9 months**

### Example 3: Contract Review Automation (Legal)

**Scenario**: Automate initial contract review for standard agreements

**Costs:**

One-Time:
- Custom AI development: $120,000
- Legal knowledge base creation: $40,000
- Integration with document management: $20,000
- **Total One-Time: $180,000**

Annual Operating:
- API costs: $36,000 (high token usage for documents)
- Infrastructure: $15,000
- Maintenance and updates: $40,000 (0.25 FTE lawyer)
- **Total Annual Operating: $91,000**

**Benefits:**

- Junior associate time savings: 8 hours → 1.5 hours per contract, 500 contracts/year, $75/hour = 500 × 6.5 × $75 = **$243,750/year**
- Faster turnaround increases deal velocity: **$100,000/year** (estimated from closing 5 additional deals)
- Improved consistency reduces disputes: **$50,000/year** (estimated)
- **Total Annual Benefits: $393,750**

**ROI Calculation:**

Year 1:
- Benefits: $393,750
- Costs: $180,000 (one-time) + $91,000 (operating) = $271,000
- **Net Benefit: $122,750**
- **ROI: 45%**

Year 2+:
- Benefits: $393,750
- Costs: $91,000
- **Net Benefit: $302,750**
- **ROI: 333%**

**Payback Period: 8.2 months**

## ROI Calculation Template

Use this template to calculate ROI for your specific use case:

### Costs

**One-Time Implementation Costs:**
```
Development/Engineering:          $_______
Infrastructure Setup:             $_______
Data Preparation:                 $_______
Training:                         $_______
Other:                            $_______
                                 ----------
TOTAL ONE-TIME COSTS:             $_______
```

**Annual Operating Costs:**
```
AI API/Model Costs:               $_______
Cloud Infrastructure:             $_______
Maintenance (FTE allocation):     $_______
Vendor Support:                   $_______
Other:                            $_______
                                 ----------
TOTAL ANNUAL OPERATING:           $_______
```

### Benefits

**Annual Labor Savings:**
```
Time saved per transaction:       _______ hours
× Hourly cost:                    $_______
× Annual volume:                  _______
= Labor Savings:                  $_______
```

**Error Reduction:**
```
Error rate improvement:           _______ %
× Annual volume:                  _______
× Cost per error:                 $_______
= Error Savings:                  $_______
```

**Other Benefits:**
```
Revenue improvements:             $_______
Retention improvements:           $_______
Capacity increases:               $_______
Other quantifiable benefits:      $_______
                                 ----------
TOTAL ANNUAL BENEFITS:            $_______
```

### ROI Calculation

**Year 1:**
```
Total Benefits:                   $_______
Total Costs (one-time + annual):  $_______
Net Benefit:                      $_______
ROI = Net Benefit / Total Costs:  _______%

Payback Period:
Total Costs / Monthly Benefits =  _______ months
```

**Year 2+:**
```
Total Benefits:                   $_______
Total Costs (annual only):        $_______
Net Benefit:                      $_______
ROI:                              _______%
```

## Advanced Considerations

### Risk Adjustments

Apply probability-weighted adjustments for uncertain benefits:

```
Risk-Adjusted Benefit = Expected Benefit × Probability of Realization × Risk Factor
```

Example:
- Expected retention improvement: $100,000
- Probability of achieving: 70%
- Risk factor (aggressive assumption): 0.8
- **Risk-Adjusted Benefit = $100,000 × 0.70 × 0.8 = $56,000**

### Time Value of Money

For multi-year projections, apply discounting:

```
NPV = Σ (Benefits - Costs) / (1 + Discount Rate)^Year
```

Example (3-year projection, 10% discount rate):
```
Year 0: -$180,000 (one-time costs)
Year 1: $122,750 / 1.10 = $111,591
Year 2: $302,750 / 1.21 = $250,207
Year 3: $302,750 / 1.331 = $227,461

NPV = -$180,000 + $111,591 + $250,207 + $227,461 = $409,259
```

### Intangible Benefits

Quantify where possible, otherwise note qualitatively:

- **Improved employee satisfaction**: May reduce turnover (estimate turnover cost savings)
- **Better customer experience**: May increase NPS (link to retention)
- **Competitive advantage**: May increase win rates (estimate revenue impact)
- **Innovation capacity**: Freed-up time enables new initiatives (estimate value of new projects)

### Sensitivity Analysis

Test ROI under different scenarios:

| Scenario | Benefits | Costs | ROI |
|----------|----------|-------|-----|
| Base Case | $260K | $196K | 33% |
| Conservative (-20% benefits) | $208K | $196K | 6% |
| Aggressive (+20% benefits) | $312K | $196K | 59% |
| High Cost (+30% costs) | $260K | $255K | 2% |

This helps understand which assumptions matter most and how robust your ROI is.

## Key Metrics to Track

### Leading Indicators (Early Success Signals)
- User adoption rate
- System accuracy/quality
- Time per transaction
- Error rates

### Lagging Indicators (Financial Impact)
- Actual cost savings
- Revenue impact
- Customer satisfaction changes
- Employee productivity gains

### Operational Metrics
- API costs per transaction
- System uptime/reliability
- Processing volume
- Response times

---

**Remember**: ROI calculations should be conservative and honest. It's better to under-promise and over-deliver than to build business cases on optimistic assumptions that don't materialize. Track actual results and update your models based on real data.
