import { excelDB, CityData, InversorKit, TarifaEnergia } from './excelDatabase';

export interface CalculationParams {
  cidade: string;
  consumoMensal: number; // kWh
  valorConta: number; // R$
  kitInversorId?: string;
}

export interface CalculationResult {
  potenciaRecomendada: number; // kWp
  quantidadeModulos: number;
  potenciaFinal: number; // kWp
  geracaoMensal: number; // kWh
  precoMinimo: number; // R$
  precoMaximo: number; // R$
  economiaMensal: number; // R$
  economiaAnual: number; // R$
  payback: number; // anos
  cityData: CityData | null;
  kitData: InversorKit | null;
  tarifaData: TarifaEnergia | null;
}

class SolarCalculator {
  // Constantes padrão (fallback se não houver dados do Excel)
  private readonly DEFAULT_IRRADIANCIA = 5.0;
  private readonly DEFAULT_EFICIENCIA = 0.85;
  private readonly DEFAULT_PRECO_W = 4.5;
  private readonly DEFAULT_MODULO_POTENCIA = 550; // W
  private readonly DEFAULT_TARIFA = 0.65; // R$/kWh
  private readonly DIAS_MES = 30;
  private readonly FATOR_ECONOMIA = 0.75; // 75% de economia na conta

  calculate(params: CalculationParams): CalculationResult {
    // Buscar dados da cidade
    const cityData = excelDB.getCityData(params.cidade);
    const irradiancia = cityData?.irradiancia || this.DEFAULT_IRRADIANCIA;

    // Buscar dados do kit inversor
    const kitData = params.kitInversorId 
      ? excelDB.getInversorKit(params.kitInversorId)
      : this.getDefaultKit();

    const eficiencia = kitData?.eficiencia || this.DEFAULT_EFICIENCIA;
    const precoW = kitData?.precoW || this.DEFAULT_PRECO_W;
    const moduloPotencia = kitData?.moduloPotencia || this.DEFAULT_MODULO_POTENCIA;

    // Buscar dados da tarifa
    const tarifaData = excelDB.getTarifa(params.cidade);
    const tarifaKwh = tarifaData?.tarifaKwh || this.DEFAULT_TARIFA;

    // Calcular potência recomendada (90% do consumo)
    const geracaoDesejada = params.consumoMensal * 0.9;
    const potenciaRecomendada = geracaoDesejada / (this.DIAS_MES * irradiancia * eficiencia);

    // Calcular quantidade de módulos
    const potenciaRecomendadaW = potenciaRecomendada * 1000;
    const quantidadeModulos = Math.ceil(potenciaRecomendadaW / moduloPotencia);
    
    // Potência final do sistema
    const potenciaFinal = (quantidadeModulos * moduloPotencia) / 1000; // kWp

    // Geração mensal real
    const geracaoMensal = potenciaFinal * this.DIAS_MES * irradiancia * eficiencia;

    // Cálculos financeiros
    const precoMinimo = potenciaFinal * 1000 * precoW * 0.9; // 10% desconto
    const precoMaximo = potenciaFinal * 1000 * precoW * 1.1; // 10% acréscimo

    // Economia baseada na geração e tarifa
    const economiaMensal = Math.min(geracaoMensal * tarifaKwh, params.valorConta * this.FATOR_ECONOMIA);
    const economiaAnual = economiaMensal * 12;

    // Payback simples
    const investimentoMedio = (precoMinimo + precoMaximo) / 2;
    const payback = investimentoMedio / economiaAnual;

    return {
      potenciaRecomendada,
      quantidadeModulos,
      potenciaFinal,
      geracaoMensal,
      precoMinimo,
      precoMaximo,
      economiaMensal,
      economiaAnual,
      payback,
      cityData,
      kitData,
      tarifaData,
    };
  }

  private getDefaultKit(): InversorKit {
    return {
      id: 'default',
      nome: 'Kit Padrão',
      potencia: 5,
      eficiencia: this.DEFAULT_EFICIENCIA,
      precoW: this.DEFAULT_PRECO_W,
      moduloPotencia: this.DEFAULT_MODULO_POTENCIA,
    };
  }

  // Método para obter kits disponíveis
  getAvailableKits(): InversorKit[] {
    const kits = excelDB.getAllInversorKits();
    return kits.length > 0 ? kits : [this.getDefaultKit()];
  }

  // Método para obter cidades disponíveis
  getAvailableCities(): string[] {
    const cities = excelDB.getAllCities();
    return cities.length > 0 ? cities : [
      'São Paulo', 'Campinas', 'Santos', 'Ribeirão Preto', 'Sorocaba'
    ];
  }

  // Método para validar se os dados estão carregados
  isDataLoaded(): boolean {
    return excelDB.getAllCities().length > 0 || excelDB.getAllInversorKits().length > 0;
  }

  // Método para obter estatísticas dos dados carregados
  getDataStats() {
    return {
      totalCities: excelDB.getAllCities().length,
      totalKits: excelDB.getAllInversorKits().length,
      hasData: this.isDataLoaded(),
    };
  }
}

// Instância singleton
export const solarCalculator = new SolarCalculator();

// Hook para usar no React
export const useSolarCalculator = () => {
  return {
    calculate: (params: CalculationParams) => solarCalculator.calculate(params),
    getAvailableKits: () => solarCalculator.getAvailableKits(),
    getAvailableCities: () => solarCalculator.getAvailableCities(),
    isDataLoaded: () => solarCalculator.isDataLoaded(),
    getDataStats: () => solarCalculator.getDataStats(),
  };
};
