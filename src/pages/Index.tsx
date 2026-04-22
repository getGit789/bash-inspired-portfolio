import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ArrowUpRight, Brain, Cpu, Briefcase, GitBranch } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-terminal-dark font-mono overflow-x-hidden">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="flex flex-col items-center py-10 md:py-20">
            <div className="w-full flex flex-col md:flex-row md:items-start gap-8 mb-8">
              <div className="w-full md:w-1/2 min-w-0 animate-fade-in">
                <div className="bg-terminal-accent/20 inline-block px-3 py-1 rounded-full mb-4 whitespace-nowrap">
                  <span className="text-terminal-accent text-sm font-mono">$ whoami</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-terminal-light mb-6">
                  Full-Stack &amp;
                  <br />
                  <span className="text-terminal-accent">AI Engineer</span>
                </h1>
                <p className="text-terminal-light/80 text-lg mb-4 leading-relaxed">
                  Founder of <span className="text-terminal-accent">Beekio LLC</span>, building AI-powered SaaS end-to-end — FastAPI backends, React frontends, multi-agent LLM pipelines, and the production infrastructure that holds it all together.
                </p>
                <p className="text-terminal-light/60 text-base mb-6 leading-relaxed">
                  Previously System Administrator at Mozzartbet and IT Support Engineer at AT&amp;T Brno. Comfortable from database schema to deployment, and debugging production at 3 a.m.
                </p>
                <p className="text-terminal-accent/90 text-sm mb-2 font-mono">
                  <span className="text-terminal-light/40">{'// '}</span>Open to remote full-stack / AI engineer roles
                </p>
              </div>

              <div className="w-full md:w-1/2 shrink-0 flex justify-center md:justify-start md:mt-12 animate-fade-in-slow">
                <div className="inline-block overflow-hidden rounded-[12px] border border-terminal-light/10 shadow-lg leading-none">
                  <img
                    src="/hero.jpg"
                    alt="Damir Kranjčević"
                    width={824}
                    height={879}
                    decoding="async"
                    className="block h-auto max-w-full w-[min(88vw,280px)] sm:w-[min(72vw,320px)] md:w-[min(100%,360px)] lg:w-[380px]"
                    loading="eager"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const wrap = target.parentElement;
                      if (wrap) {
                        wrap.classList.add("flex", "items-center", "justify-center", "p-4", "text-center", "min-h-[200px]", "w-full", "max-w-[360px]");
                        wrap.innerHTML =
                          '<p class="text-terminal-light/70">Image temporarily unavailable - This space showcases visual elements representing my technical journey and expertise</p>';
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md sm:max-w-none sm:w-auto items-stretch sm:items-center justify-center animate-fade-in px-2" style={{ animationDelay: "200ms" }}>
              <Link
                to="/projects"
                className="flex w-full sm:w-auto justify-center items-center text-center bg-terminal-accent text-terminal-dark px-6 py-3 rounded hover:bg-opacity-90 transition-all"
              >
                View Projects
              </Link>
              <Link
                to="/contact"
                className="flex w-full sm:w-auto justify-center items-center text-center border border-terminal-accent text-terminal-accent px-6 py-3 rounded hover:bg-terminal-accent/10 transition-all"
              >
                Contact Me
              </Link>
            </div>
          </div>

          {/* Current Work Section */}
          <div className="py-20 border-t border-terminal-light/10">
            <div className="text-center mb-12 animate-fade-in">
              <div className="bg-terminal-accent/20 inline-block px-3 py-1 rounded-full mb-4 max-w-[calc(100vw-2rem)]">
                <span className="text-terminal-accent text-sm font-mono">$ cat ./current-project.md</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-terminal-light mb-4">
                What I&apos;m Currently Working On
              </h2>
            </div>

            <div className="max-w-6xl mx-auto animate-fade-in">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-terminal-light mb-10 md:mb-12 text-center px-1 break-words text-balance">
                Beekio — AI SaaS for commercial beekeepers
              </h3>

              {/* Text wrapping layout - image floats left and vertically centered */}
              <div className="relative">
                {/* Intro paragraphs - full width */}
                <div className="text-terminal-light/80 leading-relaxed space-y-4 mb-6">
                  <p>
                    I&apos;m building <span className="text-terminal-accent">Beekio</span>, an AI-powered SaaS platform for commercial beekeepers — a risk-averse audience making high-stakes decisions where a bad Varroa treatment window can cost 60% of a colony, and almond pollination contracts are the year&apos;s paycheck.
                  </p>
                  <p>
                    The product ships end-to-end as a solo operation: landing page, app, backend API, AI pipeline, billing, auth, email, and infrastructure. Every piece is something I designed, built, and now maintain.
                  </p>
                </div>

                {/* Container for image and wrapping text */}
                <div className="relative min-w-0">
                  {/* Image - floats left on md+; stacked full-width on mobile */}
                  <div className="w-full max-w-full mb-6 md:float-left md:mr-8 md:mb-0 md:w-[45%] lg:w-[42%] xl:w-[38%] animate-fade-in-slow">
                    <div className="relative w-full aspect-[5/4] md:aspect-[6/5] rounded-[12px] overflow-hidden border border-terminal-light/10 shadow-lg mb-4">
                      <img
                        src="/beekio-image-landing.png"
                        alt="Beekio — AI SaaS platform for commercial beekeepers"
                        className="absolute inset-0 h-full w-full object-cover object-top"
                        loading="eager"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'text-center', 'min-h-[220px]', 'bg-gradient-to-br', 'from-terminal-dark', 'via-terminal-dark', 'to-terminal-accent/10');
                          target.parentElement!.innerHTML = '<div class="py-12"><div class="text-terminal-accent/80 font-mono text-sm mb-2">$ open</div><div class="text-terminal-light font-mono text-xl font-bold">beekio.com</div></div>';
                        }}
                      />
                    </div>
                    {/* Tags below the image - left-aligned */}
                    <div className="flex flex-wrap gap-3 justify-start">
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">React</span>
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">TypeScript</span>
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">Vite</span>
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">FastAPI</span>
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">Python</span>
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">PostgreSQL</span>
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">Cloudflare R2</span>
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">Railway</span>
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">Clerk</span>
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">Lemon Squeezy</span>
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">OpenAI</span>
                    </div>
                    <div className="flex gap-4 flex-wrap mt-3">
                      <a
                        href="https://beekio.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-terminal-light hover:text-terminal-accent transition-colors group"
                      >
                        <span>Visit</span>
                        <ArrowUpRight
                          size={18}
                          className="shrink-0 opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          aria-hidden
                        />
                      </a>
                    </div>
                  </div>

                  {/* Text content that wraps around the image */}
                  <div className="text-terminal-light/80 leading-relaxed space-y-5 min-w-0 md:overflow-hidden">
                    <div className="bg-terminal-dark/50 border border-terminal-light/5 rounded-lg p-4 sm:p-5 break-words">
                      <p className="font-medium text-terminal-light mb-3">
                        What I built:
                      </p>
                      <ul className="space-y-2.5 list-disc list-outside pl-5 sm:pl-6 text-sm sm:text-base">
                        <li>Multi-tier AI usage enforcement with daily action tracking, automated UTC resets, and structured 429 responses</li>
                        <li>Persistent AI chat with resumable sessions across logins</li>
                        <li>Custom Clerk sign-in / sign-up pages</li>
                        <li>Lemon Squeezy integration for four-tier subscription billing</li>
                        <li>Cloudflare R2 image uploads via presigned URL flow</li>
                        <li>React Query migration that cut in-app navigation from 4–5s to near-instant</li>
                        <li>pytest backend suite and Alembic migrations</li>
                        <li>Dev → main Git workflow with Cloudflare preview deployments</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <p>
                        Beekio is one of three products under <span className="text-terminal-accent">Beekio LLC</span> (Wyoming) — the other two being <span className="text-terminal-accent">PriceRuled</span>, a 6-agent AI shopping verdict app, and <span className="text-terminal-accent">Sudowear.shop</span>, a direct-to-consumer e-commerce store.
                      </p>
                      <p>
                        Currently in beta launch mode — Lemon Squeezy approved, Clerk webhooks in place, invitation email flow working. Next: getting real users in and iterating on the feedback that only production surfaces.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Clear float on larger screens */}
                <div className="clear-both hidden md:block"></div>
              </div>
            </div>
          </div>

          {/* Learning Section */}
          <div className="py-20 border-t border-terminal-light/10">
            <div className="text-center mb-12 animate-fade-in">
              <div className="bg-terminal-accent/20 inline-block px-3 py-1 rounded-full mb-4 max-w-[calc(100vw-2rem)]">
                <span className="text-terminal-accent text-sm font-mono">$ tail -f ./learning.log</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-terminal-light mb-4">
                What I&apos;m Learning Right Now
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300 min-w-0">
                <CardHeader className="min-w-0">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center pt-0.5">
                      <Brain className="text-terminal-accent" size={24} />
                    </div>
                    <CardTitle className="text-terminal-light text-base sm:text-lg break-words">Multi-Agent LLM Systems</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-terminal-light/80">
                  Building PriceRuled&apos;s 6-agent pipeline with Claude Haiku for classification and Sonnet for synthesis. Iterating on prompt design and the deterministic scoring layer that constrains what the LLMs control vs what stays pure Python.
                </CardContent>
              </Card>

              <Card className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300 min-w-0">
                <CardHeader className="min-w-0">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center pt-0.5">
                      <Cpu className="text-terminal-accent" size={24} />
                    </div>
                    <CardTitle className="text-terminal-light text-base sm:text-lg break-words">Production AI Infrastructure</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-terminal-light/80">
                  Daily usage enforcement, UTC midnight resets, structured 429 responses, APScheduler + Railway cron. The unglamorous backend that makes AI features feel fair and predictable to users.
                </CardContent>
              </Card>

              <Card className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300 min-w-0">
                <CardHeader className="min-w-0">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center pt-0.5">
                      <Briefcase className="text-terminal-accent" size={24} />
                    </div>
                    <CardTitle className="text-terminal-light text-base sm:text-lg break-words">SaaS Operations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-terminal-light/80">
                  Running a solo SaaS — Wyoming LLC registration, Lemon Squeezy as merchant-of-record for global VAT, four-tier pricing with 10-month yearly billing, email deliverability across verified domains. The business side most engineers skip.
                </CardContent>
              </Card>

              <Card className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300 min-w-0">
                <CardHeader className="min-w-0">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center pt-0.5">
                      <GitBranch className="text-terminal-accent" size={24} />
                    </div>
                    <CardTitle className="text-terminal-light text-base sm:text-lg break-words">Developer Experience</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-terminal-light/80">
                  Clean dev workflows — pytest suites, Alembic migrations, Cloudflare preview deployments, React Query state patterns, dev → main Git flow. Investing in the tooling that makes solo dev not suck at scale.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
