
import Navbar from "../components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Terminal, Calendar } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "IT Support Engineer and Trainer",
      company: "AT&T",
      location: "Brno, Czech Republic",
      period: "July 2023 - January 2025",
      description: "Provided comprehensive first-level technical support and training for internal and external users",
      responsibilities: [
        "Provided comprehensive first-level technical support for internal and external users",
        "Trained and mentored new employees in teams of 10 people during 14-day intensive training sessions",
        "Diagnosed and resolved technical issues with minimal system downtime",
        "Maintained detailed documentation in database for tracking issues and solutions",
        "Configured and set up PC workstations, printers, and peripheral devices"
      ]
    },
    {
      title: "IT Support Specialist",
      company: "Yuber",
      location: "Novi Sad, Serbia",
      period: "September 2012 - June 2015",
      description: "Managed technical support operations and system administration",
      responsibilities: [
        "Managed technical support operations for hardware and software systems",
        "Administered Windows systems, including user account and permission management",
        "Contributed to network infrastructure setup and maintenance"
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
          </div>

          {/* Professional Summary Card */}
          <Card className="bg-terminal-dark border border-terminal-light/10 mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-terminal-light">Professional Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-terminal-light/80">
              <p>
                Experienced IT Support Engineer with expertise in first-level technical support, system
                diagnostics, and IT infrastructure maintenance. Proven track record in administering various
                platforms, network setup, and hardware troubleshooting. Multilingual professional dedicated to
                providing superior technical support while maintaining high customer satisfaction.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card 
                key={index} 
                className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-terminal-light">{exp.title}</CardTitle>
                      <CardDescription className="text-terminal-light/70">
                        {exp.company} | {exp.location}
                      </CardDescription>
                    </div>
                    <div className="flex items-center text-terminal-accent/80">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-terminal-light/80 mb-4">{exp.description}</p>
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

