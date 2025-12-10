import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ResumeDownloadDialog from './ResumeDownloadDialog';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);

  const navigationItems = [
    { label: 'Why', path: '/why' },
    { label: 'Projects', path: '/projects' },
    { label: 'Experience', path: '/experience' },
    { label: 'Certs', path: '/certifications' },
    { label: 'Skills', path: '/skills' },
    { label: 'Education', path: '/education' },
    { label: 'Contact', path: '/contact' }
  ];

  const socialLinks = [
    { label: 'LinkedIn', path: 'https://www.linkedin.com/in/damir-kranjcevic-613825200/', className: 'hover:text-blue-500' },
    { label: 'GitHub', path: 'https://github.com/GetGit789', className: 'hover:text-gray-400' },
  ];

  const handleDownloadResume = async () => {
    try {
      const response = await fetch('/Kranjčević_Damir_Resume.pdf');
      
      if (!response.ok) {
        throw new Error(`Failed to download resume: ${response.status} ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Kranjčević_Damir_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Silently fail in production, log in development
      if (import.meta.env.DEV) {
        console.error('Error downloading resume:', error);
      }
    }
  };

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsDownloadDialogOpen(true);
  };

  return (
    <nav className="fixed w-full bg-terminal-dark/95 backdrop-blur-sm z-50 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-terminal-light text-lg font-bold hover:text-terminal-accent transition-colors">
              {'>'} Damir Kranjcevic
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-terminal-light hover:text-terminal-accent px-3 py-2 rounded-md text-sm transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="#"
              onClick={handleDownloadClick}
              className="bg-terminal-accent text-terminal-dark px-3 py-1.5 rounded hover:bg-opacity-90 transition-all inline-flex items-center justify-center text-sm min-w-[120px] cursor-pointer"
            >
              Download Resume
            </a>
            <div className="flex items-center space-x-4 ml-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-terminal-light ${link.className} transition-colors`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-terminal-light hover:text-terminal-accent"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-terminal-light hover:text-terminal-accent block px-3 py-2 rounded-md text-base transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-wrap gap-4 pt-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-terminal-light ${link.className} transition-colors`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDownloadDialogOpen(true);
                  setIsOpen(false);
                }}
                className="bg-terminal-accent text-terminal-dark px-4 py-2 rounded hover:bg-opacity-90 transition-all mt-4 w-full block text-center cursor-pointer"
              >
                Download Resume
              </a>
            </div>
          </div>
        )}
      </div>
      <ResumeDownloadDialog
        open={isDownloadDialogOpen}
        onOpenChange={setIsDownloadDialogOpen}
        onDownload={handleDownloadResume}
      />
    </nav>
  );
};

export default Navbar;
