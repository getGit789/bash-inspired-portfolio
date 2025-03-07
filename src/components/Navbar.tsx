import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { label: 'Me', path: '/' },
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
              href="/Damir_Kranjcevic_Resume.pdf"
              download
              className="bg-terminal-accent text-terminal-dark px-3 py-1.5 rounded hover:bg-opacity-90 transition-all inline-flex items-center justify-center text-sm min-w-[120px]"
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
                href="/Damir_Kranjcevic_Resume.pdf"
                download
                className="bg-terminal-accent text-terminal-dark px-4 py-2 rounded hover:bg-opacity-90 transition-all mt-4 w-full block text-center"
              >
                Download Resume
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
