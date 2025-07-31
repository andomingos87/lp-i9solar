import * as XLSX from 'xlsx';

// Tipos para os dados da planilha
export interface CityData {
  cidade: string;
  irradiancia: number;
  estado: string;
  latitude?: number;
  longitude?: number;
}

export interface InversorKit {
  id: string;
  nome: string;
  potencia: number; // kW
  eficiencia: number; // %
  precoW: number; // R$/W
  moduloPotencia: number; // W
  marca?: string;
  modelo?: string;
}

export interface TarifaEnergia {
  cidade: string;
  distribuidora: string;
  tarifaKwh: number; // R$/kWh
  bandeira?: string;
}

class ExcelDatabase {
  private cityData: CityData[] = [];
  private inversorKits: InversorKit[] = [];
  private tarifas: TarifaEnergia[] = [];

  // Método para carregar dados de uma planilha Excel
  async loadExcelFile(file: File): Promise<void> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      // Carregar dados de cidades (primeira aba)
      if (workbook.SheetNames.includes('Cidades')) {
        this.loadCityData(workbook, 'Cidades');
      }

      // Carregar dados de inversores (segunda aba)
      if (workbook.SheetNames.includes('Inversores')) {
        this.loadInversorData(workbook, 'Inversores');
      }

      // Carregar dados de tarifas (terceira aba)
      if (workbook.SheetNames.includes('Tarifas')) {
        this.loadTarifaData(workbook, 'Tarifas');
      }

      console.log('Dados carregados com sucesso!');
    } catch (error) {
      console.error('Erro ao carregar planilha:', error);
      throw new Error('Falha ao processar arquivo Excel');
    }
  }

  // Carregar dados de cidades
  private loadCityData(workbook: XLSX.WorkBook, sheetName: string): void {
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

    this.cityData = jsonData.map(row => ({
      cidade: row.cidade || row.Cidade,
      irradiancia: parseFloat(row.irradiancia || row.Irradiancia),
      estado: row.estado || row.Estado,
      latitude: row.latitude ? parseFloat(row.latitude) : undefined,
      longitude: row.longitude ? parseFloat(row.longitude) : undefined,
    }));
  }

  // Carregar dados de inversores
  private loadInversorData(workbook: XLSX.WorkBook, sheetName: string): void {
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

    this.inversorKits = jsonData.map(row => ({
      id: row.id || row.ID || String(Math.random()),
      nome: row.nome || row.Nome,
      potencia: parseFloat(row.potencia || row.Potencia),
      eficiencia: parseFloat(row.eficiencia || row.Eficiencia) / 100, // Converter % para decimal
      precoW: parseFloat(row.precoW || row.PrecoW),
      moduloPotencia: parseFloat(row.moduloPotencia || row.ModuloPotencia),
      marca: row.marca || row.Marca,
      modelo: row.modelo || row.Modelo,
    }));
  }

  // Carregar dados de tarifas
  private loadTarifaData(workbook: XLSX.WorkBook, sheetName: string): void {
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

    this.tarifas = jsonData.map(row => ({
      cidade: row.cidade || row.Cidade,
      distribuidora: row.distribuidora || row.Distribuidora,
      tarifaKwh: parseFloat(row.tarifaKwh || row.TarifaKwh),
      bandeira: row.bandeira || row.Bandeira,
    }));
  }

  // Métodos para buscar dados
  getCityData(cidade: string): CityData | undefined {
    return this.cityData.find(city => 
      city.cidade.toLowerCase() === cidade.toLowerCase()
    );
  }

  getInversorKit(id: string): InversorKit | undefined {
    return this.inversorKits.find(kit => kit.id === id);
  }

  getAllInversorKits(): InversorKit[] {
    return this.inversorKits;
  }

  getTarifa(cidade: string): TarifaEnergia | undefined {
    return this.tarifas.find(tarifa => 
      tarifa.cidade.toLowerCase() === cidade.toLowerCase()
    );
  }

  getAllCities(): string[] {
    return this.cityData.map(city => city.cidade);
  }

  // Método para exportar dados atuais para Excel
  exportToExcel(): void {
    const wb = XLSX.utils.book_new();

    // Criar aba de cidades
    const cityWs = XLSX.utils.json_to_sheet(this.cityData);
    XLSX.utils.book_append_sheet(wb, cityWs, 'Cidades');

    // Criar aba de inversores
    const inversorWs = XLSX.utils.json_to_sheet(this.inversorKits);
    XLSX.utils.book_append_sheet(wb, inversorWs, 'Inversores');

    // Criar aba de tarifas
    const tarifaWs = XLSX.utils.json_to_sheet(this.tarifas);
    XLSX.utils.book_append_sheet(wb, tarifaWs, 'Tarifas');

    // Salvar arquivo
    XLSX.writeFile(wb, 'dados_solares.xlsx');
  }

  // Método para carregar dados de exemplo (fallback)
  loadSampleData(): void {
    this.cityData = [
      { cidade: 'São Paulo', irradiancia: 4.8, estado: 'SP' },
      { cidade: 'Campinas', irradiancia: 5.4, estado: 'SP' },
      { cidade: 'Santos', irradiancia: 5.0, estado: 'SP' },
    ];

    this.inversorKits = [
      {
        id: 'kit1',
        nome: 'Kit Básico 3kW',
        potencia: 3,
        eficiencia: 0.85,
        precoW: 4.5,
        moduloPotencia: 550,
        marca: 'Exemplo',
      },
      {
        id: 'kit2',
        nome: 'Kit Intermediário 5kW',
        potencia: 5,
        eficiencia: 0.87,
        precoW: 4.2,
        moduloPotencia: 550,
        marca: 'Exemplo',
      },
    ];

    this.tarifas = [
      { cidade: 'São Paulo', distribuidora: 'Enel', tarifaKwh: 0.65 },
      { cidade: 'Campinas', distribuidora: 'CPFL', tarifaKwh: 0.62 },
    ];
  }
}

// Instância singleton
export const excelDB = new ExcelDatabase();

// Hook para usar no React
export const useExcelDatabase = () => {
  return {
    loadFile: (file: File) => excelDB.loadExcelFile(file),
    getCityData: (cidade: string) => excelDB.getCityData(cidade),
    getInversorKit: (id: string) => excelDB.getInversorKit(id),
    getAllInversorKits: () => excelDB.getAllInversorKits(),
    getTarifa: (cidade: string) => excelDB.getTarifa(cidade),
    getAllCities: () => excelDB.getAllCities(),
    exportToExcel: () => excelDB.exportToExcel(),
    loadSampleData: () => excelDB.loadSampleData(),
  };
};
