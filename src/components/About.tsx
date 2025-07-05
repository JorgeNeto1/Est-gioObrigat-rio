import React from 'react';
import { GraduationCap, Award, Users, Heart } from 'lucide-react';

const About: React.FC = () => {
  const qualifications = [
    {
      icon: GraduationCap,
      title: 'Formação Acadêmica',
      description: 'Graduação em Psicologia pela USP, Pós-graduação em Terapia Cognitivo-Comportamental'
    },
    {
      icon: Award,
      title: 'Especialização',
      description: 'Especialista em TCC, Terapia Humanista e técnicas de Mindfulness'
    },
    {
      icon: Users,
      title: 'Experiência',
      description: 'Mais de 8 anos atendendo adolescentes, adultos e casais'
    },
    {
      icon: Heart,
      title: 'Abordagem',
      description: 'Atendimento humanizado, acolhedor e baseado em evidências científicas'
    }
  ];

  const specialties = [
    'Ansiedade e Transtornos de Ansiedade',
    'Depressão e Transtornos do Humor',
    'Autoestima e Autoconhecimento',
    'Relacionamentos e Terapia de Casal',
    'Estresse e Burnout',
    'Transtornos Alimentares',
    'Luto e Perdas',
    'Fobias e Medos'
  ];

  return (
    <section id="sobre" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sobre Mim
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sou psicóloga especializada em ajudar pessoas a encontrarem equilíbrio emocional 
            e bem-estar mental através de uma abordagem acolhedora e cientificamente fundamentada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-3xl p-6">
              <img
                src="https://images.pexels.com/photos/5699431/pexels-photo-5699431.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Laura Mantovani - Psicóloga"
                className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Laura Mantovani Mira
              </h3>
              <p className="text-lg text-violet-600 font-medium">
                Psicóloga Clínica
              </p>
              <p className="text-gray-700 leading-relaxed">
                Com mais de 8 anos de experiência em psicologia clínica, dedico-me a oferecer 
                um espaço seguro e acolhedor para que você possa explorar seus sentimentos, 
                desenvolver estratégias de enfrentamento e alcançar uma vida mais equilibrada.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Minha abordagem combina técnicas da Terapia Cognitivo-Comportamental com 
                princípios humanísticos, sempre respeitando a singularidade de cada pessoa 
                e seu processo de autodescoberta.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {qualifications.map((qual, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-violet-50 rounded-xl">
                  <qual.icon className="h-6 w-6 text-violet-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{qual.title}</h4>
                    <p className="text-sm text-gray-600">{qual.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="bg-gradient-to-r from-violet-50 to-violet-100 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Áreas de Atuação
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trabalho com diversas questões psicológicas, sempre com uma abordagem 
              personalizada e baseada nas necessidades específicas de cada cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {specialties.map((specialty, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 text-center"
              >
                <p className="text-gray-800 font-medium">{specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;