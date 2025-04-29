
import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: 'Accueil', href: '#intro' },
    { name: 'À propos', href: '#about' },
    { name: 'Applications', href: '#applications' },
    { name: 'Auto-Hypnose', href: '#self-hypnosis' },
    { name: 'Séances', href: '#sessions' },
    { name: 'Hypno-Balade', href: 'https://hypno-balade.novahypnose.fr', external: true },
    { name: 'Témoignages', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Tarifs', href: '#pricing' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="font-serif text-2xl font-bold text-nova-blue-dark">
              NovaHypnose
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : ""}
                rel={link.external ? "noopener noreferrer" : ""}
                className="text-nova-neutral-dark hover:text-nova-blue transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            {/* Instagram Icon */}
            <a 
              href="https://www.instagram.com/novahypnose/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-nova-neutral-dark hover:text-nova-blue transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            
            {/* Highlighted Appointment Button */}
            <a 
              href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-nova-green text-white rounded-md font-medium hover:bg-nova-green-dark transition-colors ml-4"
            >
              Rendez-vous
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-nova-neutral-dark"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : ""}
                  rel={link.external ? "noopener noreferrer" : ""}
                  className="text-nova-neutral-dark hover:text-nova-blue transition-colors"
                  onClick={toggleMobileMenu}
                >
                  {link.name}
                </a>
              ))}
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                {/* Instagram Icon */}
                <a 
                  href="https://www.instagram.com/novahypnose/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nova-neutral-dark hover:text-nova-blue transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
                
                {/* Appointment Button */}
                <a 
                  href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-nova-green text-white rounded-md font-medium hover:bg-nova-green-dark transition-colors"
                >
                  Rendez-vous
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
