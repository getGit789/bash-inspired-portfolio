
import Navbar from "../components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { GraduationCap, Calendar } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Science in Sport and Management",
      school: "Faculty of Sport and Psychology, TIMS",
      period: "2006 - 2009",
      location: "Novi Sad, Serbia",
      description: "Specialized in Sport and Management",
      achievements: [
        "Graduated with Honors",
        "Conducted research on sports management strategies",
        "Actively participated in student sports events and leadership programs"
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
              <span className="text-terminal-accent text-sm">Academic Background</span>
            </div>
            <h1 className="text-4xl font-bold text-terminal-light mb-4">
              Education
            </h1>
            <p className="text-terminal-light/80 max-w-2xl mx-auto">
              My academic journey and achievements in sports management.
            </p>
          </div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <Card 
                key={index}
                className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <GraduationCap className="text-terminal-accent" size={24} />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-terminal-light">{edu.degree}</CardTitle>
                        <div className="flex items-center text-terminal-accent/80">
                          <Calendar size={16} className="mr-2" />
                          <span className="text-sm">{edu.period}</span>
                        </div>
                      </div>
                      <CardDescription className="text-terminal-light/70">
                        {edu.school} - {edu.location}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-terminal-light/80 mb-4">{edu.description}</p>
                  <div className="space-y-2">
                    {edu.achievements.map((achievement, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-2 text-terminal-light/80"
                      >
                        <span className="text-terminal-accent">•</span>
                        <span>{achievement}</span>
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

export default Education;
