
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Logo from './Logo';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ContactData {
  name: string;
  email: string;
  phone: string;
  company: string;
  employeeCount: string;
}

interface ContactFormProps {
  onSubmit: (data: ContactData) => void;
  onBack: () => void;
}

const ContactForm = ({ onSubmit, onBack }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    employeeCount: ''
  });

  const [errors, setErrors] = useState<Partial<ContactData>>({});

  const validateForm = () => {
    const newErrors: Partial<ContactData> = {};

    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
    if (!formData.email.includes('@')) newErrors.email = 'E-mail inválido';
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (!formData.company.trim()) newErrors.company = 'Empresa é obrigatória';
    if (!formData.employeeCount) newErrors.employeeCount = 'Selecione o número de funcionários';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const updateField = (field: keyof ContactData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto shadow-lg border-0">
        <CardHeader className="pb-4">
          <Logo className="h-12 mb-4" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Quase terminando!
            </h2>
            <p className="text-gray-600 text-sm">
              Para receber seu resultado, precisamos de algumas informações:
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Nome *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Seu nome completo"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                E-mail *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                placeholder="seu@email.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Telefone *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                placeholder="(11) 99999-9999"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                Empresa *
              </Label>
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
                className={`mt-1 ${errors.company ? 'border-red-500' : ''}`}
                placeholder="Nome da sua empresa"
              />
              {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
            </div>

            <div>
              <Label htmlFor="employeeCount" className="text-sm font-medium text-gray-700">
                Quantidade de funcionários *
              </Label>
              <Select value={formData.employeeCount} onValueChange={(value) => updateField('employeeCount', value)}>
                <SelectTrigger className={`mt-1 ${errors.employeeCount ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1 a 5 funcionários</SelectItem>
                  <SelectItem value="6-10">6 a 10 funcionários</SelectItem>
                  <SelectItem value="10+">Mais de 10 funcionários</SelectItem>
                </SelectContent>
              </Select>
              {errors.employeeCount && <p className="text-red-500 text-xs mt-1">{errors.employeeCount}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="button"
                onClick={onBack}
                variant="outline"
                className="flex-1 py-3"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              
              <Button 
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 transition-all duration-200"
              >
                Ver Resultado
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
export type { ContactData };
