import { FormData, SolarResults } from '@/types/solar';
import { IRRADIANCIA_POR_CIDADE, KITS_SOLARES } from '@/constants/solarData';

export const calculateSolarResults = (formData: FormData): SolarResults => {
  const consumoMensal = parseFloat(formData.monthlyConsumption) || 0;
  const valorConta = parseFloat(formData.energyBill) || 0;
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
  
  // Calcular tarifa média por kWh para payback
  const tarifaMedia = consumoMensal > 0 ? valorConta / consumoMensal : 0.65; // fallback para R$ 0,65/kWh
  
  // Payback em anos (baseado na economia potencial)
  const investimentoMedio = (priceRange.min + priceRange.max) / 2;
  const economiaAnualEstimada = monthlyGenerationKwh * 12 * tarifaMedia;
  const paybackYears = economiaAnualEstimada > 0 ? investimentoMedio / economiaAnualEstimada : 0;
  
  // Benefícios ambientais
  const geracaoAnual = monthlyGenerationKwh * 12;
  const co2AvoidedPerYear = geracaoAnual * 0.0817; // 0.0817 kg CO₂/kWh (fator brasileiro)
  const equivalentTrees = co2AvoidedPerYear / 22; // 1 árvore absorve ~22kg CO₂/ano
  
  return {
    monthlyGenerationKwh,
    priceRange,
    paybackYears,
    co2AvoidedPerYear,
    equivalentTrees
  };
};
