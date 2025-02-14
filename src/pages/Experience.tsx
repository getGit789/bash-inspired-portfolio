
import Navbar from "../components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Terminal, Calendar } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Tech Corp",
      period: "2021 - Present",
      description: "Leading development of cloud-native applications and microservices architecture",
      technologies: ["AWS", "Kubernetes", "Node.js", "React"],
      responsibilities: [
        "Architected and implemented scalable solutions",
        "Led team of 5 developers",
        "Reduced system latency by 40%"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Inc",
      period: "2019 - 2021",
      description: "Full-stack development of enterprise web applications",
      technologies: ["React", "Python", "PostgreSQL", "Docker"],
      responsibilities: [
        "Developed RESTful APIs",
        "Implemented CI/CD pipelines",
        "Optimized database performance"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-terminal-dark font-mono">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <div className="bg-terminal-accent/20 inline-block px-3 py-1 rounded-full mb-4">
              <span className="text-terminal-accent text-sm">Career Path</span>
            </div>
            <h1 className="text-4xl font-bold text-terminal-light mb-4">
              Professional Experience
            </h1>
            <p className="text-terminal-light/80 max-w-2xl mx-auto">
              A timeline of my professional journey and key achievements.
            </p>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card 
                key={index} 
                className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-terminal-light">{exp.title}</CardTitle>
                    <div className="flex items-center text-terminal-accent/80">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                  </div>
                  <CardDescription className="text-terminal-light/70">
                    {exp.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-terminal-light/80 mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="text-xs px-2 py-1 rounded-full bg-terminal-accent/10 text-terminal-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-terminal-light/80">
                        <Terminal size={16} className="mt-1 text-terminal-accent" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Experience;
