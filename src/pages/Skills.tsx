import Navbar from "../components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import {
  Code2,
  Layout,
  Server,
  Database,
  Brain,
  Cloud,
  Lock,
  Wrench,
  Globe,
} from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code2,
      skills: ["Python", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"],
    },
    {
      title: "Frontend",
      icon: Layout,
      skills: [
        "React",
        "Vite",
        "Tailwind CSS",
        "React Query",
        "shadcn/ui",
        "Framer Motion",
      ],
    },
    {
      title: "Backend",
      icon: Server,
      skills: [
        "FastAPI",
        "SQLAlchemy",
        "Alembic",
        "Pydantic",
        "Celery",
        "APScheduler",
      ],
    },
    {
      title: "Databases",
      icon: Database,
      skills: ["PostgreSQL (Neon)", "Redis (Upstash)", "SQLite"],
    },
    {
      title: "AI / LLM",
      icon: Brain,
      skills: [
        "OpenAI API",
        "Anthropic Claude API",
        "Multi-agent pipelines",
        "Prompt engineering",
        "Usage enforcement",
        "Tavily / Serper research APIs",
      ],
    },
    {
      title: "Infrastructure & DevOps",
      icon: Cloud,
      skills: [
        "Cloudflare (Pages, R2, DNS)",
        "Railway",
        "Docker",
        "Git",
        "CI/CD",
        "pytest",
        "Monitoring & alerting",
      ],
    },
    {
      title: "Auth & Payments",
      icon: Lock,
      skills: [
        "Clerk",
        "Lemon Squeezy",
        "OAuth",
        "Webhook verification",
      ],
    },
    {
      title: "System Administration",
      icon: Wrench,
      skills: [
        "Linux (Fedora, Ubuntu)",
        "Tomcat",
        "Load balancing",
        "Active Directory",
        "DNS / DHCP",
        "24/7 production support",
        "Hardware diagnostics",
      ],
    },
    {
      title: "Spoken Languages",
      icon: Globe,
      skills: ["Serbian (Native)", "English (C1 Advanced)", "Italian (Basic)"],
    },
  ];

  return (
    <div className="min-h-screen bg-terminal-dark font-mono">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <div className="bg-terminal-accent/20 inline-block px-3 py-1 rounded-full mb-4">
              <span className="text-terminal-accent text-sm font-mono">$ ls -la ./skills</span>
            </div>
            <h1 className="text-4xl font-bold text-terminal-light mb-4">
              Technical Skills
            </h1>
            <p className="text-terminal-light/80 max-w-2xl mx-auto">
              The stack I use daily to ship production SaaS — plus the system
              administration background that keeps my production boxes healthy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card
                  key={index}
                  className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon className="text-terminal-accent flex-shrink-0" size={24} />
                      <CardTitle className="text-terminal-light">
                        {category.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.skills.map((skill, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-terminal-light/80"
                        >
                          <span className="text-terminal-accent">▸</span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Skills;
