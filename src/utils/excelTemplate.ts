import * as XLSX from 'xlsx';

// Dados de exemplo para o template
const sampleCityData = [
  { cidade: 'São Paulo', irradiancia: 4.8, estado: 'SP', latitude: -23.5505, longitude: -46.6333 },
  { cidade: 'Campinas', irradiancia: 5.4, estado: 'SP', latitude: -22.9056, longitude: -47.0608 },
  { cidade: 'Santos', irradiancia: 5.0, estado: 'SP', latitude: -23.9608, longitude: -46.3331 },
  { cidade: 'Ribeirão Preto', irradiancia: 5.5, estado: 'SP', latitude: -21.1767, longitude: -47.8208 },
  { cidade: 'Sorocaba', irradiancia: 5.2, estado: 'SP', latitude: -23.5015, longitude: -47.4526 },
  { cidade: 'Jundiaí', irradiancia: 5.2, estado: 'SP', latitude: -23.1864, longitude: -46.8842 },
  { cidade: 'Piracicaba', irradiancia: 5.4, estado: 'SP', latitude: -22.7253, longitude: -47.6492 },
  { cidade: 'Limeira', irradiancia: 5.4, estado: 'SP', latitude: -22.5647, longitude: -47.4017 },
];

const sampleInversorData = [
  {
    id: 'kit_3kw_basic',
    nome: 'Kit Básico 3kW',
    potencia: 3,
    eficiencia: 85,
    precoW: 4.8,
    moduloPotencia: 550,
    marca: 'Canadian Solar',
    modelo: 'CS3W-550MS'
  },
  {
    id: 'kit_5kw_inter',
    nome: 'Kit Intermediário 5kW',
    potencia: 5,
    eficiencia: 87,
    precoW: 4.5,
    moduloPotencia: 550,
    marca: 'Jinko Solar',
    modelo: 'JKM550M-7RL4'
  },
  {
    id: 'kit_8kw_premium',
    nome: 'Kit Premium 8kW',
    potencia: 8,
    eficiencia: 89,
    precoW: 4.2,
    moduloPotencia: 600,
    marca: 'Trina Solar',
    modelo: 'TSM-600NEG20C.20'
  },
  {
    id: 'kit_10kw_comercial',
    nome: 'Kit Comercial 10kW',
    potencia: 10,
    eficiencia: 90,
    precoW: 4.0,
    moduloPotencia: 600,
    marca: 'LONGi Solar',
    modelo: 'LR5-72HIH-600M'
  },
  {
    id: 'kit_15kw_industrial',
    nome: 'Kit Industrial 15kW',
    potencia: 15,
    eficiencia: 91,
    precoW: 3.8,
    moduloPotencia: 650,
    marca: 'JA Solar',
    modelo: 'JAM72S30-650/MR'
  }
];

const sampleTarifaData = [
  { cidade: 'São Paulo', distribuidora: 'Enel SP', tarifaKwh: 0.68, bandeira: 'Verde' },
  { cidade: 'Campinas', distribuidora: 'CPFL Paulista', tarifaKwh: 0.62, bandeira: 'Verde' },
  { cidade: 'Santos', distribuidora: 'Enel SP', tarifaKwh: 0.68, bandeira: 'Verde' },
  { cidade: 'Ribeirão Preto', distribuidora: 'CPFL Paulista', tarifaKwh: 0.62, bandeira: 'Verde' },
  { cidade: 'Sorocaba', distribuidora: 'Enel SP', tarifaKwh: 0.68, bandeira: 'Verde' },
  { cidade: 'Jundiaí', distribuidora: 'Enel SP', tarifaKwh: 0.68, bandeira: 'Verde' },
  { cidade: 'Piracicaba', distribuidora: 'CPFL Paulista', tarifaKwh: 0.62, bandeira: 'Verde' },
  { cidade: 'Limeira', distribuidora: 'CPFL Paulista', tarifaKwh: 0.62, bandeira: 'Verde' },
];

export class ExcelTemplateGenerator {
  // Gerar template Excel com dados de exemplo
  static generateTemplate(): void {
    const wb = XLSX.utils.book_new();

    // Aba 1: Cidades
    const cityWs = XLSX.utils.json_to_sheet(sampleCityData);
    
    // Definir largura das colunas
    cityWs['!cols'] = [
      { wch: 20 }, // cidade
      { wch: 12 }, // irradiancia
      { wch: 8 },  // estado
      { wch: 12 }, // latitude
      { wch: 12 }, // longitude
    ];

    XLSX.utils.book_append_sheet(wb, cityWs, 'Cidades');

    // Aba 2: Inversores
    const inversorWs = XLSX.utils.json_to_sheet(sampleInversorData);
    
    inversorWs['!cols'] = [
      { wch: 18 }, // id
      { wch: 25 }, // nome
      { wch: 10 }, // potencia
      { wch: 12 }, // eficiencia
      { wch: 10 }, // precoW
      { wch: 15 }, // moduloPotencia
      { wch: 15 }, // marca
      { wch: 20 }, // modelo
    ];

    XLSX.utils.book_append_sheet(wb, inversorWs, 'Inversores');

    // Aba 3: Tarifas
    const tarifaWs = XLSX.utils.json_to_sheet(sampleTarifaData);
    
    tarifaWs['!cols'] = [
      { wch: 20 }, // cidade
      { wch: 20 }, // distribuidora
      { wch: 12 }, // tarifaKwh
      { wch: 10 }, // bandeira
    ];

    XLSX.utils.book_append_sheet(wb, tarifaWs, 'Tarifas');

    // Aba 4: Instruções
    const instructions = [
      { Campo: 'INSTRUÇÕES DE USO', Descrição: '', Exemplo: '' },
      { Campo: '', Descrição: '', Exemplo: '' },
      { Campo: 'ABA CIDADES:', Descrição: '', Exemplo: '' },
      { Campo: 'cidade', Descrição: 'Nome da cidade', Exemplo: 'São Paulo' },
      { Campo: 'irradiancia', Descrição: 'Irradiância solar média (kWh/m²/dia)', Exemplo: '4.8' },
      { Campo: 'estado', Descrição: 'Sigla do estado', Exemplo: 'SP' },
      { Campo: 'latitude', Descrição: 'Coordenada latitude (opcional)', Exemplo: '-23.5505' },
      { Campo: 'longitude', Descrição: 'Coordenada longitude (opcional)', Exemplo: '-46.6333' },
      { Campo: '', Descrição: '', Exemplo: '' },
      { Campo: 'ABA INVERSORES:', Descrição: '', Exemplo: '' },
      { Campo: 'id', Descrição: 'Identificador único do kit', Exemplo: 'kit_3kw_basic' },
      { Campo: 'nome', Descrição: 'Nome comercial do kit', Exemplo: 'Kit Básico 3kW' },
      { Campo: 'potencia', Descrição: 'Potência em kW', Exemplo: '3' },
      { Campo: 'eficiencia', Descrição: 'Eficiência em % (0-100)', Exemplo: '85' },
      { Campo: 'precoW', Descrição: 'Preço por Watt em R$', Exemplo: '4.8' },
      { Campo: 'moduloPotencia', Descrição: 'Potência do módulo em W', Exemplo: '550' },
      { Campo: 'marca', Descrição: 'Marca do equipamento (opcional)', Exemplo: 'Canadian Solar' },
      { Campo: 'modelo', Descrição: 'Modelo do equipamento (opcional)', Exemplo: 'CS3W-550MS' },
      { Campo: '', Descrição: '', Exemplo: '' },
      { Campo: 'ABA TARIFAS:', Descrição: '', Exemplo: '' },
      { Campo: 'cidade', Descrição: 'Nome da cidade', Exemplo: 'São Paulo' },
      { Campo: 'distribuidora', Descrição: 'Nome da distribuidora', Exemplo: 'Enel SP' },
      { Campo: 'tarifaKwh', Descrição: 'Tarifa por kWh em R$', Exemplo: '0.68' },
      { Campo: 'bandeira', Descrição: 'Bandeira tarifária (opcional)', Exemplo: 'Verde' },
    ];

    const instructionWs = XLSX.utils.json_to_sheet(instructions);
    
    instructionWs['!cols'] = [
      { wch: 20 }, // Campo
      { wch: 40 }, // Descrição
      { wch: 20 }, // Exemplo
    ];

    XLSX.utils.book_append_sheet(wb, instructionWs, 'Instruções');

    // Salvar arquivo
    XLSX.writeFile(wb, 'template_dados_solares.xlsx');
  }

  // Gerar template vazio (apenas cabeçalhos)
  static generateEmptyTemplate(): void {
    const wb = XLSX.utils.book_new();

    // Cabeçalhos para cada aba
    const cityHeaders = [
      { cidade: '', irradiancia: '', estado: '', latitude: '', longitude: '' }
    ];

    const inversorHeaders = [
      { id: '', nome: '', potencia: '', eficiencia: '', precoW: '', moduloPotencia: '', marca: '', modelo: '' }
    ];

    const tarifaHeaders = [
      { cidade: '', distribuidora: '', tarifaKwh: '', bandeira: '' }
    ];

    // Criar abas
    const cityWs = XLSX.utils.json_to_sheet(cityHeaders);
    const inversorWs = XLSX.utils.json_to_sheet(inversorHeaders);
    const tarifaWs = XLSX.utils.json_to_sheet(tarifaHeaders);

    XLSX.utils.book_append_sheet(wb, cityWs, 'Cidades');
    XLSX.utils.book_append_sheet(wb, inversorWs, 'Inversores');
    XLSX.utils.book_append_sheet(wb, tarifaWs, 'Tarifas');

    // Salvar arquivo
    XLSX.writeFile(wb, 'template_vazio_dados_solares.xlsx');
  }

  // Validar estrutura de uma planilha carregada
  static validateExcelStructure(workbook: XLSX.WorkBook): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Verificar se as abas necessárias existem
    const requiredSheets = ['Cidades', 'Inversores', 'Tarifas'];
    const availableSheets = workbook.SheetNames;

    requiredSheets.forEach(sheetName => {
      if (!availableSheets.includes(sheetName)) {
        errors.push(`Aba "${sheetName}" não encontrada`);
      }
    });

    // Verificar estrutura da aba Cidades
    if (availableSheets.includes('Cidades')) {
      const citySheet = workbook.Sheets['Cidades'];
      const cityData = XLSX.utils.sheet_to_json(citySheet);
      
      if (cityData.length > 0) {
        const firstRow = cityData[0] as any;
        const requiredCityFields = ['cidade', 'irradiancia', 'estado'];
        
        requiredCityFields.forEach(field => {
          if (!(field in firstRow)) {
            errors.push(`Campo "${field}" não encontrado na aba Cidades`);
          }
        });
      }
    }

    // Verificar estrutura da aba Inversores
    if (availableSheets.includes('Inversores')) {
      const inversorSheet = workbook.Sheets['Inversores'];
      const inversorData = XLSX.utils.sheet_to_json(inversorSheet);
      
      if (inversorData.length > 0) {
        const firstRow = inversorData[0] as any;
        const requiredInversorFields = ['id', 'nome', 'potencia', 'eficiencia', 'precoW', 'moduloPotencia'];
        
        requiredInversorFields.forEach(field => {
          if (!(field in firstRow)) {
            errors.push(`Campo "${field}" não encontrado na aba Inversores`);
          }
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Função para download do template
export const downloadExcelTemplate = (withSampleData: boolean = true) => {
  if (withSampleData) {
    ExcelTemplateGenerator.generateTemplate();
  } else {
    ExcelTemplateGenerator.generateEmptyTemplate();
  }
};
