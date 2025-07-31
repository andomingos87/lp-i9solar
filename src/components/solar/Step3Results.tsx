import { Button } from "@/components/ui/button";
import { Sun, MessageCircle, Phone } from "lucide-react";
import { FormData, SolarResults } from "@/types/solar";

interface Step3ResultsProps {
  formData: FormData;
  solarResults: SolarResults;
  onBackToStart: () => void;
}

export const Step3Results = ({ 
  formData, 
  solarResults, 
  onBackToStart 
}: Step3ResultsProps) => {
  const handleConsultorClick = () => {
    const message = `Olá! Gostaria de falar com um consultor sobre energia solar.

🏠 Nome: ${formData.name}
📍 Cidade: ${formData.city}
⚡ Consumo: ${formData.monthlyConsumption} kWh/mês
💰 Conta de luz: R$ ${formData.energyBill}

🌞 Potencial de geração: ${solarResults.monthlyGenerationKwh.toFixed(0)} kWh/mês
💵 Faixa de preço: R$ ${(solarResults.priceRange.min/1000).toFixed(0)}k - R$ ${(solarResults.priceRange.max/1000).toFixed(0)}k`;
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="flex flex-col h-full max-w-xl mx-auto">
      {/* Header com ícone e título */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-i9-blue mb-2">
          Parabéns, {formData.name}!
        </h3>
        <p className="text-gray-600 text-sm">
          Seu relatório de energia solar está pronto! Veja os resultados:
        </p>
      </div>

      {/* Cards de resultados com design melhorado */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Potencial de Geração */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium mb-1">Geração Mensal</p>
              <p className="text-3xl font-bold text-green-800">
                {solarResults.monthlyGenerationKwh.toFixed(0)}
                <span className="text-lg font-normal text-green-600 ml-1">kWh</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">Potencial de geração mensal</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Sun className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Faixa de Preço */}
        <div className="bg-gradient-to-r from-blue-50 to-i9-lightBlue/20 p-6 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-i9-blue font-medium mb-1">Investimento</p>
              <p className="text-2xl font-bold text-i9-blue">
                R$ {(solarResults.priceRange.min/1000).toFixed(0)}k - {(solarResults.priceRange.max/1000).toFixed(0)}k
              </p>
              <p className="text-xs text-gray-600 mt-1">Sistema completo instalado</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Principal para WhatsApp */}
      <div className="space-y-4">
        <Button
          onClick={handleConsultorClick}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
        >
          <MessageCircle className="w-6 h-6" />
          Falar com Consultor
          <Phone className="w-5 h-5" />
        </Button>
        
        <p className="text-center text-xs text-gray-500 px-4">
          💬 Receba uma proposta personalizada via WhatsApp com todos os detalhes do seu projeto
        </p>
        
        <button
          onClick={onBackToStart}
          className="w-full text-i9-blue hover:text-i9-blue/80 text-sm py-2 font-medium transition-colors duration-200"
        >
          ← Recalcular com outros dados
        </button>
      </div>
    </div>
  );
};
