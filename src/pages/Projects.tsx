
import Navbar from "../components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Github, Terminal } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Project Alpha",
      description: "A full-stack application built with React and Node.js",
      technologies: ["React", "Node.js", "MongoDB", "TypeScript"],
      image: "/placeholder.svg",
      links: {
        github: "https://github.com",
        live: "https://project-demo.com"
      }
    },
    {
      title: "Project Beta",
      description: "Real-time chat application with WebSocket integration",
      technologies: ["React", "Socket.io", "Express", "Redis"],
      image: "/placeholder.svg",
      links: {
        github: "https://github.com",
        live: "https://project-demo.com"
      }
    },
    {
      title: "Project Gamma",
      description: "E-commerce platform with payment integration",
      technologies: ["Next.js", "Stripe", "PostgreSQL", "Prisma"],
      image: "/placeholder.svg",
      links: {
        github: "https://github.com",
        live: "https://project-demo.com"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-terminal-dark font-mono">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <div className="bg-terminal-accent/20 inline-block px-3 py-1 rounded-full mb-4">
              <span className="text-terminal-accent text-sm">My Work</span>
            </div>
            <h1 className="text-4xl font-bold text-terminal-light mb-4">
              Featured Projects
            </h1>
            <p className="text-terminal-light/80 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and passion for technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-terminal-light">{project.title}</CardTitle>
                  <CardDescription className="text-terminal-light/70">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                  <div className="flex gap-4">
                    <a 
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-terminal-light hover:text-terminal-accent transition-colors"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                    <a 
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-terminal-light hover:text-terminal-accent transition-colors"
                    >
                      <Terminal size={16} />
                      <span>Demo</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;
