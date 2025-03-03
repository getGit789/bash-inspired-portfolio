import Navbar from "../components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Award, ExternalLink, Calendar, CheckCircle } from "lucide-react";

const Certifications = () => {
  const certifications = [
    {
      title: "Google IT Automation with Python Professional Certificate",
      organization: "Google",
      date: "March 28th, 2025",
      description: "Focusing on automation and Python scripting for IT operations",
      credentialId: "Upcoming",
      link: "",
      scheduled: true
    },
    {
      title: "CompTIA Security+",
      organization: "comptia.org",
      date: "Exam - September 2025",
      description: "Focusing on Cyber Security and advanced network protection",
      credentialId: "Upcoming",
      link: "",
      scheduled: true
    },
    {
      title: "JavaScript",
      organization: "freecodecamp.org",
      date: "2022",
      description: "JavaScript Algorithms and Data Structures",
      credentialId: "FCD-197985",
      link: "https://www.freecodecamp.org/certification/GetGit789/javascript-algorithms-and-data-structures",
      scheduled: false
    },
    {
      title: "CompTIA A+",
      organization: "comptia.org",
      date: "2019",
      description: "EXAM CODES 220-1101 & 220-1102",
      credentialId: "COMP-668028ZE",
      link: "",
      scheduled: false,
      previouslyCertified: true
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
                className={`bg-terminal-dark border ${cert.scheduled ? 'border-terminal-accent/30' : 'border-terminal-light/10'} hover:border-terminal-accent/50 transition-all duration-300 animate-fade-in`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      {cert.scheduled ? 
                        <Calendar className="text-terminal-accent w-6 h-6" /> : 
                        <Award className="text-terminal-accent w-6 h-6" />
                      }
                    </div>
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
                      {cert.scheduled ? 'Scheduled: ' : 'Issued: '}{cert.date}
                    </div>
                    {!cert.scheduled && (
                      <div className="text-terminal-light/60">
                        Credential ID: {cert.credentialId}
                      </div>
                    )}
                    {cert.link && (
                      <a 
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-terminal-accent hover:text-terminal-accent/80 transition-colors mt-2"
                      >
                        <ExternalLink size={16} />
                        <span>Verify Credential</span>
                      </a>
                    )}
                    {!cert.scheduled && !cert.link && cert.previouslyCertified && (
                      <div className="flex items-center gap-2 text-terminal-light/60 mt-2">
                        <CheckCircle size={16} className="text-terminal-accent/70" />
                        <span>Previously Certified</span>
                      </div>
                    )}
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
