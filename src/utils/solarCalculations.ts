import { FormData, SolarResults } from '@/types/solar';
import { IRRADIANCIA_POR_CIDADE, KITS_SOLARES } from '@/constants/solarData';

export const calculateSolarResults = (formData: FormData): SolarResults => {
  const consumoMensal = parseFloat(formData.monthlyConsumption) || 0;
  const irradiancia = IRRADIANCIA_POR_CIDADE[formData.city] || 5.0;
  
  // Calcular potência necessária do sistema (kWp)
  const potenciaSistema = consumoMensal / (irradiancia * 30 * 0.8); // 0.8 é fator de eficiência
  
  // Geração mensal estimada (kWh)
  const monthlyGenerationKwh = potenciaSistema * 130; // 130 kWh por kWp por mês
  
  // Calcular faixa de preços baseada nos diferentes kits
  const precos = Object.values(KITS_SOLARES).map(kit => 
    Math.ceil(potenciaSistema) * kit.precoW * 1000
  );
  
  const priceRange = {
    min: Math.min(...precos),
    max: Math.max(...precos)
  };
  
  return {
    monthlyGenerationKwh,
    priceRange
  };
};
