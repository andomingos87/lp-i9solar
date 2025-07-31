// Constantes
const IRRADIANCIA_POR_CIDADE = {
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

const KITS_SOLARES = {
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
    'SolarEdge_EVC': {
        precoW: 3.97,
        eficiencia: 0.83,
        potenciaModulo: 580,
        marcaModulo: 'SolarEdge + EVC'
    },
    'SolaX_Bateria': {
        precoW: 5.41,
        eficiencia: 0.75,
        potenciaModulo: 610,
        marcaModulo: 'DAH'
    },
    'SolaX_Micro': {
        precoW: 2.36,
        eficiencia: 0.70,
        potenciaModulo: 620,
        marcaModulo: 'DAH SolaX'
    }
};

// Variaveis

let cidade = ''; // O usuario vai selecionar uma cidade em um dropdown
let kitInversor = ''; // O usuario vai selecionar um kit em um dropdown
let dias = 30
let irradiancia = IRRADIANCIA_POR_CIDADE[cidade] || 0; // valor da irradiancia referente a cidade selecionada
let kitSelecionado = KITS_SOLARES[kitInversor] || {}; // dados do kit selecionado
let eficiencia = kitSelecionado.eficiencia || 0; // valor de eficiencia referente ao kit inversor selecionado
let potencia = 0; // valor de potencia referente ao kit inversor selecionado (será calculado)
let precoW = kitSelecionado.precoW || 0; // preço R$/W referente ao kit inversor selecionado
let modulo = kitSelecionado.potenciaModulo || 0; // valor de potencia do modulo referente ao kit inversor selecionado
let quantCalc = potencia * 1000 / modulo
let quantFinal = quantCalc //arredondado pra cima
let potenciaFinal = quantFinal * modulo
let geracaoPotencial = potenciaFinal * dias * irradiancia * eficiencia
let precoMin = potenciaFinal * precoW * 1000
let precoMax = potenciaFinal * precoW * 1000

// Para calcular a geracaoPotencial, use KITS_SOLARES com maior eficiencia
// Para calcular precoMin, use KITS_SOLARES com menor precoW
// Para calcular precoMax, use KITS_SOLARES com maior precoW
