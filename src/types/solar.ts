export interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  energyBill: string;
  monthlyConsumption: string;
}

export interface SolarResults {
  monthlyGenerationKwh: number;
  priceRange: {
    min: number;
    max: number;
  };
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
