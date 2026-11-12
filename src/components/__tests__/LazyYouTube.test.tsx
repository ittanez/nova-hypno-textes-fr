import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LazyYouTube from '../LazyYouTube';
import { extractYouTubeId } from '@/lib/youtube';

const ID = 'AbCdEfGhIjK';
const TITLE = 'Vidéo de test';

// jsdom n'a pas d'IntersectionObserver : on simule une section déjà visible
beforeEach(() => {
  class FakeObserver {
    private cb: (entries: { isIntersecting: boolean }[]) => void;
    constructor(cb: (entries: { isIntersecting: boolean }[]) => void) {
      this.cb = cb;
    }
    observe() {
      this.cb([{ isIntersecting: true }]);
    }
    disconnect() {}
  }
  vi.stubGlobal('IntersectionObserver', FakeObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const getThumb = (container: HTMLElement) => container.querySelector('img') as HTMLImageElement;

describe('extractYouTubeId', () => {
  it('accepte un ID brut et les formats d\'URL courants', () => {
    expect(extractYouTubeId(ID)).toBe(ID);
    expect(extractYouTubeId(`https://www.youtube.com/watch?v=${ID}`)).toBe(ID);
    expect(extractYouTubeId(`https://youtu.be/${ID}?si=xyz`)).toBe(ID);
    expect(extractYouTubeId(`https://www.youtube.com/embed/${ID}`)).toBe(ID);
    expect(extractYouTubeId(`https://www.youtube.com/shorts/${ID}`)).toBe(ID);
  });
});

describe('LazyYouTube', () => {
  it('affiche la vignette sddefault, sans texte alternatif', () => {
    const { container } = render(<LazyYouTube videoId={ID} title={TITLE} />);
    const img = getThumb(container);
    expect(img.src).toBe(`https://img.youtube.com/vi/${ID}/sddefault.jpg`);
    expect(img.getAttribute('alt')).toBe('');
  });

  it('bascule sur le second hôte si la première vignette échoue', () => {
    const { container } = render(<LazyYouTube videoId={ID} title={TITLE} />);
    fireEvent.error(getThumb(container));
    expect(getThumb(container).src).toBe(`https://i.ytimg.com/vi/${ID}/hqdefault.jpg`);
  });

  it('bascule aussi quand YouTube renvoie l\'image grise de 120 px', () => {
    const { container } = render(<LazyYouTube videoId={ID} title={TITLE} />);
    const img = getThumb(container);
    Object.defineProperty(img, 'naturalWidth', { value: 120, configurable: true });
    fireEvent.load(img);
    expect(getThumb(container).src).toBe(`https://i.ytimg.com/vi/${ID}/hqdefault.jpg`);
  });

  it('montre le titre tant que la vraie vignette n\'est pas chargée, puis le masque', () => {
    const { container } = render(<LazyYouTube videoId={ID} title={TITLE} />);
    // Chargement en cours : cadre titré visible
    expect(screen.getByText(TITLE)).toBeInTheDocument();

    const img = getThumb(container);
    Object.defineProperty(img, 'naturalWidth', { value: 640, configurable: true });
    fireEvent.load(img);
    expect(screen.queryByText(TITLE)).not.toBeInTheDocument();
    expect(img.className).toContain('opacity-100');
  });

  it('garde le cadre titré et ne boucle pas quand les deux sources échouent', () => {
    const { container } = render(<LazyYouTube videoId={ID} title={TITLE} />);
    fireEvent.error(getThumb(container));
    fireEvent.error(getThumb(container));
    fireEvent.error(getThumb(container));
    expect(screen.getByText(TITLE)).toBeInTheDocument();
    expect(getThumb(container).className).toContain('opacity-0');
  });

  it('charge le lecteur nocookie au clic et appelle onPlay', () => {
    const onPlay = vi.fn();
    const { container } = render(<LazyYouTube videoId={ID} title={TITLE} onPlay={onPlay} />);
    fireEvent.click(screen.getByRole('button', { name: `Lire la vidéo : ${TITLE}` }));
    const iframe = container.querySelector('iframe') as HTMLIFrameElement;
    expect(iframe.src).toBe(`https://www.youtube-nocookie.com/embed/${ID}?autoplay=1&rel=0`);
    expect(iframe.title).toBe(TITLE);
    expect(onPlay).toHaveBeenCalledTimes(1);
  });

  it('lance le lecteur immédiatement avec autoStart', () => {
    const { container } = render(<LazyYouTube videoId={ID} title={TITLE} autoStart />);
    expect(container.querySelector('iframe')).not.toBeNull();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
