import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-terminal-dark text-terminal-light py-4 border-t border-terminal-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex space-x-6">
            <a
              href="https://github.com/getGit789"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-light/70 hover:text-terminal-accent transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/damir-kranjcevic-613825200/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-light/70 hover:text-terminal-accent transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://x.com/DKranjcevi1973"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-light/70 hover:text-terminal-accent transition-colors"
            >
              <Twitter size={24} />
            </a>
          </div>
          <div className="text-terminal-light/50 text-sm">
            © {new Date().getFullYear()} Damir Kranjcevic. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
