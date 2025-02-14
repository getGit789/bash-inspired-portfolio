
import Navbar from "../components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-terminal-dark font-mono">
      <Navbar />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between py-20 gap-8">
            <div className="w-full md:w-1/2 animate-fade-in">
              <div className="bg-terminal-accent/20 inline-block px-3 py-1 rounded-full mb-4">
                <span className="text-terminal-accent text-sm">Aspiring Developer</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-terminal-light mb-6">
                Obsessed with
                <br />
                <span className="text-terminal-accent">Technology</span>
              </h1>
              <p className="text-terminal-light/80 text-lg mb-8 leading-relaxed">
                Hello World! Welcome to my corner of the internet. I love technology, and if you want some proof, please take a look at my projects!
              </p>
              <div className="flex gap-4">
                <button className="bg-terminal-accent text-terminal-dark px-6 py-3 rounded hover:bg-opacity-90 transition-all">
                  View Projects
                </button>
                <button className="border border-terminal-accent text-terminal-accent px-6 py-3 rounded hover:bg-terminal-accent/10 transition-all">
                  Contact Me
                </button>
              </div>
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
        </div>
      </main>
    </div>
  );
};

export default Index;
