import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Database, 
  Download, 
  Upload, 
  RefreshCw, 
  MapPin, 
  Zap, 
  DollarSign,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { ExcelUploader } from './ExcelUploader';
import { useSolarCalculator } from '@/utils/solarCalculator';
import { useExcelDatabase } from '@/utils/excelDatabase';
import { downloadExcelTemplate } from '@/utils/excelTemplate';

export const AdminDashboard: React.FC = () => {
  const [dataStats, setDataStats] = useState({ totalCities: 0, totalKits: 0, hasData: false });
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { getDataStats } = useSolarCalculator();
  const { getAllCities, getAllInversorKits, exportToExcel } = useExcelDatabase();

  useEffect(() => {
    refreshStats();
  }, []);

  const refreshStats = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setDataStats(getDataStats());
      setIsRefreshing(false);
    }, 500);
  };

  const handleDataLoaded = () => {
    refreshStats();
  };

  const handleDownloadTemplate = (withSampleData: boolean) => {
    downloadExcelTemplate(withSampleData);
  };

  const handleExportData = () => {
    exportToExcel();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie os dados do sistema solar</p>
        </div>
        <Button 
          onClick={refreshStats} 
          disabled={isRefreshing}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status do Banco</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              {dataStats.hasData ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <Badge variant={dataStats.hasData ? "default" : "destructive"}>
                {dataStats.hasData ? "Conectado" : "Sem dados"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cidades</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dataStats.totalCities}</div>
            <p className="text-xs text-muted-foreground">
              cidades cadastradas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kits Inversores</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dataStats.totalKits}</div>
            <p className="text-xs text-muted-foreground">
              kits disponíveis
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Upload de Dados</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="data">Visualizar Dados</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExcelUploader onDataLoaded={handleDataLoaded} />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5" />
                  Exportar Dados
                </CardTitle>
                <CardDescription>
                  Baixe os dados atuais em formato Excel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleExportData}
                  className="w-full"
                  disabled={!dataStats.hasData}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar dados atuais
                </Button>
                
                {!dataStats.hasData && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Carregue dados primeiro para poder exportar
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Template com Dados</CardTitle>
                <CardDescription>
                  Baixe um template Excel com dados de exemplo para São Paulo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => handleDownloadTemplate(true)}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Template + Dados
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Template Vazio</CardTitle>
                <CardDescription>
                  Baixe um template Excel vazio para preencher com seus dados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => handleDownloadTemplate(false)}
                  className="w-full"
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Template Vazio
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Estrutura da Planilha</CardTitle>
              <CardDescription>
                Formato esperado para cada aba da planilha Excel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Aba "Cidades"</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <code>cidade</code> - Nome da cidade</li>
                    <li>• <code>irradiancia</code> - kWh/m²/dia</li>
                    <li>• <code>estado</code> - Sigla do estado</li>
                    <li>• <code>latitude</code> - Opcional</li>
                    <li>• <code>longitude</code> - Opcional</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Aba "Inversores"</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <code>id</code> - ID único</li>
                    <li>• <code>nome</code> - Nome do kit</li>
                    <li>• <code>potencia</code> - kW</li>
                    <li>• <code>eficiencia</code> - % (0-100)</li>
                    <li>• <code>precoW</code> - R$/W</li>
                    <li>• <code>moduloPotencia</code> - W</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Aba "Tarifas"</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <code>cidade</code> - Nome da cidade</li>
                    <li>• <code>distribuidora</code> - Nome</li>
                    <li>• <code>tarifaKwh</code> - R$/kWh</li>
                    <li>• <code>bandeira</code> - Opcional</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cidades Carregadas</CardTitle>
                <CardDescription>
                  {dataStats.totalCities} cidades no banco de dados
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dataStats.totalCities > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {getAllCities().map((city, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{city}</span>
                        <MapPin className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Nenhuma cidade carregada
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kits Inversores</CardTitle>
                <CardDescription>
                  {dataStats.totalKits} kits no banco de dados
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dataStats.totalKits > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {getAllInversorKits().map((kit, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{kit.nome}</span>
                          <Badge variant="secondary">{kit.potencia}kW</Badge>
                        </div>
                        <div className="text-xs text-gray-500">
                          {kit.marca} • R$ {kit.precoW}/W • {(kit.eficiencia * 100).toFixed(0)}%
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Nenhum kit carregado
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
