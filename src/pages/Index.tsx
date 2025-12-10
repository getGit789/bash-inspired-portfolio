import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Server, Brain, Code, Lock, Container } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-terminal-dark font-mono">
      <Navbar />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="flex flex-col items-center py-10 md:py-20">
            <div className="w-full flex flex-col md:flex-row gap-8 mb-8">
              <div className="w-full md:w-1/2 animate-fade-in">
                <div className="bg-terminal-accent/20 inline-block px-3 py-1 rounded-full mb-4 whitespace-nowrap">
                  <span className="text-terminal-accent text-sm">Who am I</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-terminal-light mb-6">
                  Obsessed with
                  <br />
                  <span className="text-terminal-accent">Technology</span>
                </h1>
                <p className="text-terminal-light/80 text-lg mb-8 leading-relaxed">
                Hello World! Welcome to my corner of the internet. I’m passionate about technology, constantly exploring innovations and building exciting projects. Join me on my journey of lifelong learning, growth, and creation. Check out my work and let's innovate together!                </p>
              </div>
              
              <div className="w-full md:w-1/2 animate-fade-in-slow">
                <div className="aspect-[4/3] relative scale-[0.775] max-w-[80%] mx-auto">
                  <img
                    src="/hero.jpg"
                    alt="A showcase of my technical expertise and passion for technology"
                    className="w-full h-full object-contain rounded-[12px]"
                    loading="eager"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'p-4', 'text-center');
                      target.parentElement!.innerHTML = '<p class="text-terminal-light/70">Image temporarily unavailable - This space showcases visual elements representing my technical journey and expertise</p>';
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <Link
                to="/projects"
                className="bg-terminal-accent text-terminal-dark px-6 py-3 rounded hover:bg-opacity-90 transition-all"
              >
                View Projects
              </Link>
              <Link
                to="/contact"
                className="border border-terminal-accent text-terminal-accent px-6 py-3 rounded hover:bg-terminal-accent/10 transition-all"
              >
                Contact Me
              </Link>
            </div>
          </div>

          {/* Current Work Section */}
          <div className="py-20 border-t border-terminal-light/10">
            <div className="text-center mb-12 animate-fade-in">
              <div className="bg-terminal-accent/20 inline-block px-3 py-1 rounded-full mb-4">
                <span className="text-terminal-accent text-sm">Current Project</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-terminal-light mb-4">
                What I'm Currently Working On
              </h2>
            </div>

            <div className="max-w-6xl mx-auto animate-fade-in">
              <h3 className="text-2xl md:text-3xl font-bold text-terminal-light mb-12 text-center">HomeLab Kubernetes Cluster — Raspberry Pi + K3s</h3>
              
              {/* Text wrapping layout - image floats left and vertically centered */}
              <div className="relative">
                {/* First two paragraphs - full width */}
                <div className="text-terminal-light/80 leading-relaxed space-y-4 mb-6">
                  <p>
                    I'm currently building a fully self-hosted HomeLab environment designed for learning, experimenting, and running real-world services.
                  </p>
                  <p>
                    The setup includes a multi-node Raspberry Pi cluster connected through a managed switch, with all nodes running K3s, a lightweight Kubernetes distribution optimized for edge and ARM environments.
                  </p>
                </div>

                {/* Container for image and wrapping text */}
                <div className="relative">
                  {/* Image - floats left and positioned to align with middle of content */}
                  <div className="w-full mb-6 md:float-left md:mr-8 md:mb-0 md:w-[45%] lg:w-[42%] xl:w-[38%] md:mt-12 animate-fade-in-slow">
                    <div className="relative rounded-[12px] overflow-hidden border border-terminal-light/10 shadow-lg mb-4">
                      <img
                        src="/homelab.jpg"
                        alt="My HomeLab Kubernetes Cluster setup with Raspberry Pi nodes running K3s"
                        className="w-full h-auto object-cover"
                        loading="eager"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'p-4', 'text-center', 'min-h-[200px]');
                          target.parentElement!.innerHTML = '<p class="text-terminal-light/70">HomeLab image temporarily unavailable - This space showcases my home server and network infrastructure setup</p>';
                        }}
                      />
                    </div>
                    {/* Tags below the image - left-aligned */}
                    <div className="flex flex-wrap gap-3 justify-start">
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">Kubernetes</span>
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">K3s</span>
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">Container Orchestration</span>
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">Infrastructure Automation</span>
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">Network Security</span>
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">Firewall Configuration</span>
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">Remote Access</span>
                      <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">File Sharing</span>
                    </div>
                  </div>

                  {/* Text content that wraps around the image - starting with explore section */}
                  <div className="text-terminal-light/80 leading-relaxed space-y-5 md:overflow-hidden">
                    <div className="bg-terminal-dark/50 border border-terminal-light/5 rounded-lg p-5">
                      <p className="font-medium text-terminal-light mb-3">
                        This cluster allows me to explore:
                      </p>
                      <ul className="space-y-2.5 list-disc list-inside ml-2">
                        <li>Container orchestration with Kubernetes</li>
                        <li>High-availability workloads across multiple nodes</li>
                        <li>Infrastructure automation</li>
                        <li>Networking and VLAN segmentation</li>
                        <li>Monitoring and observability stacks</li>
                        <li>Self-hosting services and micro-applications</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <p>
                        All nodes are neatly wired, powered, and networked, monitored from my workstation where I manage deployments, troubleshoot, and test new configurations in a clean, real-world environment.
                      </p>
                      <p>
                        This HomeLab is a long-term project where I continuously expand my skills in Linux systems, distributed computing, DevOps tooling, and infrastructure reliability—while building something practical and fully my own.
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
              <div className="bg-terminal-accent/20 inline-block px-3 py-1 rounded-full mb-4">
                <span className="text-terminal-accent text-sm">Continuous Learning</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-terminal-light mb-4">
                What I'm Learning Right Now
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <Card className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                      <Brain className="text-terminal-accent" size={24} />
                    </div>
                    <CardTitle className="text-terminal-light">AI Development & Local LLM Research</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-terminal-light/80">
                  Building intelligent systems with a focus on training, optimizing, and deploying local large-language models for privacy, performance, and innovation.
                </CardContent>
              </Card>

              <Card className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                      <Container className="text-terminal-accent" size={24} />
                    </div>
                    <CardTitle className="text-terminal-light">Kubernetes</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-terminal-light/80">
                  Mastering container orchestration with Kubernetes and K3s, building production-ready clusters and deploying scalable applications in my HomeLab environment.
                </CardContent>
              </Card>

              <Card className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                      <Server className="text-terminal-accent" size={24} />
                    </div>
                    <CardTitle className="text-terminal-light">Linux & Open Source</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-terminal-light/80">
                  Working with Linux daily, embracing open-source technologies and contributing to the community.
                </CardContent>
              </Card>

              <Card className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                      <Code className="text-terminal-accent" size={24} />
                    </div>
                    <CardTitle className="text-terminal-light">Python & ML</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-terminal-light/80">
                  Learning Python with a focus on automation and machine learning, building practical solutions for real-world problems.
                </CardContent>
              </Card>

              <Card className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                      <Lock className="text-terminal-accent" size={24} />
                    </div>
                    <CardTitle className="text-terminal-light">CompTIA Security+</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-terminal-light/80">
                  Preparing for CompTIA Security+ certification (estimated completion: May 2026), focusing on cybersecurity fundamentals.
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
