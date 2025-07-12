
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Logo from './Logo';
import { ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto shadow-lg border-0">
        <CardContent className="p-8 text-center space-y-6">
          <Logo className="h-16" />
          
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              Avaliação de Segurança de Navegação
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Descubra o nível de controle e segurança da navegação em sua empresa.
            </p>
          </div>

          <div className="pt-4">
            <Button 
              onClick={onStart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Iniciar Avaliação
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            Avaliação rápida em 5 perguntas
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
