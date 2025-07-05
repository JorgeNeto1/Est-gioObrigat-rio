import React, { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Maria S.',
      age: '32 anos',
      rating: 5,
      text: 'A Laura me ajudou muito a lidar com minha ansiedade. Suas técnicas de TCC foram fundamentais para eu conseguir controlar minhas crises. Recomendo muito!',
      treatment: 'Transtorno de Ansiedade'
    },
    {
      id: 2,
      name: 'João M.',
      age: '28 anos',
      rating: 5,
      text: 'Profissional excepcional! Me sinto muito mais confiante após as sessões. O ambiente do consultório é muito acolhedor e a Laura tem uma escuta incrível.',
      treatment: 'Autoestima e Desenvolvimento Pessoal'
    },
    {
      id: 3,
      name: 'Ana e Carlos',
      age: 'Casal',
      rating: 5,
      text: 'A terapia de casal salvou nosso relacionamento. Laura nos ajudou a nos comunicar melhor e a resolver nossos conflitos de forma saudável.',
      treatment: 'Terapia de Casal'
    },
    {
      id: 4,
      name: 'Pedro L.',
      age: '45 anos',
      rating: 5,
      text: 'Depois de anos evitando terapia, finalmente encontrei uma profissional que me fez sentir à vontade. Laura é muito competente e empática.',
      treatment: 'Depressão e Burnout'
    },
    {
      id: 5,
      name: 'Sofia R.',
      age: '24 anos',
      rating: 5,
      text: 'As sessões online foram perfeitas para minha rotina. Laura conseguiu me ajudar a superar minha fobia social e hoje me sinto muito mais segura.',
      treatment: 'Fobia Social'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="depoimentos" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Depoimentos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Veja o que meus clientes dizem sobre o processo terapêutico e os 
            resultados alcançados em nossas sessões.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative bg-gradient-to-br from-violet-50 to-violet-100 rounded-3xl p-8 md:p-12 mb-8">
          <div className="absolute top-6 left-6">
            <Quote className="h-12 w-12 text-violet-300" />
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>

            <blockquote className="text-xl md:text-2xl text-gray-800 italic leading-relaxed mb-8">
              "{testimonials[currentIndex].text}"
            </blockquote>

            <div className="space-y-2">
              <div className="text-lg font-bold text-gray-900">
                {testimonials[currentIndex].name}
              </div>
              <div className="text-gray-600">
                {testimonials[currentIndex].age}
              </div>
              <div className="text-sm text-violet-600 font-medium">
                {testimonials[currentIndex].treatment}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200 shadow-md"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="h-5 w-5 text-violet-600" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-violet-600' : 'bg-violet-300'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200 shadow-md"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="h-5 w-5 text-violet-600" />
            </button>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white p-6 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
                index === currentIndex % 3 ? 'border-violet-300' : 'border-violet-100'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-violet-300" />
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="space-y-1">
                <div className="font-bold text-gray-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-600">
                  {testimonial.age}
                </div>
                <div className="text-xs text-violet-600 font-medium">
                  {testimonial.treatment}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-violet-600 to-violet-700 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-violet-200">Clientes Atendidos</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">8</div>
                <div className="text-violet-200">Anos de Experiência</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-violet-200">Satisfação dos Clientes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;