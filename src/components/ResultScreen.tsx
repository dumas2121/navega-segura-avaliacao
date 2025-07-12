
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Logo from './Logo';
import { Shield, AlertTriangle, CheckCircle, Phone, Mail, ArrowLeft } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  maxScore: number;
  onRestart: () => void;
  onBack: () => void;
}

const ResultScreen = ({ score, maxScore, onRestart, onBack }: ResultScreenProps) => {
  const percentage = Math.round((score / maxScore) * 100);
  
  const getScoreLevel = () => {
    if (percentage >= 80) return { level: 'Excelente', color: 'bg-green-500', icon: CheckCircle };
    if (percentage >= 60) return { level: 'Bom', color: 'bg-blue-500', icon: Shield };
    if (percentage >= 40) return { level: 'Regular', color: 'bg-yellow-500', icon: AlertTriangle };
    return { level: 'Crítico', color: 'bg-red-500', icon: AlertTriangle };
  };

  const scoreLevel = getScoreLevel();
  const ScoreIcon = scoreLevel.icon;

  const getRecommendations = () => {
    if (percentage >= 80) {
      return [
        "Parabéns! Sua empresa possui excelente controle de navegação.",
        "Continue monitorando regularmente para manter a segurança.",
        "Considere implementar políticas ainda mais avançadas."
      ];
    } else if (percentage >= 60) {
      return [
        "Sua empresa possui bom nível de controle, mas há espaço para melhorias.",
        "Recomendamos a instalação de um firewall mais robusto para melhor monitoramento.",
        "Implemente políticas mais claras para navegação corporativa."
      ];
    } else if (percentage >= 40) {
      return [
        "Sua empresa precisa de melhorias significativas no controle de navegação.",
        "É essencial instalar um firewall profissional para monitoramento adequado.",
        "Desenvolva políticas claras de uso da internet no ambiente corporativo."
      ];
    } else {
      return [
        "ATENÇÃO: Sua empresa está em situação crítica de segurança.",
        "É URGENTE a instalação de um firewall para monitoramento da navegação.",
        "Implemente imediatamente políticas rigorosas de uso da internet.",
        "Considere treinamento para funcionários sobre segurança digital."
      ];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto shadow-lg border-0">
        <CardHeader className="pb-4">
          <Logo className="h-12 mb-4" />
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Resultado da Avaliação
            </h2>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className="text-center space-y-4">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${scoreLevel.color} text-white`}>
              <ScoreIcon className="h-8 w-8" />
            </div>
            
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {percentage}%
              </div>
              <Badge 
                variant="secondary" 
                className={`${scoreLevel.color} text-white text-sm px-3 py-1`}
              >
                {scoreLevel.level}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600">
              Você obteve {score} de {maxScore} pontos
            </p>
          </div>

          {/* Recommendations */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
              Recomendações:
            </h3>
            <div className="space-y-2">
              {getRecommendations().map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 text-white text-center space-y-3">
            <h3 className="font-semibold text-lg">
              Precisa de ajuda especializada?
            </h3>
            <p className="text-sm text-blue-100">
              Fale com nossos especialistas em segurança digital e proteja sua empresa agora mesmo!
            </p>
            
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>contato@tecmed.com.br</span>
              </div>
            </div>

            <Button 
              className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold mt-3"
              onClick={() => window.open('tel:+5511999999999')}
            >
              FALAR COM ESPECIALISTA AGORA
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button 
              onClick={onBack}
              variant="outline"
              className="flex-1 py-3"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            
            <Button 
              onClick={onRestart}
              variant="outline"
              className="flex-1 py-3"
            >
              Nova Avaliação
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultScreen;
