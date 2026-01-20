import { describe, it, expect } from 'vitest';
import {
  mainNavLinks,
  mainNavLinksAfter,
  aboutLinks,
  hypnoseLinks,
  accompagnementsLinks,
  infosPratiquesLinks,
  dropdownSections,
  externalLinks,
  NavLink,
} from '../navigationData';

describe('Navigation Data', () => {
  describe('mainNavLinks', () => {
    it('should contain Accueil link', () => {
      expect(mainNavLinks).toHaveLength(1);
      expect(mainNavLinks[0].name).toBe('Accueil');
      expect(mainNavLinks[0].href).toBe('/');
    });
  });

  describe('mainNavLinksAfter', () => {
    it('should contain Blog link', () => {
      expect(mainNavLinksAfter).toHaveLength(1);
      expect(mainNavLinksAfter[0].name).toBe('Blog');
      expect(mainNavLinksAfter[0].href).toBe('/blog');
    });
  });

  describe('aboutLinks', () => {
    it('should have correct number of links', () => {
      expect(aboutLinks.length).toBeGreaterThan(0);
    });

    it('should have valid href format', () => {
      aboutLinks.forEach((link: NavLink) => {
        expect(link.href).toMatch(/^(\/|#|https?:\/\/)/);
      });
    });
  });

  describe('hypnoseLinks', () => {
    it('should contain test de réceptivité', () => {
      const testLink = hypnoseLinks.find(link => link.href === '/test-receptivite');
      expect(testLink).toBeDefined();
    });
  });

  describe('accompagnementsLinks', () => {
    it('should mark external links correctly', () => {
      const externalLink = accompagnementsLinks.find(link => link.external === true);
      expect(externalLink).toBeDefined();
      expect(externalLink?.href).toMatch(/^https?:\/\//);
    });
  });

  describe('infosPratiquesLinks', () => {
    it('should contain tarifs, FAQ, and contact', () => {
      const expectedSections = ['tarifs', 'faq', 'contact'];
      expectedSections.forEach(section => {
        const link = infosPratiquesLinks.find(l => l.href.includes(section));
        expect(link).toBeDefined();
      });
    });
  });

  describe('dropdownSections', () => {
    it('should have 3 dropdown sections', () => {
      expect(dropdownSections).toHaveLength(3);
    });

    it('should have titles and links for each section', () => {
      dropdownSections.forEach(section => {
        expect(section.title).toBeTruthy();
        expect(section.links.length).toBeGreaterThan(0);
      });
    });
  });

  describe('externalLinks', () => {
    it('should have valid Instagram URL', () => {
      expect(externalLinks.instagram).toMatch(/instagram\.com/);
    });

    it('should have valid appointment URL', () => {
      expect(externalLinks.appointment).toMatch(/resalib\.fr/);
    });
  });

  describe('NavLink structure', () => {
    it('all links should have required name and href', () => {
      const allLinks = [
        ...mainNavLinks,
        ...mainNavLinksAfter,
        ...aboutLinks,
        ...hypnoseLinks,
        ...accompagnementsLinks,
        ...infosPratiquesLinks,
      ];

      allLinks.forEach((link: NavLink) => {
        expect(link.name).toBeTruthy();
        expect(link.href).toBeTruthy();
      });
    });
  });
});
