
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Server, Cloud, Code, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-terminal-dark font-mono">
      <Navbar />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="flex flex-col items-center py-20">
            <div className="w-full flex flex-col md:flex-row gap-8 mb-8">
              <div className="w-full md:w-1/2 animate-fade-in">
                <div className="bg-terminal-accent/20 inline-block px-3 py-1 rounded-full mb-4">
                  <span className="text-terminal-accent text-sm">Who am I</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-terminal-light mb-6">
                  Obsessed with
                  <br />
                  <span className="text-terminal-accent">Technology</span>
                </h1>
                <p className="text-terminal-light/80 text-lg mb-8 leading-relaxed">
                  Hello World! Welcome to my corner of the internet. I love technology, and if you want some proof, please take a look at my projects!
                </p>
              </div>
              
              <div className="w-full md:w-1/2 animate-fade-in-slow">
                <div className="aspect-video bg-terminal-dark border border-terminal-light/10 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg"
                    alt="Profile"
                    className="w-full h-full object-cover"
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
              <button className="border border-terminal-accent text-terminal-accent px-6 py-3 rounded hover:bg-terminal-accent/10 transition-all">
                Contact Me
              </button>
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

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 animate-fade-in">
                <div className="aspect-video bg-terminal-dark border border-terminal-light/10 rounded-lg overflow-hidden">
                  <img
                    src="photo-1518770660439-4636190af475"
                    alt="HomeLab Setup"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-1/2 space-y-6 animate-fade-in">
                <h3 className="text-2xl font-bold text-terminal-light">HomeLab Project</h3>
                <p className="text-terminal-light/80 leading-relaxed">
                  Currently building a sophisticated home lab environment centered around Raspberry Pi, 
                  focusing on network security, robust firewall configurations, and secure remote access solutions. 
                  The project emphasizes implementing advanced security measures while ensuring seamless file 
                  sharing and access from anywhere.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">Network Security</span>
                  <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">Firewall Configuration</span>
                  <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">Remote Access</span>
                  <span className="bg-terminal-accent/10 text-terminal-accent px-3 py-1 rounded-full text-sm">File Sharing</span>
                </div>
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
                    <Cloud className="text-terminal-accent" size={24} />
                    <CardTitle className="text-terminal-light">AWS Cloud Solutions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-terminal-light/80">
                  Diving deep into AWS cloud infrastructure and solutions, learning to build scalable and secure cloud environments.
                </CardContent>
              </Card>

              <Card className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Lock className="text-terminal-accent" size={24} />
                    <CardTitle className="text-terminal-light">CompTIA Security+</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-terminal-light/80">
                  Preparing for CompTIA Security+ certification (estimated completion: May 2025), focusing on cybersecurity fundamentals.
                </CardContent>
              </Card>

              <Card className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Server className="text-terminal-accent" size={24} />
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
                    <Code className="text-terminal-accent" size={24} />
                    <CardTitle className="text-terminal-light">Python & ML</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-terminal-light/80">
                  Learning Python with a focus on automation and machine learning, building practical solutions for real-world problems.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
