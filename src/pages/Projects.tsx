import { Fragment } from "react";
import Navbar from "../components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Github, Terminal, ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  image: string | null; // null => terminal placeholder; set e.g. "/beekio-image.png" when asset is in public/
  placeholderLabel?: string;
  links: {
    github?: string | null;
    live?: string | null;
  };
  featured?: boolean;
};

/** Index of first “legacy” card — section header is rendered immediately before it. */
const LEGACY_SECTION_START_INDEX = 6;

const Projects = () => {
  const projects: Project[] = [
    // ===== Featured / current production work =====
    {
      title: "Beekio",
      description:
        "AI-powered SaaS platform for commercial beekeepers. Persistent AI chat with resumable sessions, multi-tier daily usage enforcement with automated UTC resets, four-tier subscription billing, and presigned R2 image uploads. Built solo from landing page to production.",
      technologies: [
        "React", "TypeScript", "Vite", "FastAPI", "Python",
        "PostgreSQL", "Clerk", "Lemon Squeezy", "Cloudflare R2",
        "Railway", "OpenAI"
      ],
      image: "/beekio-image.png",
      placeholderLabel: "beekio.com",
      links: {
        // Waitlist today; switch to app subdomain when beta is public
        live: "https://beekio.com",
        github: null,
      },
      featured: true,
    },
    {
      title: "PriceRuled",
      description:
        "AI shopping verdict app with a 6-agent LLM pipeline that returns BUY / WAIT / SKIP on consumer products. Claude Haiku for classification, Sonnet for synthesis, Tavily + Serper for research, Keepa for price history. Deterministic Python scoring; LLMs only write the human-readable narrative.",
      technologies: [
        "React", "TypeScript", "Vite", "FastAPI",
        "Celery", "Upstash Redis", "Claude API",
        "Tavily", "Serper", "Keepa", "Railway"
      ],
      image: "/priceruled-image.png",
      placeholderLabel: "priceruled.pages.dev",
      links: {
        live: "https://priceruled.pages.dev/",
        github: null,
      },
      featured: true,
    },
    {
      title: "Sudowear.shop",
      description:
        "Direct-to-consumer e-commerce store built and operated end-to-end — storefront, payment processing, and order fulfillment workflow.",
      technologies: ["E-commerce", "Payments", "Order Fulfillment"], // refine when stack is finalized (e.g. Shopify, Medusa, custom)
      image: "/sudowear-image.png",
      placeholderLabel: "sudowear.shop",
      links: {
        live: "https://sudowear.shop",
        github: null,
      },
      featured: true,
    },

    // ===== Earlier side projects =====
    {
      title: "Pingit",
      description:
        "Real-time chat with messaging, authentication, and message history — Socket.io, React, and MongoDB.",
      technologies: ["Node.js", "Socket.io", "React", "MongoDB"],
      image: "/image1.png",
      links: {
        github: "https://github.com/getGit789/pingit",
        live: "https://realtimechatapp-57e81.web.app/",
      },
    },
    {
      title: "Python Interpreter Online",
      description:
        "In-browser Python code editor built on Monaco (same engine as VS Code), with syntax highlighting, error handling, code sharing, and a FastAPI backend for execution.",
      technologies: ["JavaScript", "HTML/CSS", "Monaco Editor", "Axios", "FastAPI", "Python"],
      image: "/Python_Interpreter_Online.png",
      links: {
        github: "https://github.com/getGit789/python-interpreter-online",
        live: "https://getgit789.github.io/python-interpreter-online/",
      },
    },
    {
      title: "E-commerce Dashboard",
      description:
        "Admin dashboard for products, orders, and customer data with analytics — Next.js and Redux.",
      technologies: ["Next.js", "TypeScript", "React", "Redux"],
      image: "/image2.png",
      links: {
        github: "https://github.com/getGit789/ecommerce",
        live: "https://fidlygrid-ce08b.web.app/",
      },
    },

    // ===== Legacy / earlier portfolio =====
    {
      title: "Notenook",
      description:
        "Task management app with a Pomodoro timer, drag-and-drop interface, task prioritization, and real-time updates across sessions.",
      technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "Vite"],
      image: "/image4.png",
      links: {
        github: "https://github.com/getGit789/notenook",
        live: "https://notenook.up.railway.app/",
      },
    },
    {
      title: "NunoReverse",
      description:
        "Three tools in one app: Text Reverser, Image Reverser, and an AI Thought Transformer for cognitive reframing with GPT. Clerk auth and Netlify Functions backend.",
      technologies: [
        "React", "TypeScript", "Tailwind CSS", "OpenAI API",
        "Netlify Functions", "Clerk", "Shadcn UI", "Framer Motion"
      ],
      image: "/image5.png",
      links: {
        github: "https://github.com/getGit789/reverse-dreamweaver",
        live: "https://nunoreverse.netlify.app/",
      },
    },
    {
      title: "Weather Application",
      description:
        "Weather forecast app with location search and detailed conditions — OpenWeather API and vanilla front-end.",
      technologies: ["JavaScript", "OpenWeather API", "HTML", "CSS"],
      image: "/image3.png",
      links: {
        github: "https://github.com/getGit789/weather",
        live: "https://getgit789.github.io/weather/",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-terminal-dark font-mono">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <div className="bg-terminal-accent/20 inline-block px-3 py-1 rounded-full mb-4">
              <span className="text-terminal-accent text-sm font-mono">$ ls ./projects</span>
            </div>
            <h1 className="text-4xl font-bold text-terminal-light mb-4">
              Featured Projects
            </h1>
            <p className="text-terminal-light/80 max-w-2xl mx-auto">
              Production SaaS products I&apos;m currently building as a solo founder, plus side projects and a few
              earlier builds from my portfolio archive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Fragment key={`${project.title}-${index}`}>
                {index === LEGACY_SECTION_START_INDEX && (
                  <div className="col-span-full pt-6 md:pt-10 mt-2 border-t border-terminal-light/10">
                    <div className="text-center mb-8 md:mb-10 animate-fade-in max-w-2xl mx-auto px-2">
                      <div className="bg-terminal-accent/20 inline-block px-3 py-1 rounded-full mb-4 max-w-[calc(100vw-2rem)]">
                        <span className="text-terminal-accent text-sm font-mono">$ ls ~/legacy</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-terminal-light mb-2">
                        Earlier portfolio projects
                      </h2>
                      <p className="text-terminal-light/70 text-sm md:text-base">
                        Older demos — Notenook, NunoReverse, and a weather client — kept for context on how I got here.
                      </p>
                    </div>
                  </div>
                )}
                <Card
                  className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300 animate-fade-in flex flex-col"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                <div className="aspect-video overflow-hidden rounded-t-lg relative">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-terminal-dark via-terminal-dark to-terminal-accent/10 flex items-center justify-center border-b border-terminal-light/10">
                      <div className="text-center px-4">
                        <div className="text-terminal-accent/80 font-mono text-sm mb-2">$ open</div>
                        <div className="text-terminal-light font-mono text-xl font-bold">
                          {project.placeholderLabel ?? project.title}
                        </div>
                      </div>
                    </div>
                  )}
                  {project.featured && (
                    <span className="absolute top-2 right-2 bg-terminal-accent text-terminal-dark text-xs font-bold px-2 py-1 rounded font-mono">
                      FEATURED
                    </span>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-terminal-light">{project.title}</CardTitle>
                  <CardDescription className="text-terminal-light/70">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-full bg-terminal-accent/10 text-terminal-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-terminal-light hover:text-terminal-accent transition-colors"
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-terminal-light hover:text-terminal-accent transition-colors group"
                      >
                        {project.featured ? (
                          <>
                            <span>Visit</span>
                            <ArrowUpRight
                              size={18}
                              className="shrink-0 opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                              aria-hidden
                            />
                          </>
                        ) : (
                          <>
                            <Terminal size={16} />
                            <span>Demo</span>
                          </>
                        )}
                      </a>
                    )}
                    {!project.links.github && !project.links.live && (
                      <span className="text-terminal-light/40 text-sm italic">
                        Private — closed source
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
              </Fragment>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;
