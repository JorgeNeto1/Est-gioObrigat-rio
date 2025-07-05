import React from 'react';
import { Calendar, Heart, Shield } from 'lucide-react';

interface HeroProps {
  onScheduleClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScheduleClick }) => {
  return (
    <section id="inicio" className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Laura Mantovani
                <span className="block text-violet-600">Mira</span>
              </h1>
              <p className="text-xl text-gray-600 font-medium">
                Psicóloga Clínica
              </p>
            </div>

            <div className="bg-violet-50 p-6 rounded-2xl border border-violet-100">
              <blockquote className="text-lg md:text-xl text-gray-700 italic leading-relaxed">
                "Cuidar da mente é um ato de coragem. Aqui você encontra escuta, empatia e apoio."
              </blockquote>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onScheduleClick}
                className="bg-violet-600 text-white px-8 py-4 rounded-full hover:bg-violet-700 transition-all duration-200 font-medium text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Calendar className="h-5 w-5" />
                Agendar Consulta
              </button>
              <button
                onClick={() => document.querySelector('#sobre')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-violet-600 text-violet-600 px-8 py-4 rounded-full hover:bg-violet-600 hover:text-white transition-all duration-200 font-medium text-lg"
              >
                Saiba Mais
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="h-5 w-5 text-violet-600" />
                <span className="text-sm font-medium">Atendimento Seguro</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Heart className="h-5 w-5 text-violet-600" />
                <span className="text-sm font-medium">Abordagem Humanizada</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-violet-100 to-violet-200 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <img
                  src="https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Psicóloga Laura Mantovani em seu consultório"
                  className="w-full h-[400px] object-cover rounded-xl"
                  loading="eager"
                />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-violet-300 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-violet-400 rounded-full opacity-15"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;