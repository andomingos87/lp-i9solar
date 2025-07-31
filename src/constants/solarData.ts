import { IrradianciaCidade, KitSolar } from '@/types/solar';

export const BRAZILIAN_CITIES = [
  "Bertioga",
  "Bragança Paulista",
  "Campinas",
  "Campos do Jordão",
  "Indaiatuba",
  "Itu",
  "Jaguariúna",
  "Jundiaí",
  "Limeira",
  "Monte Mor",
  "Piracicaba",
  "Porto Feliz",
  "Ribeirão Preto",
  "Salto",
  "Santos",
  "São Bernardo do Campo",
  "São José do Rio Preto",
  "São Paulo",
  "São Sebastião",
  "Sorocaba",
  "Valinhos",
  "Vinhedo",
];

export const IRRADIANCIA_POR_CIDADE: IrradianciaCidade = {
  'Bertioga': 4.6,
  'Bragança Paulista': 5.2,
  'Campinas': 5.4,
  'Campos do Jordão': 5.1,
  'Indaiatuba': 5.3,
  'Itu': 5.3,
  'Jaguariúna': 5.4,
  'Jundiaí': 5.2,
  'Limeira': 5.4,
  'Monte Mor': 5.4,
  'Piracicaba': 5.4,
  'Porto Feliz': 5.3,
  'Ribeirão Preto': 5.5,
  'Salto': 5.3,
  'Santos': 5.0,
  'São Bernardo do Campo': 4.5,
  'São José do Rio Preto': 5.4,
  'São Paulo': 4.8,
  'São Sebastião': 4.6,
  'Sorocaba': 5.2,
  'Valinhos': 5.4,
  'Vinhedo': 5.4
};

export const KITS_SOLARES: { [key: string]: KitSolar } = {
  'APSystems': {
    precoW: 4.05,
    eficiencia: 0.72,
    potenciaModulo: 565,
    marcaModulo: 'APSystems'
  },
  'Canadian': {
    precoW: 2.20,
    eficiencia: 0.75,
    potenciaModulo: 610,
    marcaModulo: 'Canadian'
  },
  'Deye': {
    precoW: 2.92,
    eficiencia: 0.60,
    potenciaModulo: 570,
    marcaModulo: 'SE'
  },
  'Enphase': {
    precoW: 3.63,
    eficiencia: 0.78,
    potenciaModulo: 610,
    marcaModulo: 'Ronma'
  },
  'Hoymiles': {
    precoW: 2.56,
    eficiencia: 0.75,
    potenciaModulo: 605,
    marcaModulo: 'DMEGC - hoymiles'
  },
  'SAJ': {
    precoW: 2.58,
    eficiencia: 0.75,
    potenciaModulo: 580,
    marcaModulo: 'SAJ'
  },
  'SolarEdge': {
    precoW: 3.90,
    eficiencia: 0.83,
    potenciaModulo: 585,
    marcaModulo: 'DAH - SE'
  },
  'Sungrow': {
    precoW: 2.20,
    eficiencia: 0.75,
    potenciaModulo: 610,
    marcaModulo: 'Canadian'
  }
};
