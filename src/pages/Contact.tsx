import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";
import { Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-terminal-dark font-mono">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <div className="bg-terminal-accent/20 inline-block px-3 py-1 rounded-full mb-4">
              <span className="text-terminal-accent text-sm">Get in Touch</span>
            </div>
            <h1 className="text-4xl font-bold text-terminal-light mb-4">
              Contact Me
            </h1>
            <p className="text-terminal-light/80 max-w-2xl mx-auto">
              Have a question or want to work together? Feel free to send me a message!
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 text-terminal-light/80">
              <Mail className="w-5 h-5" />
              <span>contact@damirkranjcevic.com</span>
            </div>
          </div>

          <ContactForm />
        </div>
      </main>
    </div>
  );
};

export default Contact;
