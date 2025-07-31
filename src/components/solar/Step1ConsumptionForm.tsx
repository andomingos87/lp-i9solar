import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { FormData } from "@/types/solar";
import { BRAZILIAN_CITIES } from "@/constants/solarData";

interface Step1ConsumptionFormProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
  onNext: () => void;
}

export const Step1ConsumptionForm = ({ 
  formData, 
  onInputChange, 
  onNext 
}: Step1ConsumptionFormProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-3">
        <Calculator className="w-5 h-5 text-i9-blue mr-2" />
        <h3 className="text-xl font-semibold text-i9-blue">
          Dados de consumo
        </h3>
      </div>

      <div className="space-y-3 flex-grow">
        <div>
          <Label htmlFor="city" className="text-i9-blue font-medium text-sm">
            Cidade *
          </Label>
          <Select onValueChange={(value) => onInputChange("city", value)}>
            <SelectTrigger className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue h-9">
              <SelectValue placeholder="Selecione sua cidade" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300 z-50">
              {BRAZILIAN_CITIES.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="energyBill" className="text-i9-blue font-medium text-sm">
            Valor médio da conta de energia (R$) *
          </Label>
          <Input
            id="energyBill"
            type="text"
            placeholder="R$ 500,00"
            value={formData.energyBill}
            onChange={(e) => onInputChange("energyBill", e.target.value)}
            className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue h-9"
          />
        </div>

        <div>
          <Label htmlFor="monthlyConsumption" className="text-i9-blue font-medium text-sm">
            Consumo mensal (kWh) *
          </Label>
          <Input
            id="monthlyConsumption"
            type="text"
            placeholder="400 kWh"
            value={formData.monthlyConsumption}
            onChange={(e) => onInputChange("monthlyConsumption", e.target.value)}
            className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue h-9"
          />
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full mt-4 bg-i9-yellow hover:bg-i9-yellow/90 text-i9-blue font-semibold py-2 text-base transition-all duration-300 hover:scale-105"
      >
        Próxima Etapa
      </Button>
    </div>
  );
};
