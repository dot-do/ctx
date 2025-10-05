# Author's Note

In 2006, Amazon Web Services launched with three simple services: S3 (storage), EC2 (compute), and SQS (messaging). At the time, most people in technology dismissed cloud computing as a niche offering for startups that couldn't afford real infrastructure. Serious companies ran their own data centers. Real engineers managed physical servers.

I was one of those skeptics.

By 2012, AWS had grown to over 30 services and $2 billion in annual revenue. The skeptics, myself included, were proven wrong. Cloud computing wasn't a niche—it was the future of all infrastructure.

But something even more significant happened during that period: a quiet revolution in how infrastructure was managed. Tools like Puppet, Chef, and eventually Terraform transformed infrastructure from something you configured manually into something you defined in code. Infrastructure-as-Code (IaC) emerged not as a buzzword but as a fundamental shift in how we thought about and operated technology infrastructure.

IaC did something remarkable: it made infrastructure programmable, repeatable, versionable, and scalable. A developer could define an entire production environment—servers, networks, databases, load balancers—in a few hundred lines of code, commit it to version control, and deploy it anywhere in the world with a single command. What previously took weeks of manual configuration now took minutes.

This programmability unlocked Software-as-a-Service (SaaS). When Salesforce, Workday, ServiceNow, and thousands of other SaaS companies could spin up infrastructure for new customers programmatically, subscription-based software became economically viable. IaC enabled SaaS.

I watched this transformation firsthand as a developer and entrepreneur. I saw companies that embraced IaC and SaaS thrive. I saw companies that insisted on traditional infrastructure and on-premise software struggle and often fail.

In 2022, I experienced a moment of déjà vu.

ChatGPT launched in November 2022, and within weeks it became clear that we were witnessing something comparable to AWS in 2006. Not a niche product for hobbyists, but the beginning of a fundamental transformation in how software—and business itself—would work.

By mid-2023, I was using AI extensively in my own work. GitHub Copilot generated roughly half of the code I wrote. ChatGPT and Claude handled research, writing, analysis, and problem-solving that previously took hours. I wasn't unusual—millions of developers, writers, analysts, and knowledge workers were having the same experience.

But the real revelation came when I started seeing AI not as a productivity tool but as a platform for automation. Just as Infrastructure-as-Code made infrastructure programmable, AI was making *business logic* programmable.

A customer service workflow that previously required training a human agent, writing documentation, and ongoing management could now be defined in prompts, knowledge bases, and agent configurations. A financial analysis that required hiring an analyst could be encoded in an AI system. A marketing campaign that required a team could be automated with AI agents.

Business logic—the rules, processes, and decisions that define how companies operate—was becoming code.

I call this **Business-as-Code (BaC)**, and I believe it will be as transformative for business operations as Infrastructure-as-Code was for technology infrastructure.

This book explores that thesis. It examines how AI makes business logic programmable, how that programmability enables new business models (Services-as-Software), and what the transformation means for companies, professionals, and society.

The parallel structure is intentional:

**Infrastructure-as-Code → Software-as-a-Service**

**Business-as-Code → Services-as-Software**

In the first transformation, infrastructure became programmable, which enabled software to be delivered as a service rather than a product. In the second transformation, business logic becomes programmable, which enables professional services to be delivered as software rather than human labor.

Both transformations follow the same pattern:
1. A scarce, expensive, manually-managed resource (infrastructure, expertise)
2. Becomes abundant, cheap, and programmatically-controlled (IaC, BaC)
3. Enabling new business models (SaaS, SaS)
4. Disrupting incumbents (on-premise software, professional services firms)
5. Creating trillion-dollar markets

We are in the early days of the Business-as-Code transformation—roughly equivalent to 2007-2008 in the cloud computing timeline. The technology is proven but not yet mainstream. The early adopters are seeing remarkable results. The skeptics are still arguing about whether it's viable. The incumbents are mostly ignoring it or dismissing it as hype.

But the transformation is inevitable. Business logic *is* becoming programmable. Services *are* becoming software. The question is not whether this happens, but how quickly, and who adapts versus who gets disrupted.

This book is written for three audiences:

**For business leaders and operators:** A practical guide to understanding Business-as-Code, assessing where AI can automate your operations, and implementing AI systems that generate measurable business value.

**For entrepreneurs and builders:** A playbook for building Services-as-Software businesses that leverage Business-as-Code to deliver professional services at software economics.

**For professionals and knowledge workers:** A framework for understanding how AI is transforming your industry and how to position yourself to thrive rather than be displaced.

I've tried to balance three often-conflicting goals:
1. **Technical depth**: Enough detail that developers and technical readers understand how this actually works
2. **Business relevance**: Concrete examples, case studies, and ROI analysis that business readers can act on
3. **Accessibility**: Clear explanations that don't require prior knowledge of AI or cloud computing

The result is a book that moves between technical implementation details and business strategy, between specific case studies and broad patterns, between present-day reality and future implications.

Some readers will want more technical depth. Some will want less. My hope is that by including both, the book serves as a bridge—helping technical readers understand the business implications and helping business readers understand the technical possibilities.

One more note on structure: This book has a companion volume, *Services-as-Software*, which examines how Business-as-Code is transforming the $4.6 trillion professional services industry specifically. This book (*Business-as-Code*) focuses on the broader transformation: how AI makes business logic programmable and what that means for all companies, not just professional services firms.

You can read either book independently, but they're designed to complement each other. If you're primarily interested in professional services transformation (legal, accounting, consulting, etc.), start with *Services-as-Software*. If you're interested in how AI transforms business operations broadly, start here.

Both books share a core thesis: We are living through a transformation as significant as the shift from on-premise infrastructure to cloud computing, and the pattern is the same—programmability enables new business models that disrupt incumbents and create enormous value.

I hope this book helps you navigate that transformation successfully.

—Nathan Clevenger
San Francisco, California
January 2025
