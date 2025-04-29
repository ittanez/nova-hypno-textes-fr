
import React, { useState, useEffect } from 'react';
import { CalendarPlus } from 'lucide-react';

const FloatingButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down 300px
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-nova-green text-white rounded-full shadow-lg hover:bg-nova-green-dark transition-all transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <CalendarPlus size={20} />
      <span className="font-medium">Prendre rendez-vous</span>
    </a>
  );
};

export default FloatingButton;
