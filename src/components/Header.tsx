import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Menu from 'lucide-react/dist/esm/icons/menu';
import X from 'lucide-react/dist/esm/icons/x';
import { DesktopNav, MobileNav } from './header';

/**
 * Header principal du site NovaHypnose
 * Refactorisé pour meilleure maintenabilité
 * - DesktopNav: Navigation desktop avec dropdowns
 * - MobileNav: Navigation mobile avec accordéons
 * - navigationData: Configuration centralisée des liens
 */
const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' && window.innerWidth >= 768
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
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

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-white/95 backdrop-blur-sm shadow-sm py-2'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="font-serif text-2xl font-bold text-nova-blue-dark">
              NovaHypnose
            </a>
          </div>

          {/* Desktop Navigation */}
          <DesktopNav isDesktop={isDesktop} onNavClick={handleNavClick} />

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
      <MobileNav
        isOpen={mobileMenuOpen}
        onNavClick={handleNavClick}
        onToggleMenu={toggleMobileMenu}
      />
    </header>
  );
};

export default Header;
