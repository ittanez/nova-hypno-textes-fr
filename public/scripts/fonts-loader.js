// Détection du chargement des fonts pour éviter FOUT
if ('fonts' in document) {
  Promise.all([
    document.fonts.load("700 1em 'Playfair Display'"),
    document.fonts.load("400 1em 'Poppins'"),
    document.fonts.load("600 1em 'Poppins'")
  ]).then(function() {
    document.documentElement.classList.add('fonts-loaded');
  }).catch(function() {
    // Fallback: ajouter la classe après 3s si le chargement échoue
    setTimeout(function() {
      document.documentElement.classList.add('fonts-loaded');
    }, 3000);
  });
} else {
  // Fallback pour navigateurs anciens
  document.documentElement.classList.add('fonts-loaded');
}
