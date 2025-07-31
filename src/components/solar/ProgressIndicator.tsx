import { Progress } from "@/components/ui/progress";
import { Calculator, User, Sun } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
}

export const ProgressIndicator = ({ currentStep }: ProgressIndicatorProps) => {
  const steps = [
    { number: 1, icon: Calculator, label: 'Consumo' },
    { number: 2, icon: User, label: 'Dados' },
    { number: 3, icon: Sun, label: 'Resultado' }
  ];

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        {steps.map(({ number, icon: StepIcon, label }) => (
          <div key={number} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              number <= currentStep ? 'bg-i9-blue text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              <StepIcon className="w-4 h-4" />
            </div>
            <span className={`text-xs mt-1 ${
              number <= currentStep ? 'text-i9-blue font-medium' : 'text-gray-400'
            }`}>
              {label}
            </span>
          </div>
        ))}
      </div>
      <Progress value={(currentStep / 3) * 100} className="h-2" />
    </div>
  );
};
