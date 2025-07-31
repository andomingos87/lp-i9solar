import { Sun } from "lucide-react";

export const LoadingStep = () => {
  return (
    <div className="text-center py-8 flex-grow flex flex-col justify-center">
      <div className="animate-spin w-12 h-12 mx-auto mb-4">
        <Sun className="w-12 h-12 text-i9-yellow" />
      </div>
      <h3 className="text-xl font-semibold text-i9-blue mb-2">
        Calculando sua economia...
      </h3>
      <p className="text-gray-600 text-sm">
        Estamos processando seus dados para calcular o potencial de economia com energia solar.
      </p>
    </div>
  );
};
