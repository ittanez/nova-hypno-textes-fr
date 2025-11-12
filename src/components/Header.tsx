import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Menu from 'lucide-react/dist/esm/icons/menu';
import X from 'lucide-react/dist/esm/icons/x';
import Instagram from 'lucide-react/dist/esm/icons/instagram';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

// Define interface for navigation links
interface NavLink {
  name: string;
  href: string;
  external?: boolean;
}

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Fermer le menu mobile
    setMobileMenuOpen(false);

    // Si c'est un lien avec ancre (#section)
    if (href.startsWith('/#')) {
      e.preventDefault();
      const section = href.substring(2); // Enlever "/#"

      // Si on est déjà sur la page d'accueil
      if (location.pathname === '/') {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Sinon, naviguer vers l'accueil puis scroller
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
    // Pour les vraies routes (/, /blog, etc.), laisser le comportement par défaut
  };

  const mainNavLinks: NavLink[] = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/#about' },
  ];

  const mainNavLinksAfter: NavLink[] = [
    { name: 'Témoignages', href: '/#temoignages' },
    { name: 'Blog', href: '/blog' },
  ];

  const hypnoseLinks: NavLink[] = [
    { name: 'Comment fonctionne l\'hypnose', href: '/#comment-fonctionne' },
    { name: 'L\'auto-hypnose', href: '/#self-hypnosis' },
    { name: 'Déroulement des séances', href: '/#deroulement' },
    { name: 'Test de réceptivité', href: '/test-receptivite' },
  ];

  const accompagnementsLinks: NavLink[] = [
    { name: 'Applications', href: '/#applications' },
    { name: 'Formation auto-hypnose', href: 'https://novahypnose.fr/autohypnose', external: true },
    { name: 'Offre Liberté Aérienne', href: '/peurdelavion' },
  ];

  const infosPratiquesLinks: NavLink[] = [
    { name: 'Tarifs', href: '/#tarifs' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Zone d\'intervention', href: '/zone-intervention' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm shadow-sm py-2'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="font-serif text-2xl font-bold text-nova-blue-dark">
              NovaHypnose
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">

            {mainNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : ""}
                rel={link.external ? "noopener noreferrer" : ""}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-nova-neutral-dark hover:text-nova-blue transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* L'hypnose Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-nova-neutral-dark hover:text-nova-blue transition-colors focus:outline-none">
                L'hypnose <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white min-w-[220px] border border-gray-200 rounded">
                {hypnoseLinks.map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : ""}
                      rel={link.external ? "noopener noreferrer" : ""}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block px-4 py-2 text-nova-neutral-dark hover:text-nova-blue hover:bg-gray-50 transition-colors"
                    >
                      {link.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mes accompagnements Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-nova-neutral-dark hover:text-nova-blue transition-colors focus:outline-none">
                Mes accompagnements <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white min-w-[220px] border border-gray-200 rounded">
                {accompagnementsLinks.map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : ""}
                      rel={link.external ? "noopener noreferrer" : ""}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block px-4 py-2 text-nova-neutral-dark hover:text-nova-blue hover:bg-gray-50 transition-colors"
                    >
                      {link.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {mainNavLinksAfter.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : ""}
                rel={link.external ? "noopener noreferrer" : ""}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-nova-neutral-dark hover:text-nova-blue transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Infos Pratiques Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-nova-neutral-dark hover:text-nova-blue transition-colors focus:outline-none">
                Infos pratiques <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white min-w-[220px] border border-gray-200 rounded">
                {infosPratiquesLinks.map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block px-4 py-2 text-nova-neutral-dark hover:text-nova-blue hover:bg-gray-50 transition-colors"
                    >
                      {link.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
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
              {mainNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : ""}
                  rel={link.external ? "noopener noreferrer" : ""}
                  className="text-nova-neutral-dark hover:text-nova-blue transition-colors"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              ))}

              {/* L'hypnose Mobile Section */}
              <div className="border-t border-gray-200 pt-2">
                <p className="font-medium text-nova-neutral-dark mb-2 flex items-center">
                  L'hypnose <ChevronDown className="ml-1 h-4 w-4" />
                </p>
                <div className="pl-4 space-y-2">
                  {hypnoseLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target={link.external ? "_blank" : ""}
                      rel={link.external ? "noopener noreferrer" : ""}
                      className="block text-nova-neutral-dark hover:text-nova-blue transition-colors"
                      onClick={(e) => {
                        if (!link.external) {
                          handleNavClick(e, link.href);
                        } else {
                          toggleMobileMenu();
                        }
                      }}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Mes accompagnements Mobile Section */}
              <div className="border-t border-gray-200 pt-2">
                <p className="font-medium text-nova-neutral-dark mb-2 flex items-center">
                  Mes accompagnements <ChevronDown className="ml-1 h-4 w-4" />
                </p>
                <div className="pl-4 space-y-2">
                  {accompagnementsLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target={link.external ? "_blank" : ""}
                      rel={link.external ? "noopener noreferrer" : ""}
                      className="block text-nova-neutral-dark hover:text-nova-blue transition-colors"
                      onClick={(e) => {
                        if (!link.external) {
                          handleNavClick(e, link.href);
                        } else {
                          toggleMobileMenu();
                        }
                      }}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              {mainNavLinksAfter.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : ""}
                  rel={link.external ? "noopener noreferrer" : ""}
                  className="text-nova-neutral-dark hover:text-nova-blue transition-colors"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              ))}

              {/* Mobile Infos Pratiques Section */}
              <div className="border-t border-gray-200 pt-2">
                <p className="font-medium text-nova-neutral-dark mb-2 flex items-center">
                  Infos pratiques <ChevronDown className="ml-1 h-4 w-4" />
                </p>
                <div className="pl-4 space-y-2">
                  {infosPratiquesLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block text-nova-neutral-dark hover:text-nova-blue transition-colors"
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
              
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
