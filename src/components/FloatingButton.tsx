
import React, { useState, useEffect } from 'react';
import CalendarPlus from 'lucide-react/dist/esm/icons/calendar-plus';

const FloatingButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past 60% of viewport height
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
      target="_blank"
      rel="noopener noreferrer nofollow"
      aria-label="Prendre rendez-vous avec Alain Zenatti, hypnothérapeute à Paris"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-nova-orange text-white rounded-full shadow-lg hover:bg-nova-orange-dark transition-all transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <CalendarPlus size={20} />
      <span className="font-medium">Prendre rendez-vous</span>
    </a>
  );
};

export default FloatingButton;
