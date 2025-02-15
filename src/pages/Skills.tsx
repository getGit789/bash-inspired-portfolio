
import Navbar from "../components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Laptop, Server, Wrench, Code, Globe } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Operating Systems",
      icon: Laptop,
      skills: ["Windows (Desktop/Server)", "Linux", "macOS", "iOS", "Android"]
    },
    {
      title: "Infrastructure",
      icon: Server,
      skills: ["Active Directory", "DHCP", "DNS"]
    },
    {
      title: "Support Services",
      icon: Wrench,
      skills: ["Technical diagnostics", "Hardware diagnostics"]
    },
    {
      title: "Development",
      icon: Code,
      skills: ["JavaScript", "Data Structures", "Algorithms"]
    },
    {
      title: "Languages",
      icon: Globe,
      skills: ["Serbian (native)", "English (advanced C1)", "Italian (basic)"]
    }
  ];

  return (
    <div className="min-h-screen bg-terminal-dark font-mono">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <div className="bg-terminal-accent/20 inline-block px-3 py-1 rounded-full mb-4">
              <span className="text-terminal-accent text-sm">Professional Skills</span>
            </div>
            <h1 className="text-4xl font-bold text-terminal-light mb-4">
              Technical Skills
            </h1>
            <p className="text-terminal-light/80 max-w-2xl mx-auto">
              Experienced IT Support Engineer with expertise in first-level technical support, system
              diagnostics, and IT infrastructure maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <Card 
                key={index}
                className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <category.icon className="text-terminal-accent" size={24} />
                    <CardTitle className="text-terminal-light">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.skills.map((skill, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-center gap-2 text-terminal-light/80"
                      >
                        <span className="text-terminal-accent">•</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 animate-fade-in">
            <Card className="bg-terminal-dark border border-terminal-light/10">
              <CardHeader>
                <CardTitle className="text-terminal-light">Professional Summary</CardTitle>
              </CardHeader>
              <CardContent className="text-terminal-light/80 space-y-4">
                <p>
                  Experienced IT Support Engineer with expertise in first-level technical support, system
                  diagnostics, and IT infrastructure maintenance. Proven track record in administering various
                  platforms, network setup, and hardware troubleshooting. Multilingual professional dedicated to
                  providing superior technical support while maintaining high customer satisfaction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Skills;
