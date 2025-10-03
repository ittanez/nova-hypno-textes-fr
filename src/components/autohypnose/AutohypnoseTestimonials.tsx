import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const AutohypnoseTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sophie L.",
      role: "Cadre dans la finance",
      text: "La formation Harmonia a transformé ma gestion du stress au quotidien. Les techniques d'auto-hypnose que j'ai apprises me permettent de retrouver mon calme en quelques minutes, même dans les moments les plus intenses.",
      rating: 5,
      date: "Janvier 2025"
    },
    {
      name: "Marc D.",
      role: "Entrepreneur",
      text: "J'étais sceptique au départ, mais Alain m'a convaincu dès les premières minutes. Le programme est structuré, pratique et immédiatement applicable. Je recommande vivement cette formation à tous ceux qui cherchent à mieux gérer leur stress.",
      rating: 5,
      date: "Décembre 2024"
    },
    {
      name: "Nadia K.",
      role: "Enseignante",
      text: "Cette formation m'a donné des outils concrets pour gérer mon anxiété et améliorer mon sommeil. Le petit groupe permet un accompagnement personnalisé et les échanges sont très enrichissants.",
      rating: 5,
      date: "Novembre 2024"
    },
    {
      name: "Thomas R.",
      role: "Développeur web",
      text: "Formation exceptionnelle ! Alain est un formateur passionné et pédagogue. En une journée, j'ai acquis des compétences qui m'aident au quotidien. Le suivi téléphonique un mois après est un vrai plus.",
      rating: 5,
      date: "Octobre 2024"
    },
    {
      name: "Émilie B.",
      role: "Manager",
      text: "Grâce à la formation Harmonia, j'ai appris à créer mon lieu sûr intérieur et à l'utiliser dans les moments difficiles. C'est devenu un réflexe salvateur au travail comme à la maison.",
      rating: 5,
      date: "Septembre 2024"
    },
    {
      name: "David M.",
      role: "Commercial",
      text: "Une journée intense et enrichissante ! Les techniques apprises sont faciles à mettre en pratique. Je dors mieux, je suis plus serein face aux défis professionnels. Un investissement qui change la vie.",
      rating: 5,
      date: "Août 2024"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-nova-blue-light">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-nova-blue-dark font-serif">
              Ils ont suivi la formation Harmonia
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Découvrez les témoignages de nos participants qui ont transformé leur relation au stress
            </p>
          </div>

          {/* Carousel pour mobile */}
          <div className="md:hidden mb-12">
            <div className="relative">
              <Card className="shadow-md border-nova-blue/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-nova-green text-nova-green" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic leading-relaxed">
                    "{testimonials[currentIndex].text}"
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-semibold text-nova-blue-dark">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-gray-600">{testimonials[currentIndex].role}</p>
                    <p className="text-xs text-gray-500 mt-1">{testimonials[currentIndex].date}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation en bas pour mobile */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-nova-blue text-white hover:bg-nova-blue-dark transition-colors"
                  aria-label="Témoignage précédent"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? 'bg-nova-blue' : 'bg-gray-300'
                      }`}
                      aria-label={`Aller au témoignage ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-nova-blue text-white hover:bg-nova-blue-dark transition-colors"
                  aria-label="Témoignage suivant"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Carousel pour desktop (3 témoignages à la fois) */}
          <div className="hidden md:block mb-12">
            <div className="relative">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[0, 1, 2].map((offset) => {
                  const index = (currentIndex + offset) % testimonials.length;
                  const testimonial = testimonials[index];
                  return (
                    <Card key={offset} className="shadow-md hover:shadow-xl transition-shadow border-nova-blue/20">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-nova-green text-nova-green" />
                          ))}
                        </div>
                        <p className="text-gray-700 mb-4 italic leading-relaxed">
                          "{testimonial.text}"
                        </p>
                        <div className="border-t border-gray-200 pt-4">
                          <p className="font-semibold text-nova-blue-dark">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                          <p className="text-xs text-gray-500 mt-1">{testimonial.date}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Navigation en bas pour desktop */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-nova-blue text-white hover:bg-nova-blue-dark transition-colors"
                  aria-label="Témoignages précédents"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? 'bg-nova-blue' : 'bg-gray-300'
                      }`}
                      aria-label={`Aller au groupe de témoignages ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-nova-blue text-white hover:bg-nova-blue-dark transition-colors"
                  aria-label="Témoignages suivants"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="text-center bg-nova-blue-light rounded-xl p-8">
            <p className="text-2xl font-bold text-nova-blue-dark mb-4">
              95% de satisfaction
            </p>
            <p className="text-gray-700 mb-6">
              Rejoignez les centaines de personnes qui ont déjà retrouvé leur sérénité grâce à l'auto-hypnose
            </p>
            <a
              href="#quiz"
              className="inline-block px-8 py-4 bg-nova-green text-white rounded-full shadow-lg hover:bg-nova-green-dark transition-colors text-lg font-semibold"
            >
              Commencer le test de sérénité
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutohypnoseTestimonials;
