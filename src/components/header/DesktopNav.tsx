import React from 'react';
import Linkedin from 'lucide-react/dist/esm/icons/linkedin';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import NavDropdown from './NavDropdown';
import {
  NavLink,
  mainNavLinks,
  mainNavLinksAfter,
  aboutLinks,
  hypnoseLinks,
  specialitesLinks,
  accompagnementsLinks,
  infosPratiquesLinks,
  externalLinks
} from './navigationData';

interface DesktopNavProps {
  isDesktop: boolean;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const NavLinkItem: React.FC<{
  link: NavLink;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}> = ({ link, onNavClick }) => (
  <a
    href={link.href}
    target={link.external ? "_blank" : ""}
    rel={link.external ? "noopener noreferrer" : ""}
    onClick={(e) => onNavClick(e, link.href)}
    className="text-nova-neutral-dark hover:text-nova-blue transition-colors"
  >
    {link.name}
  </a>
);

const DesktopNav: React.FC<DesktopNavProps> = ({ isDesktop, onNavClick }) => {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      {/* Liens principaux avant les dropdowns */}
      {mainNavLinks.map((link) => (
        <NavLinkItem key={link.name} link={link} onNavClick={onNavClick} />
      ))}

      {/* Dropdowns */}
      <NavDropdown
        title="À propos"
        links={aboutLinks}
        isDesktop={isDesktop}
        onNavClick={onNavClick}
      />

      <NavDropdown
        title="L'hypnose"
        links={hypnoseLinks}
        isDesktop={isDesktop}
        onNavClick={onNavClick}
      />

      <NavDropdown
        title="Spécialités"
        links={specialitesLinks}
        isDesktop={isDesktop}
        onNavClick={onNavClick}
      />

      <NavDropdown
        title="Mes accompagnements"
        links={accompagnementsLinks}
        isDesktop={isDesktop}
        onNavClick={onNavClick}
      />

      {/* Liens principaux après les dropdowns */}
      {mainNavLinksAfter.map((link) => (
        <NavLinkItem key={link.name} link={link} onNavClick={onNavClick} />
      ))}

      <NavDropdown
        title="Infos pratiques"
        links={infosPratiquesLinks}
        isDesktop={isDesktop}
        onNavClick={onNavClick}
      />

      {/* LinkedIn */}
      <a
        href={externalLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-nova-neutral-dark hover:text-nova-blue transition-colors"
        aria-label="LinkedIn"
      >
        <Linkedin size={24} />
      </a>

      {/* Bouton RDV */}
      <a
        href={externalLinks.appointment}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="inline-flex items-center gap-2 px-4 py-2 bg-nova-orange text-white rounded-md font-medium hover:bg-nova-orange-dark transition-colors ml-4"
      >
        <Calendar size={16} />
        Prendre RDV
      </a>
    </nav>
  );
};

export default DesktopNav;
