
import Navbar from "../components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Code, Server, Database, Terminal } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Code,
      skills: [
        { name: "React", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Next.js", level: 80 },
        { name: "Tailwind CSS", level: 90 }
      ]
    },
    {
      title: "Backend Development",
      icon: Server,
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Python", level: 80 },
        { name: "Express", level: 85 },
        { name: "FastAPI", level: 75 }
      ]
    },
    {
      title: "Database",
      icon: Database,
      skills: [
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "Redis", level: 75 },
        { name: "Prisma", level: 85 }
      ]
    },
    {
      title: "DevOps",
      icon: Terminal,
      skills: [
        { name: "Docker", level: 85 },
        { name: "Kubernetes", level: 75 },
        { name: "AWS", level: 80 },
        { name: "CI/CD", level: 85 }
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
              <span className="text-terminal-accent text-sm">Technologies</span>
            </div>
            <h1 className="text-4xl font-bold text-terminal-light mb-4">
              Technical Skills
            </h1>
            <p className="text-terminal-light/80 max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and proficiency levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-terminal-light">{skill.name}</span>
                          <span className="text-terminal-accent">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-terminal-light/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-terminal-accent rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
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

export default Skills;
