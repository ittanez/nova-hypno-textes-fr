/**
 * Hook pour ouvrir la fenêtre de réservation Resalib dans un popup
 */

export const useResalibPopup = () => {
  const openResalibPopup = (url: string = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr') => {
    // Dimensions du popup
    const width = 800;
    const height = 700;

    // Centrer le popup sur l'écran
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    // Paramètres du popup
    const params = `scrollbars=yes,resizable=yes,toolbar=no,location=yes,status=yes,menubar=no,width=${width},height=${height},left=${left},top=${top}`;

    // Ouvrir dans un popup
    window.open(url, 'resalib_booking', params);
  };

  return { openResalibPopup };
};
