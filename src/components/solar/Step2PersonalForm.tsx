import { Button } from "@/components/ui/button";
import { KeyboardAwareInput } from "@/components/ui/KeyboardAwareInput";
import { Label } from "@/components/ui/label";
import { User, Loader2, AlertCircle } from "lucide-react";
import { FormData } from "@/types/solar";
import { useState } from "react";

interface Step2PersonalFormProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export const Step2PersonalForm = ({ 
  formData, 
  onInputChange, 
  onNext, 
  onBack, 
  isLoading 
}: Step2PersonalFormProps) => {
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Função para validar e-mail
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para aplicar máscara no WhatsApp
  const formatWhatsApp = (value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    const limited = numbers.slice(0, 11);
    
    // Aplica a máscara
    if (limited.length <= 2) {
      return `(${limited}`;
    } else if (limited.length <= 7) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    } else {
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
    }
  };

  // Função para validar campos
  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'name':
        return value.trim().length < 2 ? 'O campo nome é obrigatório' : '';
      case 'email':
        return !isValidEmail(value) ? 'O campo e-mail é obrigatório' : '';
      case 'whatsapp':
        const numbers = value.replace(/\D/g, '');
        return numbers.length < 10 ? 'O campo whatsapp é obrigatório' : '';
      case 'observations':
        return ''; // Campo opcional, não precisa validação
      default:
        return '';
    }
  };

  // Handler para mudanças nos inputs
  const handleInputChange = (field: keyof FormData, value: string) => {
    let processedValue = value;
    
    // Aplica máscara no WhatsApp
    if (field === 'whatsapp') {
      processedValue = formatWhatsApp(value);
    }
    
    // Limita nome a 50 caracteres
    if (field === 'name' && value.length > 50) {
      processedValue = value.slice(0, 50);
    }
    
    // Atualiza o valor
    onInputChange(field, processedValue);
    
    // Valida o campo (apenas campos obrigatórios)
    if (field !== 'observations') {
      const error = validateField(field, processedValue);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  // Função para validar todos os campos antes de prosseguir
  const handleNext = () => {
    const newErrors: {[key: string]: string} = {};
    
    newErrors.name = validateField('name', formData.name);
    newErrors.email = validateField('email', formData.email);
    newErrors.whatsapp = validateField('whatsapp', formData.whatsapp);
    
    setErrors(newErrors);
    
    // Se não há erros, prossegue
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (!hasErrors) {
      onNext();
    }
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-3">
        <User className="w-5 h-5 text-i9-blue mr-2" />
        <h3 className="text-xl font-semibold text-i9-blue">
          Seus dados
        </h3>
      </div>

      <div className="space-y-3 md:space-y-4 flex-grow">
        {/* Linha 1: Nome completo e E-mail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-i9-blue font-medium text-sm">
              Nome completo *
            </Label>
            <KeyboardAwareInput
              id="name"
              type="text"
              placeholder="Digite seu nome completo"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue h-10 text-sm ${
                errors.name ? 'border-red-500 focus:border-red-500' : ''
              }`}
              maxLength={50}
              required
            />
            {errors.name && (
              <div className="flex items-center mt-1 text-red-500 text-xs">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.name}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-i9-blue font-medium text-sm">
              E-mail *
            </Label>
            <KeyboardAwareInput
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue h-10 text-sm ${
                errors.email ? 'border-red-500 focus:border-red-500' : ''
              }`}
              required
            />
            {errors.email && (
              <div className="flex items-center mt-1 text-red-500 text-xs">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.email}
              </div>
            )}
          </div>
        </div>

        {/* Linha 2: WhatsApp e Observações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="whatsapp" className="text-i9-blue font-medium text-sm">
              WhatsApp *
            </Label>
            <KeyboardAwareInput
              id="whatsapp"
              type="tel"
              placeholder="(11) 99999-9999"
              value={formData.whatsapp}
              onChange={(e) => handleInputChange("whatsapp", e.target.value)}
              className={`mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue h-10 text-sm ${
                errors.whatsapp ? 'border-red-500 focus:border-red-500' : ''
              }`}
              maxLength={15}
              required
            />
            {errors.whatsapp && (
              <div className="flex items-center mt-1 text-red-500 text-xs">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.whatsapp}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="observations" className="text-i9-blue font-medium text-sm">
              Observações (opcional)
            </Label>
            <KeyboardAwareInput
              id="observations"
              type="text"
              placeholder="Alguma informação adicional..."
              value={formData.observations}
              onChange={(e) => handleInputChange("observations", e.target.value)}
              className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue h-10 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-3 md:mt-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 border-i9-blue text-i9-blue hover:bg-i9-blue/10 py-3 md:py-2 text-sm touch-target"
        >
          Voltar
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1 bg-i9-yellow hover:bg-i9-yellow/90 text-i9-blue font-semibold py-3 md:py-2 text-base transition-all duration-300 hover:scale-105 touch-target"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Calcular Economia"}
        </Button>
      </div>
    </div>
  );
};
