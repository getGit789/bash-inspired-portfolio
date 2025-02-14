
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-terminal-dark font-mono">
      <Navbar />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center py-20">
            <div className="w-full max-w-3xl animate-fade-in">
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
            
            <div className="w-full max-w-3xl mb-8 animate-fade-in-slow">
              <div className="aspect-video bg-terminal-dark border border-terminal-light/10 rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
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
        </div>
      </main>
    </div>
  );
};

export default Index;
