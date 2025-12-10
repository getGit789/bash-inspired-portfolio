import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Terminal, Code, Rocket, Heart, Target, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/ui/collapsible";
import { useState } from "react";

const Why = () => {
  const [isTechStackOpen, setIsTechStackOpen] = useState(false);

  return (
    <div className="min-h-screen bg-terminal-dark font-mono">
      <Navbar />
      
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <div className="bg-terminal-accent/20 inline-block px-3 py-1 rounded-full mb-4">
              <span className="text-terminal-accent text-sm">Why I Do This</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-terminal-light mb-6">
              Why I'm Building This
            </h1>
          </div>

          {/* Blog Content */}
          <article className="prose prose-invert max-w-none">
            <div className="space-y-8 text-terminal-light/90 leading-relaxed">
              
              {/* Introduction */}
              <section className="animate-fade-in">
                <p className="text-lg text-terminal-light/90 mb-6">
                  You might be wondering: <span className="text-terminal-accent">why?</span> Why spend countless hours building projects, learning new technologies, and documenting the journey? Why put yourself out there in this way?
                </p>
                <p className="mb-6">
                  The answer is simple, yet complex. It's about <span className="text-terminal-accent font-semibold">passion</span>, <span className="text-terminal-accent font-semibold">purpose</span>, and the relentless pursuit of <span className="text-terminal-accent font-semibold">growth</span>.
                </p>
              </section>

              {/* Section 1 */}
              <section className="border-l-4 border-terminal-accent/30 pl-6 py-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
                <div className="flex items-start gap-3 mb-4">
                  <Heart className="text-terminal-accent flex-shrink-0 mt-1" size={24} />
                  <h2 className="text-2xl font-bold text-terminal-light mb-3">Passion for Technology</h2>
                </div>
                <p className="mb-4">
                  Technology isn't just a career for me—it's a <span className="text-terminal-accent">calling</span>. Every line of code, every system I build, every problem I solve brings me genuine joy. There's something magical about turning an idea into reality, watching abstract concepts become tangible solutions.
                </p>
                <p className="mb-4">
                  This portfolio isn't just a showcase of my work; it's a reflection of my journey. Each project represents hours of learning, debugging, and iterating. They're not just applications—they're stories of growth, challenges overcome, and knowledge gained.
                </p>
              </section>

              {/* Section 2 */}
              <section className="border-l-4 border-terminal-accent/30 pl-6 py-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="flex items-start gap-3 mb-4">
                  <Target className="text-terminal-accent flex-shrink-0 mt-1" size={24} />
                  <h2 className="text-2xl font-bold text-terminal-light mb-3">Continuous Learning</h2>
                </div>
                <p className="mb-4">
                  The tech industry moves fast. What's cutting-edge today might be obsolete tomorrow. I've learned that the only way to stay relevant is to <span className="text-terminal-accent">never stop learning</span>. This portfolio is my way of documenting that journey.
                </p>
                <p className="mb-4">
                  From building my HomeLab Kubernetes cluster to exploring AI and local LLMs, every project teaches me something new. I'm not just building for the sake of building—I'm building to <span className="text-terminal-accent">understand</span>, to <span className="text-terminal-accent">grow</span>, and to <span className="text-terminal-accent">evolve</span>.
                </p>
                <p className="mb-4">
                  The terminal aesthetic of this site isn't just a design choice—it's a nod to where it all begins. The command line, the foundation of everything we build. It's raw, powerful, and honest. Just like the journey of learning.
                </p>
              </section>

              {/* Section 3 */}
              <section className="border-l-4 border-terminal-accent/30 pl-6 py-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
                <div className="flex items-start gap-3 mb-4">
                  <Rocket className="text-terminal-accent flex-shrink-0 mt-1" size={24} />
                  <h2 className="text-2xl font-bold text-terminal-light mb-3">Building Real Solutions</h2>
                </div>
                <p className="mb-4">
                  I don't just want to code—I want to <span className="text-terminal-accent">solve problems</span>. Whether it's creating a Python interpreter for online learning, building a reverse transformation tool, or setting up infrastructure that actually works, I'm driven by the impact.
                </p>
                <p className="mb-4">
                  My HomeLab project isn't just about running Kubernetes—it's about understanding distributed systems, networking, security, and infrastructure at a fundamental level. It's about building something real, something that teaches me how the internet actually works.
                </p>
                <p className="mb-4">
                  Every project on this site serves a purpose. They're not just portfolio pieces—they're <span className="text-terminal-accent">proof of concept</span>, demonstrations of skills, and stepping stones to bigger challenges.
                </p>
              </section>

              {/* Section 4 */}
              <section className="border-l-4 border-terminal-accent/30 pl-6 py-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
                <div className="flex items-start gap-3 mb-4">
                  <Lightbulb className="text-terminal-accent flex-shrink-0 mt-1" size={24} />
                  <h2 className="text-2xl font-bold text-terminal-light mb-3">Sharing Knowledge</h2>
                </div>
                <p className="mb-4">
                  I believe in <span className="text-terminal-accent">open knowledge</span>. The tech community has given me so much—tutorials, documentation, open-source projects, and countless hours of help from strangers. This portfolio is my way of giving back.
                </p>
                <p className="mb-4">
                  By sharing my projects, my learning journey, and my experiences, I hope to inspire others. Maybe someone will see my HomeLab setup and decide to build their own. Maybe they'll look at my code and learn something new. Maybe they'll see that it's okay to be a perpetual learner.
                </p>
                <p className="mb-4">
                  This isn't about showing off—it's about <span className="text-terminal-accent">transparency</span>. The real journey of a developer isn't just the successes; it's the failures, the debugging sessions, the "why isn't this working?" moments. And I'm not afraid to show that.
                </p>
              </section>

              {/* Section 5 */}
              <section className="border-l-4 border-terminal-accent/30 pl-6 py-4 animate-fade-in" style={{ animationDelay: "500ms" }}>
                <div className="flex items-start gap-3 mb-4">
                  <Code className="text-terminal-accent flex-shrink-0 mt-1" size={24} />
                  <h2 className="text-2xl font-bold text-terminal-light mb-3">The Future</h2>
                </div>
                <p className="mb-4">
                  Technology is evolving at an unprecedented pace. AI is reshaping how we work, cloud infrastructure is becoming more complex, and security is more critical than ever. I want to be part of that evolution, not just a spectator.
                </p>
                <p className="mb-4">
                  My current focus on AI development, Kubernetes, and cybersecurity isn't random—it's strategic. These are the skills that will define the next decade of technology. By learning them now, by building with them now, I'm preparing for what's next.
                </p>
                <p className="mb-4">
                  This portfolio will continue to evolve. New projects will be added, old ones will be updated, and the journey will continue. Because that's what this is—a <span className="text-terminal-accent">living document</span> of growth, not a static snapshot.
                </p>
              </section>

              {/* Closing */}
              <section className="mt-12 p-6 bg-terminal-accent/10 border border-terminal-accent/30 rounded-lg animate-fade-in" style={{ animationDelay: "600ms" }}>
                <div className="flex items-start gap-3 mb-4">
                  <Terminal className="text-terminal-accent flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h2 className="text-2xl font-bold text-terminal-light mb-3">The Bottom Line</h2>
                    <p className="mb-4">
                      I'm building this because I <span className="text-terminal-accent">love</span> what I do. Because I believe in continuous learning. Because I want to solve real problems and build real solutions. Because I want to share my journey and learn from others.
                    </p>
                    <p className="mb-4">
                      This portfolio is more than a resume—it's a <span className="text-terminal-accent">statement</span>. It says: "I'm here, I'm learning, I'm building, and I'm not stopping."
                    </p>
                    <p className="text-terminal-accent font-semibold">
                      {'>'} Let's build something amazing together.
                    </p>
                  </div>
                </div>
              </section>

            </div>
          </article>

          {/* Tech Stack Section - Collapsible */}
          <div className="mt-12 pt-8 border-t border-terminal-light/10 animate-fade-in" style={{ animationDelay: "700ms" }}>
            <Collapsible open={isTechStackOpen} onOpenChange={setIsTechStackOpen}>
              <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-lg border border-terminal-light/10 hover:border-terminal-accent/30 hover:bg-terminal-dark/50 transition-all group">
                <div className="flex items-center gap-3">
                  <Code className="text-terminal-accent" size={20} />
                  <span className="text-terminal-light font-medium">Tech Stack & Architecture</span>
                  <span className="text-terminal-light/50 text-sm font-mono">(For Developers)</span>
                </div>
                {isTechStackOpen ? (
                  <ChevronUp className="text-terminal-light/60 group-hover:text-terminal-accent transition-colors" size={20} />
                ) : (
                  <ChevronDown className="text-terminal-light/60 group-hover:text-terminal-accent transition-colors" size={20} />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 p-6 bg-terminal-dark/50 border border-terminal-light/10 rounded-lg">
                <div className="space-y-6 text-terminal-light/80">
                  {/* Frontend */}
                  <div>
                    <h3 className="text-terminal-accent font-semibold mb-3 flex items-center gap-2">
                      <Terminal size={16} />
                      Frontend
                    </h3>
                    <div className="ml-6 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">React 18.3</span>
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">TypeScript</span>
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">Vite 5.4</span>
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">React Router 6</span>
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">Tailwind CSS</span>
                      </div>
                    </div>
                  </div>

                  {/* UI Components */}
                  <div>
                    <h3 className="text-terminal-accent font-semibold mb-3 flex items-center gap-2">
                      <Code size={16} />
                      UI Components
                    </h3>
                    <div className="ml-6 space-y-2">
                      <p className="text-terminal-light/70 text-sm mb-2">Built with shadcn/ui (Radix UI primitives)</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">Radix UI</span>
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">Lucide Icons</span>
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">CVA</span>
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">Tailwind Merge</span>
                      </div>
                    </div>
                  </div>

                  {/* State Management & Data */}
                  <div>
                    <h3 className="text-terminal-accent font-semibold mb-3 flex items-center gap-2">
                      <Rocket size={16} />
                      State & Data
                    </h3>
                    <div className="ml-6 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">TanStack Query</span>
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">React Hook Form</span>
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">Zod</span>
                      </div>
                    </div>
                  </div>

                  {/* Features & Integrations */}
                  <div>
                    <h3 className="text-terminal-accent font-semibold mb-3 flex items-center gap-2">
                      <Lightbulb size={16} />
                      Features & Integrations
                    </h3>
                    <div className="ml-6 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">EmailJS</span>
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">Infobip 2FA</span>
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">Google Analytics 4</span>
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">Web3Forms</span>
                      </div>
                    </div>
                  </div>

                  {/* Architecture */}
                  <div>
                    <h3 className="text-terminal-accent font-semibold mb-3 flex items-center gap-2">
                      <Target size={16} />
                      Architecture
                    </h3>
                    <div className="ml-6 space-y-3 text-sm">
                      <div>
                        <p className="text-terminal-light/90 mb-1"><span className="text-terminal-accent">{'>'}</span> Single Page Application (SPA) with client-side routing</p>
                        <p className="text-terminal-light/70 ml-4">React Router handles navigation, no page reloads</p>
                      </div>
                      <div>
                        <p className="text-terminal-light/90 mb-1"><span className="text-terminal-accent">{'>'}</span> Component-based architecture</p>
                        <p className="text-terminal-light/70 ml-4">Reusable UI components from shadcn/ui, custom components for business logic</p>
                      </div>
                      <div>
                        <p className="text-terminal-light/90 mb-1"><span className="text-terminal-accent">{'>'}</span> Serverless resume verification</p>
                        <p className="text-terminal-light/70 ml-4">EmailJS for email OTP, Infobip 2FA API for SMS verification</p>
                      </div>
                      <div>
                        <p className="text-terminal-light/90 mb-1"><span className="text-terminal-accent">{'>'}</span> Static site generation</p>
                        <p className="text-terminal-light/70 ml-4">Vite builds optimized static assets, deployed as static files</p>
                      </div>
                    </div>
                  </div>

                  {/* Build & Dev Tools */}
                  <div>
                    <h3 className="text-terminal-accent font-semibold mb-3 flex items-center gap-2">
                      <Terminal size={16} />
                      Build & Development
                    </h3>
                    <div className="ml-6 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">Vite (SWC)</span>
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">TypeScript</span>
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">ESLint</span>
                        <span className="bg-terminal-accent/10 text-terminal-accent px-2 py-1 rounded text-sm font-mono">PostCSS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Call to Action */}
          <div className="mt-8 animate-fade-in" style={{ animationDelay: "800ms" }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/projects"
                className="bg-terminal-accent text-terminal-dark px-6 py-3 rounded hover:bg-opacity-90 transition-all text-center font-mono"
              >
                View My Projects
              </Link>
              <Link
                to="/contact"
                className="border border-terminal-accent text-terminal-accent px-6 py-3 rounded hover:bg-terminal-accent/10 transition-all text-center font-mono"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Why;

