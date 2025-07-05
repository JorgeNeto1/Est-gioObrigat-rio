import React from 'react';
import { Brain, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navegação',
      links: [
        { name: 'Início', href: '#inicio' },
        { name: 'Sobre', href: '#sobre' },
        { name: 'Serviços', href: '#servicos' },
        { name: 'Depoimentos', href: '#depoimentos' },
        { name: 'Contato', href: '#contato' }
      ]
    },
    {
      title: 'Serviços',
      links: [
        { name: 'Terapia Individual', href: '#servicos' },
        { name: 'Terapia de Casal', href: '#servicos' },
        { name: 'Terapia Online', href: '#servicos' },
        { name: 'Primeira Consulta', href: '#agendamento' }
      ]
    },
    {
      title: 'Especialidades',
      links: [
        { name: 'Ansiedade', href: '#sobre' },
        { name: 'Depressão', href: '#sobre' },
        { name: 'Autoestima', href: '#sobre' },
        { name: 'Relacionamentos', href: '#sobre' }
      ]
    }
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/lauramantovani.psi',
      icon: Instagram
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/lauramantovani',
      icon: Linkedin
    }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-violet-400" />
              <span className="text-xl font-bold">Laura Mantovani</span>
            </div>
            
            <div className="space-y-2">
              <p className="text-violet-400 font-medium">
                Psicóloga Clínica
              </p>
              <p className="text-gray-400 leading-relaxed">
                Cuidando da sua saúde mental com profissionalismo, 
                empatia e dedicação há mais de 8 anos.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>(11) 3456-7890</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>contato@lauramantovani.com.br</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-bold text-white">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-violet-400 transition-colors duration-200"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Siga-me nas redes sociais:</span>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 rounded-lg hover:bg-violet-600 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                Horário de Atendimento
              </p>
              <p className="text-white font-medium">
                Segunda a Sexta: 8h às 18h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} Laura Mantovani Mira - Psicologia LTDA. Todos os direitos reservados.
            </div>
            
            <div className="flex gap-6 text-sm">
              <button className="text-gray-400 hover:text-white transition-colors duration-200">
                Política de Privacidade
              </button>
              <button className="text-gray-400 hover:text-white transition-colors duration-200">
                Termos de Uso
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;