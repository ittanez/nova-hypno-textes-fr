import React from 'react';
import Instagram from 'lucide-react/dist/esm/icons/instagram';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
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

interface MobileNavProps {
  isOpen: boolean;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  onToggleMenu: () => void;
}

interface MobileSectionProps {
  title: string;
  links: NavLink[];
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  onToggleMenu: () => void;
}

const MobileSection: React.FC<MobileSectionProps> = ({ title, links, onNavClick, onToggleMenu }) => (
  <div className="border-t border-gray-200 pt-2">
    <p className="font-medium text-nova-neutral-dark mb-2 flex items-center">
      {title} <ChevronDown className="ml-1 h-4 w-4" />
    </p>
    <div className="pl-4 space-y-2">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target={link.external ? "_blank" : ""}
          rel={link.external ? "noopener noreferrer" : ""}
          className="block text-nova-neutral-dark hover:text-nova-blue transition-colors"
          onClick={(e) => {
            if (!link.external) {
              onNavClick(e, link.href);
            } else {
              onToggleMenu();
            }
          }}
        >
          {link.name}
        </a>
      ))}
    </div>
  </div>
);

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onNavClick, onToggleMenu }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white shadow-lg absolute w-full">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col space-y-4">
          {/* Liens principaux */}
          {mainNavLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : ""}
              rel={link.external ? "noopener noreferrer" : ""}
              className="text-nova-neutral-dark hover:text-nova-blue transition-colors"
              onClick={(e) => onNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}

          {/* Sections avec sous-menus */}
          <MobileSection
            title="À propos"
            links={aboutLinks}
            onNavClick={onNavClick}
            onToggleMenu={onToggleMenu}
          />

          <MobileSection
            title="L'hypnose"
            links={hypnoseLinks}
            onNavClick={onNavClick}
            onToggleMenu={onToggleMenu}
          />

          <MobileSection
            title="Spécialités"
            links={specialitesLinks}
            onNavClick={onNavClick}
            onToggleMenu={onToggleMenu}
          />

          <MobileSection
            title="Mes accompagnements"
            links={accompagnementsLinks}
            onNavClick={onNavClick}
            onToggleMenu={onToggleMenu}
          />

          {/* Liens après les sections */}
          {mainNavLinksAfter.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : ""}
              rel={link.external ? "noopener noreferrer" : ""}
              className="text-nova-neutral-dark hover:text-nova-blue transition-colors"
              onClick={(e) => onNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}

          <MobileSection
            title="Infos pratiques"
            links={infosPratiquesLinks}
            onNavClick={onNavClick}
            onToggleMenu={onToggleMenu}
          />

          {/* Footer avec Instagram et RDV */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <a
              href={externalLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-nova-neutral-dark hover:text-nova-blue transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>

            <a
              href={externalLinks.appointment}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-nova-orange text-white rounded-md font-medium hover:bg-nova-orange-dark transition-colors"
            >
              <Calendar size={16} />
              Prendre RDV
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
