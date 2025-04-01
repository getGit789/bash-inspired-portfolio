import Navbar from "../components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Github, Terminal } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "NunoReverse",
      description: "Modern web application offering three powerful transformation tools: Text Reverser for flipping text, Image Reverser for image transformations, and AI Thought Transformer for cognitive reframing using GPT.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "OpenAI API", "Netlify Functions", "Clerk Auth", "Shadcn UI", "Framer Motion"],
      image: "/image5.png",
      links: {
        github: "https://github.com/getGit789/reverse-dreamweaver",
        live: "https://nunoreverse.netlify.app/"
      }
    },
    {
      title: "Python Interpreter Online",
      description: "Modern Code Editor: Built with Monaco Editor (the same engine that powers VS Code), syntax Highlighting, Error Handling, Code Sharing, Example Code, Responsive Design",
      technologies: ["JavaScript", "HTML/CSS", "Axios", "FastAPI (Python)"],
      image: "/Python_Interpreter_Online.png",
      links: {
        github: "https://github.com/getGit789/python-interpreter-online",
        live: "https://getgit789.github.io/python-interpreter-online/"
      }
    },
    {
      title: "Real-time Chat Application",
      description: "A modern chat application with real-time messaging, user authentication, and message history.",
      technologies: ["Node.js", "Socket.io", "React", "MongoDB"],
      image: "/image1.png",
      links: {
        github: "https://github.com/getGit789/pingit",
        live: "https://realtimechatapp-57e81.web.app/"
      }
    },
    {
      title: "E-commerce Dashboard",
      description: "Admin dashboard for managing products, orders, and customer data with analytics.",
      technologies: ["Next.js", "TypeScript", "React", "Redux"],
      image: "/image2.png",
      links: {
        github: "https://github.com/getGit789/ecommerce",
        live: "https://fidlygrid-ce08b.web.app/"
      }
    },
    {
      title: "Weather Application",
      description: "Weather forecast app with location search and detailed weather information.",
      technologies: ["JavaScript", "OpenWeather API", "HTML", "CSS"],
      image: "/image3.png",
      links: {
        github: "https://github.com/getGit789/weather",
        live: "https://getgit789.github.io/weather/"
      }
    },
    {
      title: "Note-Taking Application",
      description: "A modern task management app featuring a Pomodoro timer, drag-and-drop interface, task prioritization, real-time updates",
      technologies: ["React.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Vite"],
      image: "/image4.png",
      links: {
        github: "https://github.com/getGit789/notenook",
        live: "https://notenook.up.railway.app/"
      }
    },
    {
      title: "Resume Builder",
      description: "AI-powered Resume Builder in Next.js with customizable themes and dynamic components.",
      technologies: ["Next.js", "React", "OpenAI", "TailwindCSS", "TypeScript"],
      image: "coming-soon",
      links: {
        github: "#",
        live: "#"
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
                <div className="aspect-video overflow-hidden rounded-t-lg relative">
                  {project.image === "coming-soon" ? (
                    <div className="w-full h-full bg-terminal-dark/80 flex items-center justify-center border border-terminal-light/10">
                      <span className="text-terminal-light/50 font-semibold text-lg">Coming Soon...</span>
                    </div>
                  ) : (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  )}
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
                      className={`flex items-center gap-2 ${project.links.github === '#' ? 'text-terminal-light/50 cursor-not-allowed' : 'text-terminal-light hover:text-terminal-accent'} transition-colors`}
                      onClick={(e) => project.links.github === '#' && e.preventDefault()}
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                    <a 
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 ${project.links.live === '#' ? 'text-terminal-light/50 cursor-not-allowed' : 'text-terminal-light hover:text-terminal-accent'} transition-colors`}
                      onClick={(e) => project.links.live === '#' && e.preventDefault()}
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
