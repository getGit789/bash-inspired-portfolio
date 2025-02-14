
import Navbar from "../components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Award, ExternalLink } from "lucide-react";

const Certifications = () => {
  const certifications = [
    {
      title: "AWS Solutions Architect",
      organization: "Amazon Web Services",
      date: "2023",
      description: "Professional certification for designing distributed systems on AWS",
      credentialId: "AWS-SAP-123456",
      link: "https://aws.amazon.com"
    },
    {
      title: "Professional Scrum Master",
      organization: "Scrum.org",
      date: "2022",
      description: "Professional certification in Agile methodologies and Scrum framework",
      credentialId: "PSM-123456",
      link: "https://scrum.org"
    }
  ];

  return (
    <div className="min-h-screen bg-terminal-dark font-mono">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <div className="bg-terminal-accent/20 inline-block px-3 py-1 rounded-full mb-4">
              <span className="text-terminal-accent text-sm">Achievements</span>
            </div>
            <h1 className="text-4xl font-bold text-terminal-light mb-4">
              Professional Certifications
            </h1>
            <p className="text-terminal-light/80 max-w-2xl mx-auto">
              Validating expertise through industry-recognized certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <Card 
                key={index} 
                className="bg-terminal-dark border border-terminal-light/10 hover:border-terminal-accent/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Award className="text-terminal-accent" size={24} />
                    <div>
                      <CardTitle className="text-terminal-light">{cert.title}</CardTitle>
                      <CardDescription className="text-terminal-light/70">
                        {cert.organization}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-terminal-light/80 mb-4">{cert.description}</p>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="text-terminal-light/60">
                      Issued: {cert.date}
                    </div>
                    <div className="text-terminal-light/60">
                      Credential ID: {cert.credentialId}
                    </div>
                    <a 
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-terminal-accent hover:text-terminal-accent/80 transition-colors mt-2"
                    >
                      <ExternalLink size={16} />
                      <span>Verify Credential</span>
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

export default Certifications;
