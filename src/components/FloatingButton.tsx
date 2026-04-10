
import React, { useState, useEffect } from 'react';
import CalendarPlus from 'lucide-react/dist/esm/icons/calendar-plus';
import { trackCTAClick } from '@/lib/analytics';
import { useResalibPopup } from '@/hooks/useResalibPopup';

const FloatingButton = () => {
  const [visible, setVisible] = useState(false);
  const { openResalibPopup } = useResalibPopup();

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past 60% of viewport height
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackCTAClick('resalib_booking', 'floating_button');
    openResalibPopup();
  };

  return (
    <a
      href="https://www.resalib.fr/agenda/47325?src=novahypnose.fr"
      onClick={handleClick}
      aria-label="Prendre rendez-vous avec Alain Zenatti, hypnothérapeute à Paris"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-nova-orange text-white rounded-full shadow-lg hover:bg-nova-orange-dark transition-all transform cursor-pointer ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <CalendarPlus size={20} />
      <span className="font-medium">Prendre rendez-vous</span>
    </a>
  );
};

export default FloatingButton;
