
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import WelcomeScreen from '@/components/WelcomeScreen';
import QuestionScreen, { questions } from '@/components/QuestionScreen';
import ContactForm, { ContactData } from '@/components/ContactForm';
import ResultScreen from '@/components/ResultScreen';

type Screen = 'welcome' | 'questions' | 'contact' | 'result';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const { toast } = useToast();

  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
  const maxScore = questions.length * 2; // Maximum 2 points per question

  const handleStart = () => {
    setCurrentScreen('questions');
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCurrentScreen('contact');
    }
  };

  const handleBack = () => {
    if (currentScreen === 'questions' && currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (currentScreen === 'contact') {
      setCurrentScreen('questions');
      setCurrentQuestion(questions.length - 1);
    } else if (currentScreen === 'result') {
      setCurrentScreen('contact');
    }
  };

  const handleContactSubmit = async (data: ContactData) => {
    try {
      // Simular envio dos dados para o banco
      console.log('Dados para envio ao banco:', {
        ...data,
        answers,
        totalScore,
        percentage: Math.round((totalScore / maxScore) * 100),
        timestamp: new Date().toISOString()
      });

      setContactData(data);
      setCurrentScreen('result');
      
      toast({
        title: "Dados salvos com sucesso!",
        description: "Seu resultado foi calculado e salvo em nosso sistema.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar dados",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    }
  };

  const handleRestart = () => {
    setCurrentScreen('welcome');
    setCurrentQuestion(0);
    setAnswers({});
    setContactData(null);
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}

      {currentScreen === 'questions' && (
        <QuestionScreen
          currentQuestion={currentQuestion}
          answers={answers}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={currentQuestion > 0}
        />
      )}

      {currentScreen === 'contact' && (
        <ContactForm
          onSubmit={handleContactSubmit}
          onBack={handleBack}
        />
      )}

      {currentScreen === 'result' && (
        <ResultScreen
          score={totalScore}
          maxScore={maxScore}
          onRestart={handleRestart}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default Index;
