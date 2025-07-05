import React, { useState } from 'react';
import { Settings, Type, Sun, Moon, X } from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';

const AccessibilityPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    fontSize, 
    setFontSize, 
    isDarkMode, 
    toggleDarkMode
  } = useAccessibility();

  const fontSizes = [
    { label: 'Pequeno', value: 'small' as const },
    { label: 'Normal', value: 'normal' as const },
    { label: 'Grande', value: 'large' as const },
    { label: 'Extra Grande', value: 'extra-large' as const }
  ];

  return (
    <>
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-4 bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-full shadow-lg z-50 transition-colors duration-200"
        aria-label="Abrir painel de acessibilidade"
      >
        <Settings className="h-5 w-5" />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Acessibilidade
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Fechar painel"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Font Size */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Type className="h-5 w-5 text-violet-600" />
                  <h3 className="font-semibold text-gray-900">
                    Tamanho da Fonte
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {fontSizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setFontSize(size.value)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                        fontSize === size.value
                          ? 'bg-violet-600 text-white border-violet-600'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Toggle */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {isDarkMode ? (
                    <Moon className="h-5 w-5 text-violet-600" />
                  ) : (
                    <Sun className="h-5 w-5 text-violet-600" />
                  )}
                  <h3 className="font-semibold text-gray-900">
                    Tema
                  </h3>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`w-full p-3 rounded-lg border font-medium transition-colors duration-200 ${
                    isDarkMode
                      ? 'bg-gray-800 text-white border-gray-700'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {isDarkMode ? 'Modo Escuro' : 'Modo Claro'}
                </button>
              </div>

              {/* Instructions */}
              <div className="bg-violet-50 p-4 rounded-lg">
                <h4 className="font-medium text-violet-900 mb-2">
                  Navegação por Teclado
                </h4>
                <ul className="text-sm text-violet-700 space-y-1">
                  <li>• Tab: Navegar entre elementos</li>
                  <li>• Enter/Espaço: Ativar botões</li>
                  <li>• Esc: Fechar modais</li>
                  <li>• Setas: Navegar em carrosséis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityPanel;