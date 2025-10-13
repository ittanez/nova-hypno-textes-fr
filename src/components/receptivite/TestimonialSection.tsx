const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Marie L.",
      quote: "J'étais sceptique avant de faire ce test, mais les résultats étaient étonnamment précis ! J'ai enfin compris pourquoi certaines techniques fonctionnaient mieux que d'autres pour moi.",
      image: "https://novahypnose.fr/wp-content/uploads/2025/04/image_fx-13.png"
    },
    {
      name: "Thomas B.",
      quote: "Grâce à ce test, j'ai économisé du temps et de l'argent en choisissant un hypnothérapeute qui utilise des méthodes adaptées à mon profil. Résultat : 3 séances au lieu de 10 !",
      image: "https://novahypnose.fr/wp-content/uploads/2025/04/image_fx-9.png"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mb-4 object-cover"
                loading="lazy"
              />
              <blockquote className="mb-4 text-nova-neutral-dark italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <cite className="font-semibold text-nova-blue-dark not-italic">{testimonial.name}</cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
