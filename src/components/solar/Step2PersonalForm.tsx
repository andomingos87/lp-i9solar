import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Loader2 } from "lucide-react";
import { FormData } from "@/types/solar";

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
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-3">
        <User className="w-5 h-5 text-i9-blue mr-2" />
        <h3 className="text-xl font-semibold text-i9-blue">
          Seus dados
        </h3>
      </div>

      <div className="space-y-3 flex-grow">
        <div>
          <Label htmlFor="name" className="text-i9-blue font-medium text-sm">
            Nome completo *
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Digite seu nome completo"
            value={formData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue h-9"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-i9-blue font-medium text-sm">
            E-mail *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue h-9"
          />
        </div>

        <div>
          <Label htmlFor="whatsapp" className="text-i9-blue font-medium text-sm">
            WhatsApp *
          </Label>
          <Input
            id="whatsapp"
            type="tel"
            placeholder="(11) 99999-9999"
            value={formData.whatsapp}
            onChange={(e) => onInputChange("whatsapp", e.target.value)}
            className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue h-9"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 border-i9-blue text-i9-blue hover:bg-i9-blue/10 py-2 text-sm"
        >
          Voltar
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 bg-i9-yellow hover:bg-i9-yellow/90 text-i9-blue font-semibold py-2 text-base transition-all duration-300 hover:scale-105"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Calcular Economia"}
        </Button>
      </div>
    </div>
  );
};
