import Navbar from "../components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Terminal, Calendar } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Founder & Full-Stack Engineer",
      company: "Beekio LLC",
      location: "Remote — based in Serbia",
      period: "March 2026 – Present",
      description:
        "Operating Beekio LLC as sole developer across three SaaS products, from architecture and infrastructure down to customer-facing UI.",
      responsibilities: [
        "Designed and built Beekio — an AI-powered SaaS platform for commercial beekeepers — end-to-end as sole developer, from landing page to production backend",
        "Architected full stack: React/TypeScript/Vite frontend on Cloudflare Pages, FastAPI backend on Railway, Neon PostgreSQL, Cloudflare R2 with presigned URL image flow",
        "Built multi-tier AI usage enforcement with daily action tracking, automated UTC midnight resets via APScheduler + Railway cron, and structured 429 responses with resets_at timestamps",
        "Integrated Clerk for authentication (including custom sign-in/sign-up pages), Lemon Squeezy for four-tier subscription billing, and Resend for transactional email with verified sender domain",
        "Implemented persistent AI chat conversations with resumable sessions; reduced in-app navigation latency from 4–5s to near-instant via React Query migration",
        "Maintain an 87-test backend suite (pytest); use Alembic for schema migrations; enforce a dev → main Git workflow with Cloudflare preview deployments",
        "Also built PriceRuled — an AI shopping verdict app with a 6-agent LLM pipeline (Claude Haiku + Sonnet, Tavily, Serper, Keepa) — and operate Sudowear.shop, a direct-to-consumer e-commerce store",
        "Registered and operate Beekio LLC (Wyoming) as a single-member entity covering all three products",
      ],
    },
    {
      title: "System Administrator",
      company: "Mozzartbet",
      location: "Belgrade, Serbia",
      period: "September 2025 – December 2025",
      description:
        "Joined Mozzartbet's IT Operations team during a high-traffic period for the mozzartbet.rs real-time sports betting platform.",
      responsibilities: [
        "Performed daily administration, configuration, and upgrades of Linux-based servers and Tomcat application servers supporting real-time odds, live betting, and virtual sports",
        "Monitored and maintained synchronization between central systems and betting shops and payment points across Serbia",
        "Proactively monitored system health and implemented load balancing to ensure zero downtime during peak events (Champions League nights, NBA, tennis Grand Slams)",
        "Diagnosed and resolved critical hardware, network, and application incidents, providing 24/7 on-call support for production environments",
        "Strengthened data security by enforcing regular backups, access controls, and compliance with Serbian Games of Chance Administration regulations",
      ],
    },
    {
      title: "IT Support",
      company: "TMS (Trafft.com)",
      location: "Belgrade, Serbia",
      period: "April 2025 – September 2025",
      description: "Technical support for Trafft, a SaaS scheduling platform.",
      responsibilities: [
        "Resolved 20–30 customer tickets per day via email and chat",
        "Performed custom CSS modifications and integration troubleshooting for client-facing websites",
      ],
    },
    {
      title: "IT Support Engineer & Trainer",
      company: "AT&T",
      location: "Brno, Czech Republic",
      period: "July 2023 – January 2025",
      description:
        "Delivered first-level technical support and onboarded new hires in a large enterprise environment.",
      responsibilities: [
        "Provided comprehensive first- and second-level technical support for internal and external users",
        "Trained and mentored new employees in teams of 10 during 14-day intensive onboarding sessions",
        "Diagnosed and resolved technical issues with minimal system downtime",
        "Maintained detailed documentation in a shared database for tracking issues and solutions",
        "Configured and set up PC workstations, printers, and peripheral devices across distributed teams",
      ],
    },
    {
      title: "Web Developer & IT Support",
      company: "Yuber",
      location: "Novi Sad, Serbia",
      period: "September 2012 – June 2015",
      description: "Designed websites and provided technical support for internal teams.",
      responsibilities: [
        "Designed and built responsive websites using HTML, CSS, and JavaScript for local clients",
        "Worked with content management systems (primarily WordPress) — theme customization, plugin integration, and maintenance",
        "Provided technical support for internal teams, resolving hardware and software issues",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-terminal-dark font-mono">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <div className="bg-terminal-accent/20 inline-block px-3 py-1 rounded-full mb-4">
              <span className="text-terminal-accent text-sm font-mono">$ cat career.log</span>
            </div>
            <h1 className="text-4xl font-bold text-terminal-light mb-4">
              Professional Experience
            </h1>
          </div>

          {/* Professional Summary Card */}
          <Card className="bg-terminal-dark border border-terminal-light/10 mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-terminal-light">Professional Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-terminal-light/80 space-y-3">
              <p>
                Full-Stack and AI Engineer who ships production SaaS end-to-end. Founder of
                <span className="text-terminal-accent"> Beekio LLC</span>, where I designed and built an AI-powered platform for beekeepers — from FastAPI/PostgreSQL backend and React/TypeScript frontend to Cloudflare/Railway infrastructure, multi-tier AI usage enforcement, Clerk authentication, and Lemon Squeezy billing.
              </p>
              <p>
                Prior background as a System Administrator and IT Support Engineer with 3+ years across enterprise and 24/7 production environments at AT&amp;T and Mozzartbet. Comfortable owning a feature from database schema through deployment, and debugging production issues at 3 a.m.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className={`bg-terminal-dark border transition-all duration-300 animate-fade-in ${
                  index === 0
                    ? "border-terminal-accent/40 hover:border-terminal-accent/70"
                    : "border-terminal-light/10 hover:border-terminal-accent/50"
                }`}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <CardTitle className="text-terminal-light flex flex-wrap items-center gap-3">
                        {exp.title}
                        {index === 0 && (
                          <span className="bg-terminal-accent text-terminal-dark text-xs font-bold px-2 py-0.5 rounded font-mono">
                            CURRENT
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription className="text-terminal-light/70">
                        {exp.company} &nbsp;|&nbsp; {exp.location}
                      </CardDescription>
                    </div>
                    <div className="flex items-center text-terminal-accent/80 whitespace-nowrap">
                      <Calendar size={16} className="mr-2 flex-shrink-0" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-terminal-light/80 mb-4">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-terminal-light/80"
                      >
                        <Terminal
                          size={16}
                          className="mt-1 text-terminal-accent flex-shrink-0"
                        />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Experience;
