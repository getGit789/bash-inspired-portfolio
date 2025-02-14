
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { label: 'Who am i', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Experience', path: '/experience' },
    { label: 'Certs', path: '/certifications' },
    { label: 'Skills', path: '/skills' },
    { label: 'Education', path: '/education' },
  ];

  const socialLinks = [
    { label: 'YouTube', path: 'https://youtube.com', className: 'hover:text-red-500' },
    { label: 'LinkedIn', path: 'https://linkedin.com', className: 'hover:text-blue-500' },
    { label: 'Twitch', path: 'https://twitch.tv', className: 'hover:text-purple-500' },
    { label: 'Twitter', path: 'https://twitter.com', className: 'hover:text-blue-400' },
    { label: 'GitHub', path: 'https://github.com', className: 'hover:text-gray-400' },
  ];

  return (
    <nav className="fixed w-full bg-terminal-dark/95 backdrop-blur-sm z-50 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-terminal-light text-lg font-bold hover:text-terminal-accent transition-colors">
              {'>'} Portfolio
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
            <button className="bg-terminal-accent text-terminal-dark px-4 py-2 rounded hover:bg-opacity-90 transition-all">
              Download Resume
            </button>
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
              <button className="bg-terminal-accent text-terminal-dark px-4 py-2 rounded hover:bg-opacity-90 transition-all mt-4 w-full">
                Download Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
