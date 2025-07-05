import React from 'react';
import { Clock, Users, Video } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Users,
      title: 'Terapia Individual',
      description: 'Atendimento personalizado para adolescentes e adultos',
      duration: '50 minutos',
      price: 'A partir de R$ 150'
    },
    {
      icon: Users,
      title: 'Terapia de Casal',
      description: 'Fortalecimento de vínculos e resolução de conflitos',
      duration: '60 minutos',
      price: 'A partir de R$ 200'
    },
    {
      icon: Video,
      title: 'Terapia Online',
      description: 'Atendimento por videoconferência com total segurança',
      duration: '50 minutos',
      price: 'A partir de R$ 140'
    }
  ];

  const approaches = [
    {
      name: 'Terapia Cognitivo-Comportamental (TCC)',
      description: 'Foca na identificação e modificação de padrões de pensamento e comportamento disfuncionais.'
    },
    {
      name: 'Abordagem Humanística',
      description: 'Enfatiza o potencial humano para crescimento e autodeterminação.'
    },
    {
      name: 'Técnicas de Mindfulness',
      description: 'Práticas de atenção plena para redução do estresse e maior consciência emocional.'
    },
    {
      name: 'Terapia Sistêmica',
      description: 'Trabalha com as dinâmicas familiares e relacionais para promover mudanças positivas.'
    }
  ];

  return (
    <section id="servicos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Serviços
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ofereço diferentes modalidades de atendimento para atender às suas necessidades 
            específicas, sempre com qualidade e profissionalismo.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-violet-100"
            >
              <div className="bg-violet-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <service.icon className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  {service.duration}
                </div>
                <div className="text-lg font-bold text-violet-600">
                  {service.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Approaches */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Abordagens Terapêuticas
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Utilizo diferentes abordagens terapêuticas, adaptando o tratamento 
              às necessidades específicas de cada pessoa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approaches.map((approach, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  {approach.name}
                </h4>
                <p className="text-gray-700">
                  {approach.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-violet-600 to-violet-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Pronto para começar sua jornada de autodescoberta?
            </h3>
            <p className="text-violet-100 mb-6 max-w-2xl mx-auto">
              Agende uma consulta e dê o primeiro passo em direção ao seu bem-estar emocional.
            </p>
            <button
              onClick={() => document.querySelector('#agendamento')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-violet-600 px-8 py-3 rounded-full font-bold hover:bg-violet-50 transition-colors duration-200"
            >
              Agendar Consulta
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;