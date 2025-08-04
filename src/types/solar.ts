export interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  installationType: string;
  energyBill: string;
  monthlyConsumption: string;
  observations: string;
}

export interface SolarResults {
  monthlyGenerationKwh: number;
  priceRange: {
    min: number;
    max: number;
  };
  paybackYears: number;
  co2AvoidedPerYear: number;
  equivalentTrees: number;
}

export interface KitSolar {
  precoW: number;
  eficiencia: number;
  potenciaModulo: number;
  marcaModulo: string;
}

export interface IrradianciaCidade {
  [key: string]: number;
}
