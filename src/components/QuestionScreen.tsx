
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Logo from './Logo';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: { value: number; label: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "Sua empresa possui controle sobre quais sites os funcionários podem acessar?",
    options: [
      { value: 0, label: "Não, não há controle algum" },
      { value: 1, label: "Controle básico apenas para alguns sites" },
      { value: 2, label: "Sim, temos controle completo" }
    ]
  },
  {
    id: 2,
    question: "Existe monitoramento do tempo gasto em navegação durante o horário de trabalho?",
    options: [
      { value: 0, label: "Não monitoramos" },
      { value: 1, label: "Monitoramento básico" },
      { value: 2, label: "Monitoramento completo e detalhado" }
    ]
  },
  {
    id: 3,
    question: "Como sua empresa lida com downloads de arquivos da internet?",
    options: [
      { value: 0, label: "Sem restrições" },
      { value: 1, label: "Algumas restrições básicas" },
      { value: 2, label: "Controle rigoroso de downloads" }
    ]
  },
  {
    id: 4,
    question: "Há políticas definidas para uso de redes sociais no trabalho?",
    options: [
      { value: 0, label: "Não há políticas definidas" },
      { value: 1, label: "Políticas básicas informais" },
      { value: 2, label: "Políticas claras e bem definidas" }
    ]
  },
  {
    id: 5,
    question: "Sua empresa possui firewall para proteção da rede?",
    options: [
      { value: 0, label: "Não possuímos firewall" },
      { value: 1, label: "Firewall básico" },
      { value: 2, label: "Firewall avançado com monitoramento" }
    ]
  }
];

interface QuestionScreenProps {
  currentQuestion: number;
  answers: { [key: number]: number };
  onAnswer: (questionId: number, value: number) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
}

const QuestionScreen = ({ 
  currentQuestion, 
  answers, 
  onAnswer, 
  onNext, 
  onBack, 
  canGoBack 
}: QuestionScreenProps) => {
  const question = questions[currentQuestion];
  const currentAnswer = answers[question.id];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto shadow-lg border-0">
        <CardHeader className="pb-4">
          <Logo className="h-12 mb-4" />
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 leading-relaxed">
              {question.question}
            </h2>

            <RadioGroup 
              value={currentAnswer?.toString()} 
              onValueChange={(value) => onAnswer(question.id, parseInt(value))}
              className="space-y-3"
            >
              {question.options.map((option) => (
                <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem 
                    value={option.value.toString()} 
                    id={`option-${option.value}`}
                    className="mt-0.5"
                  />
                  <Label 
                    htmlFor={`option-${option.value}`} 
                    className="text-sm leading-relaxed cursor-pointer flex-1"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex gap-3 pt-4">
            {canGoBack && (
              <Button 
                onClick={onBack}
                variant="outline"
                className="flex-1 py-3"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            )}
            
            <Button 
              onClick={onNext}
              disabled={currentAnswer === undefined}
              className={`${canGoBack ? 'flex-1' : 'w-full'} bg-blue-600 hover:bg-blue-700 text-white py-3 transition-all duration-200`}
            >
              {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionScreen;
export { questions };
