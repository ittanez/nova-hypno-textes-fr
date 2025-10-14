
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Separator } from '../components/ui/separator';
import { ExternalLink } from 'lucide-react';

const MentionsLegales = () => {

  const partners = [
    { name: "Psychonaute", url: "https://psychonaute.org/" },
    { name: "Proxi Bien Être", url: "https://www.proxibienetre.fr" },
    { name: "Résalib", url: "https://www.resalib.fr" },
    { name: "Annuaire Thérapeutes", url: "https://www.annuaire-therapeutes.com" },
    { name: "Juste à côté", url: "https://www.justacote.com" },
    { name: "Bonjour Hypnose", url: "https://www.bonjourhypnose.fr" },
    { name: "Now Online", url: "https://now.online" },
    { name: "Psynapse", url: "https://psynapse.fr/" },
    { name: "Proxi Hypnose", url: "https://www.proxihypnose.fr/" }
  ];

  return (
    <>
      <Helmet>
        <title>Mentions Légales - NovaHypnose</title>
        <meta name="description" content="Mentions légales de NovaHypnose, cabinet d'hypnothérapie d'Alain Zenatti à Paris." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-nova-blue-dark">Mentions Légales</h1>
          
          <div className="bg-white rounded-xl shadow-md p-8">
            <p className="mb-6 text-gray-700">
              Merci de lire avec attention les différentes modalités d'utilisation du présent site avant d'y parcourir ses pages.
              En vous connectant sur ce site, vous acceptez sans réserves les présentes modalités. Conformément à l'article n°6 de la Loi n°2004-575 du 21 Juin 2004 pour la confiance dans l'économie numérique, Alain Zenatti est le responsable du site internet novahypnose.fr.
            </p>
            
            <Separator className="my-6" />
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-nova-blue-dark mb-3">Éditeur du Site</h2>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Raison sociale :</strong> Alain ZENATTI EI</li>
                  <li><strong>Numéro Siren :</strong> 894898907</li>
                  <li><strong>Numéro Siret :</strong> 89489890700015 (siège de l'entreprise)</li>
                  <li><strong>Code NAF / APE :</strong> 8690F</li>
                  <li><strong>Adhérent :</strong> SDMH (Syndicat des Métiers de l'Hypnose)</li>
                  <li><strong>Forme juridique :</strong> Entrepreneur individuel</li>
                  <li><strong>Responsable éditorial :</strong> Alain ZENATTI</li>
                  <li><strong>Adresse :</strong> 16 Rue Saint Antoine, 75004 Paris, France</li>
                  <li><strong>Téléphone :</strong> 0649358089</li>
                  <li><strong>Email :</strong> contact@novahypnose.fr</li>
                  <li><strong>Site Web :</strong> novahypnose.fr</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-nova-blue-dark mb-3">Hébergement</h2>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Société :</strong> HOSTINGER INTERNATIONAL LTD</li>
                  <li><strong>Adresse :</strong> 61 Lordou Vironos Street, 6023 Larnaca, Chypre</li>
                  <li><strong>Site Web :</strong> hostinger.fr</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-nova-blue-dark mb-3">Développement</h2>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Société :</strong> Alain ZENATTI EI</li>
                  <li><strong>Adresse :</strong> 16 Rue Saint Antoine 75004 Paris</li>
                </ul>
              </section>
              
              <Separator className="my-6" />
              
              <section>
                <h2 className="text-xl font-semibold text-nova-blue-dark mb-3">Conditions d'utilisation</h2>
                <p className="text-gray-700">
                  Ce site (novahypnose.fr) utilise divers langages web (HTML, HTML5, JavaScript, CSS, etc.) pour offrir un meilleur confort d'utilisation et une esthétique agréable. Nous vous recommandons d'utiliser des navigateurs modernes comme Internet Explorer, Safari, Firefox, Google Chrome, etc.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-nova-blue-dark mb-3">Responsabilité et mise à jour des informations</h2>
                <p className="text-gray-700">
                  Alain Zenatti met en œuvre tous les moyens disponibles pour fournir des informations fiables et actualisées sur ses sites internet. Cependant, des erreurs ou omissions peuvent survenir. Nous vous recommandons de vérifier l'exactitude des informations et de signaler toute modification que vous jugeriez nécessaire. Alain Zenatti ne peut être tenu responsable de l'utilisation des informations disponibles sur le site, ni des préjudices directs ou indirects qui pourraient en découler.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-nova-blue-dark mb-3">Cookies</h2>
                <p className="text-gray-700">
                  Le site novahypnose.fr peut vous demander d'accepter des cookies pour des besoins de statistiques et d'affichage. Un cookie est un fichier texte placé sur votre disque dur par le serveur du site que vous visitez. Certaines parties de ce site ne fonctionnent pas sans l'acceptation des cookies.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-nova-blue-dark mb-3">Liens hypertextes</h2>
                <p className="text-gray-700">
                  Les sites internet d'Alain Zenatti peuvent contenir des liens vers d'autres sites ou ressources disponibles sur Internet. Alain Zenatti ne contrôle pas ces sites externes et ne peut garantir leur disponibilité. Il n'est pas responsable des dommages résultant de leur contenu, de leurs produits ou services, ou de leur utilisation. Toute utilisation de ces ressources relève de la responsabilité de l'utilisateur, qui doit respecter leurs conditions d'utilisation.
                </p>
                <p className="mt-2 text-gray-700">
                  Les utilisateurs, abonnés ou visiteurs des sites d'Alain Zenatti ne peuvent mettre en place un hyperlien vers ce site sans autorisation expresse préalable. Si vous souhaitez créer un hyperlien, envoyez une demande par e-mail. Alain Zenatti se réserve le droit d'accepter ou de refuser cette demande sans justification.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-nova-blue-dark mb-3">Services fournis</h2>
                <p className="text-gray-700">
                  Le site novahypnose.fr présente toutes les activités et informations de la société. Alain Zenatti s'efforce de fournir des informations aussi précises que possible, bien que celles-ci ne soient pas exhaustives et que les photos ne soient pas contractuelles. Les informations sont susceptibles de changer sans préavis.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-nova-blue-dark mb-3">Limitation contractuelle sur les données</h2>
                <p className="text-gray-700">
                  Les informations présentes sur ce site sont aussi précises que possible et le site est mis à jour régulièrement. Toutefois, il peut contenir des inexactitudes ou des omissions. Si vous constatez un problème, veuillez le signaler par e-mail à contact@novahypnose.fr, en décrivant la nature du problème.
                </p>
                <p className="mt-2 text-gray-700">
                  Tout contenu téléchargé se fait aux risques et périls de l'utilisateur. Alain Zenatti ne saurait être tenu responsable des dommages subis par l'ordinateur de l'utilisateur ou des pertes de données résultant d'un téléchargement. Les liens hypertextes mis en place vers d'autres ressources sur Internet ne sauraient engager la responsabilité d'Alain Zenatti.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-nova-blue-dark mb-3">Propriété intellectuelle</h2>
                <p className="text-gray-700">
                  Tout le contenu du site novahypnose.fr, y compris les graphismes, images, textes, vidéos, animations, sons, logos, gifs et icônes, est la propriété exclusive d'Alain Zenatti, sauf indication contraire. Toute reproduction, modification ou diffusion de ce contenu sans autorisation écrite est strictement interdite et constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-nova-blue-dark mb-3">Litiges</h2>
                <p className="text-gray-700">
                  Les présentes conditions du site novahypnose.fr sont régies par la loi française. Tout litige lié à l'interprétation ou à l'exécution de ces conditions sera soumis à la compétence exclusive des tribunaux français. La langue de référence pour le règlement des litiges est le français.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-nova-blue-dark mb-3">Médiation</h2>
                <p className="text-gray-700">
                  Conformément à l'article L. 612-1 du Code de la consommation, nous vous informons que nous avons adhéré à la Société de la Médiation Professionnelle (SMP) pour le règlement amiable des litiges. Si vous avez un différend avec nos services et que vous n'avez pas trouvé de solution directement avec nous, vous pouvez contacter le médiateur à l'adresse suivante :
                </p>
                <div className="mt-2 pl-4 border-l-4 border-nova-blue-light p-3 bg-nova-blue-light bg-opacity-10">
                  <p className="text-gray-700">Société de la Médiation Professionnelle – Médiateurs Associés</p>
                  <p className="text-gray-700">24, rue Albert de Mun</p>
                  <p className="text-gray-700">33000 Bordeaux</p>
                  <p className="text-gray-700">Siret : 81438535700011</p>
                  <p className="text-gray-700">RCS B814385357</p>
                  <p className="text-gray-700">Courriel : saisine@www.mediateur-consommation-smp.fr</p>
                  <p className="text-gray-700">Adresse de correspondance : Alteritae, 5 rue Salvaing, 12000 Rodez</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-nova-blue-dark mb-3">Données personnelles</h2>
                <p className="text-gray-700">
                  En général, vous n'êtes pas obligé de fournir vos données personnelles lors de votre visite sur le site novahypnose.fr. Cependant, certaines exceptions existent, notamment pour les services qui nécessitent des informations telles que votre nom, adresse électronique et numéro de téléphone. Vous pouvez refuser de fournir ces données, mais cela pourrait limiter l'utilisation de certains services du site, comme demander des renseignements ou recevoir des lettres d'information.
                </p>
                <p className="mt-2 text-gray-700">
                  Certaines informations peuvent également être collectées automatiquement lors de votre navigation, telles que les zones visitées, l'adresse IP, le type de navigateur et les temps d'accès. Ces informations sont utilisées uniquement à des fins statistiques pour améliorer la qualité des services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-nova-blue-dark mb-3">Partenaires</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {partners.map((partner, index) => (
                    <a 
                      key={index}
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-nova-blue transition-colors"
                    >
                      <span>{partner.name}</span>
                      <ExternalLink size={16} className="ml-1" />
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MentionsLegales;
