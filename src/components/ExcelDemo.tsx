import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Database, FileSpreadsheet, Zap } from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { useSolarCalculator, CalculationParams } from '@/utils/solarCalculator';

export const ExcelDemo: React.FC = () => {
  const [calculationParams, setCalculationParams] = useState<CalculationParams>({
    cidade: '',
    consumoMensal: 0,
    valorConta: 0,
    kitInversorId: '',
  });
  
  const [result, setResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const { calculate, getAvailableCities, getAvailableKits, isDataLoaded } = useSolarCalculator();

  const handleCalculate = () => {
    if (!calculationParams.cidade || !calculationParams.consumoMensal || !calculationParams.valorConta) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    setIsCalculating(true);
    
    // Simular delay de cálculo
    setTimeout(() => {
      const calculationResult = calculate(calculationParams);
      setResult(calculationResult);
      setIsCalculating(false);
    }, 1000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatNumber = (value: number, decimals: number = 1) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Demo: Excel como Banco de Dados
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sistema de cálculo solar integrado com planilhas Excel para gerenciar dados de cidades, 
            kits inversores e tarifas de energia.
          </p>
        </div>

        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculadora Solar</TabsTrigger>
            <TabsTrigger value="admin">Painel Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Formulário de Cálculo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Cálculo de Sistema Solar
                  </CardTitle>
                  <CardDescription>
                    Preencha os dados para calcular seu sistema fotovoltaico
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Status do banco de dados */}
                  <Alert className={isDataLoaded() ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}>
                    <Database className={`h-4 w-4 ${isDataLoaded() ? "text-green-600" : "text-yellow-600"}`} />
                    <AlertDescription className={isDataLoaded() ? "text-green-800" : "text-yellow-800"}>
                      {isDataLoaded() 
                        ? "Dados carregados do Excel com sucesso!" 
                        : "Usando dados padrão. Carregue uma planilha Excel no Painel Admin para dados personalizados."
                      }
                    </AlertDescription>
                  </Alert>

                  {/* Cidade */}
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade *</Label>
                    <Select 
                      value={calculationParams.cidade} 
                      onValueChange={(value) => setCalculationParams(prev => ({ ...prev, cidade: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione sua cidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableCities().map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Consumo Mensal */}
                  <div className="space-y-2">
                    <Label htmlFor="consumo">Consumo Mensal (kWh) *</Label>
                    <Input
                      id="consumo"
                      type="number"
                      placeholder="Ex: 350"
                      value={calculationParams.consumoMensal || ''}
                      onChange={(e) => setCalculationParams(prev => ({ 
                        ...prev, 
                        consumoMensal: parseFloat(e.target.value) || 0 
                      }))}
                    />
                  </div>

                  {/* Valor da Conta */}
                  <div className="space-y-2">
                    <Label htmlFor="conta">Valor da Conta (R$) *</Label>
                    <Input
                      id="conta"
                      type="number"
                      placeholder="Ex: 280.50"
                      value={calculationParams.valorConta || ''}
                      onChange={(e) => setCalculationParams(prev => ({ 
                        ...prev, 
                        valorConta: parseFloat(e.target.value) || 0 
                      }))}
                    />
                  </div>

                  {/* Kit Inversor */}
                  <div className="space-y-2">
                    <Label htmlFor="kit">Kit Inversor (Opcional)</Label>
                    <Select 
                      value={calculationParams.kitInversorId} 
                      onValueChange={(value) => setCalculationParams(prev => ({ ...prev, kitInversorId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um kit ou deixe em branco" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableKits().map((kit) => (
                          <SelectItem key={kit.id} value={kit.id}>
                            {kit.nome} - {kit.potencia}kW
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleCalculate}
                    className="w-full"
                    disabled={isCalculating}
                  >
                    {isCalculating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Calculando...
                      </>
                    ) : (
                      <>
                        <Calculator className="h-4 w-4 mr-2" />
                        Calcular Sistema
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Resultados */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Resultados do Cálculo
                  </CardTitle>
                  <CardDescription>
                    Dimensionamento e análise financeira do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {result ? (
                    <div className="space-y-4">
                      {/* Dados do Sistema */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Potência</div>
                          <div className="text-lg font-bold text-blue-900">
                            {formatNumber(result.potenciaFinal)} kWp
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">Módulos</div>
                          <div className="text-lg font-bold text-green-900">
                            {result.quantidadeModulos} unidades
                          </div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-sm text-purple-600 font-medium">Geração</div>
                          <div className="text-lg font-bold text-purple-900">
                            {formatNumber(result.geracaoMensal, 0)} kWh/mês
                          </div>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <div className="text-sm text-orange-600 font-medium">Payback</div>
                          <div className="text-lg font-bold text-orange-900">
                            {formatNumber(result.payback)} anos
                          </div>
                        </div>
                      </div>

                      {/* Dados Financeiros */}
                      <div className="space-y-3">
                        <h4 className="font-semibold">Análise Financeira</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Investimento:</span>
                            <span className="font-medium">
                              {formatCurrency(result.precoMinimo)} - {formatCurrency(result.precoMaximo)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Economia mensal:</span>
                            <span className="font-medium text-green-600">
                              {formatCurrency(result.economiaMensal)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Economia anual:</span>
                            <span className="font-medium text-green-600">
                              {formatCurrency(result.economiaAnual)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Dados das Fontes */}
                      <div className="space-y-3 pt-4 border-t">
                        <h4 className="font-semibold">Dados Utilizados</h4>
                        <div className="text-sm space-y-1">
                          {result.cityData && (
                            <div>
                              <strong>Cidade:</strong> {result.cityData.cidade} - {result.cityData.estado}
                              <br />
                              <strong>Irradiância:</strong> {result.cityData.irradiancia} kWh/m²/dia
                            </div>
                          )}
                          {result.kitData && (
                            <div>
                              <strong>Kit:</strong> {result.kitData.nome}
                              <br />
                              <strong>Eficiência:</strong> {(result.kitData.eficiencia * 100).toFixed(0)}%
                            </div>
                          )}
                          {result.tarifaData && (
                            <div>
                              <strong>Distribuidora:</strong> {result.tarifaData.distribuidora}
                              <br />
                              <strong>Tarifa:</strong> {formatCurrency(result.tarifaData.tarifaKwh)}/kWh
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Preencha os dados e clique em "Calcular Sistema" para ver os resultados</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="admin">
            <AdminDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
