import React from 'react';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { NavLink } from './navigationData';

interface NavDropdownProps {
  title: string;
  links: NavLink[];
  isDesktop: boolean;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ title, links, isDesktop, onNavClick }) => {
  if (!isDesktop) return null;

  return (
    <div
      className="desktop-dropdown-wrapper hidden md:flex"
      style={{ display: isDesktop ? 'flex' : 'none' }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center text-nova-neutral-dark hover:text-nova-blue transition-colors focus:outline-none">
          {title} <ChevronDown className="ml-1 h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white min-w-[220px] border border-gray-200 rounded">
          {links.map((link) => (
            <DropdownMenuItem key={link.name} asChild>
              <a
                href={link.href}
                target={link.external ? "_blank" : ""}
                rel={link.external ? "noopener noreferrer" : ""}
                onClick={(e) => onNavClick(e, link.href)}
                className="block px-4 py-2 text-nova-neutral-dark hover:text-nova-blue hover:bg-gray-50 transition-colors"
              >
                {link.name}
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavDropdown;
