import React, { useState } from 'react';
import Linkedin from 'lucide-react/dist/esm/icons/linkedin';
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
  isExpanded: boolean;
  onToggleSection: () => void;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  onToggleMenu: () => void;
}

const MobileSection: React.FC<MobileSectionProps> = ({ title, links, isExpanded, onToggleSection, onNavClick, onToggleMenu }) => (
  <div className="border-t border-gray-200 pt-2">
    <button
      onClick={onToggleSection}
      className="w-full font-medium text-nova-neutral-dark flex items-center justify-between py-1"
      aria-expanded={isExpanded}
    >
      {title}
      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
    </button>
    <div className={`pl-4 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
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
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <div className={`md:hidden bg-white shadow-lg absolute w-full overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[80vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'}`}>
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

          {/* Sections avec sous-menus (accordéon) */}
          <MobileSection
            title="À propos"
            links={aboutLinks}
            isExpanded={openSection === 'À propos'}
            onToggleSection={() => toggleSection('À propos')}
            onNavClick={onNavClick}
            onToggleMenu={onToggleMenu}
          />

          <MobileSection
            title="L'hypnose"
            links={hypnoseLinks}
            isExpanded={openSection === "L'hypnose"}
            onToggleSection={() => toggleSection("L'hypnose")}
            onNavClick={onNavClick}
            onToggleMenu={onToggleMenu}
          />

          <MobileSection
            title="Spécialités"
            links={specialitesLinks}
            isExpanded={openSection === 'Spécialités'}
            onToggleSection={() => toggleSection('Spécialités')}
            onNavClick={onNavClick}
            onToggleMenu={onToggleMenu}
          />

          <MobileSection
            title="Mes accompagnements"
            links={accompagnementsLinks}
            isExpanded={openSection === 'Mes accompagnements'}
            onToggleSection={() => toggleSection('Mes accompagnements')}
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
            isExpanded={openSection === 'Infos pratiques'}
            onToggleSection={() => toggleSection('Infos pratiques')}
            onNavClick={onNavClick}
            onToggleMenu={onToggleMenu}
          />

          {/* Footer avec LinkedIn et RDV */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <a
              href={externalLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-nova-neutral-dark hover:text-nova-blue transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>

            <a
              href={externalLinks.appointment}
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label="Prendre rendez-vous sur Resalib (nouvel onglet)"
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
