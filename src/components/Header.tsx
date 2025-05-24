
import { useState, useEffect } from 'react';
import { Menu, X, Instagram, ChevronDown } from 'lucide-react';
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

  const mainNavLinks: NavLink[] = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '#about' },
    // Blog link removed from main navigation as requested
    { name: 'Témoignages', href: '#testimonials' },
  ];

  const pourQuoiLinks: NavLink[] = [
    { name: 'Applications', href: '#applications' },
    { name: 'Auto-Hypnose', href: '#self-hypnosis' },
    { name: 'Hypno-Balade', href: 'https://hypno-balade.novahypnose.fr', external: true },
  ];

  const infosPratiquesLinks: NavLink[] = [
    { name: 'Déroulement Des Séances', href: '#sessions' },
    { name: 'Tarifs', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
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
                className="text-nova-neutral-dark hover:text-nova-blue transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            {/* Pour Quoi Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-nova-neutral-dark hover:text-nova-blue transition-colors focus:outline-none">
                Pour Quoi? <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white min-w-[220px] border border-gray-200 rounded">
                {pourQuoiLinks.map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <a 
                      href={link.href}
                      target={link.external ? "_blank" : ""}
                      rel={link.external ? "noopener noreferrer" : ""}
                      className="block px-4 py-2 text-nova-neutral-dark hover:text-nova-blue hover:bg-gray-50 transition-colors"
                    >
                      {link.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
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
                  onClick={toggleMobileMenu}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Pour Quoi Mobile Section */}
              <div className="border-t border-gray-200 pt-2">
                <p className="font-medium text-nova-neutral-dark mb-2 flex items-center">
                  Pour Quoi? <ChevronDown className="ml-1 h-4 w-4" />
                </p>
                <div className="pl-4 space-y-2">
                  {pourQuoiLinks.map((link) => (
                    <a 
                      key={link.name}
                      href={link.href}
                      target={link.external ? "_blank" : ""}
                      rel={link.external ? "noopener noreferrer" : ""}
                      className="block text-nova-neutral-dark hover:text-nova-blue transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
              
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
                      onClick={toggleMobileMenu}
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
