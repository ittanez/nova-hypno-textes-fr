import React, { useLayoutEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Révèle une section à son entrée dans la fenêtre (fondu + légère translation),
 * une seule fois. Les grilles marquées `.stagger` à l'intérieur voient leurs
 * cartes entrer l'une après l'autre (60 ms d'écart, voir src/index.css).
 *
 * Garde-fous, dans l'ordre :
 * - mouvement réduit demandé par le système → rien n'est masqué, rien n'anime ;
 * - section déjà visible au chargement → rendue telle quelle (le premier écran
 *   ne clignote jamais) ;
 * - pas d'IntersectionObserver → rendue telle quelle.
 * La classe `reveal-block` n'est donc posée que sur ce qui est hors écran, et
 * seulement quand une animation pourra effectivement la retirer.
 */
const Reveal: React.FC<RevealProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [inView, setInView] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    if (el.getBoundingClientRect().top <= window.innerHeight) return;

    setArmed(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const classes = [armed ? 'reveal-block' : '', inView ? 'in' : '', className].filter(Boolean).join(' ');
  return (
    <div ref={ref} className={classes || undefined}>
      {children}
    </div>
  );
};

export default Reveal;
