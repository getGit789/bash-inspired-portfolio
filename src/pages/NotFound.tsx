import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Only log 404s in development to avoid console spam in production
    if (import.meta.env.DEV) {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
      );
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-terminal-dark font-mono flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-terminal-accent">404</h1>
        <p className="text-xl text-terminal-light/80 mb-6">Page not found</p>
        <a 
          href="/" 
          className="text-terminal-accent hover:text-terminal-accent/80 underline transition-colors"
        >
          {'>'} Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
