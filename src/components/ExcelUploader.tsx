import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';
import { useExcelDatabase } from '@/utils/excelDatabase';

interface ExcelUploaderProps {
  onDataLoaded?: () => void;
}

export const ExcelUploader: React.FC<ExcelUploaderProps> = ({ onDataLoaded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const { loadFile, loadSampleData } = useExcelDatabase();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Verificar se é um arquivo Excel
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];
    
    if (!validTypes.includes(file.type)) {
      setUploadStatus('error');
      setErrorMessage('Por favor, selecione um arquivo Excel válido (.xlsx ou .xls)');
      return;
    }

    setIsLoading(true);
    setUploadStatus('idle');
    setErrorMessage('');

    try {
      await loadFile(file);
      setUploadStatus('success');
      onDataLoaded?.();
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage('Erro ao processar arquivo. Verifique o formato da planilha.');
      console.error('Erro no upload:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSampleData = () => {
    loadSampleData();
    setUploadStatus('success');
    onDataLoaded?.();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Banco de Dados Excel
        </CardTitle>
        <CardDescription>
          Carregue uma planilha Excel com dados de cidades, inversores e tarifas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload de arquivo */}
        <div className="space-y-2">
          <label htmlFor="excel-file" className="text-sm font-medium">
            Selecionar arquivo Excel
          </label>
          <div className="flex items-center gap-2">
            <Input
              id="excel-file"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              disabled={isLoading}
              className="flex-1"
            />
            <Upload className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Status do upload */}
        {uploadStatus === 'success' && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Dados carregados com sucesso!
            </AlertDescription>
          </Alert>
        )}

        {uploadStatus === 'error' && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-sm text-gray-600">Processando...</span>
          </div>
        )}

        {/* Botão para dados de exemplo */}
        <div className="pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleLoadSampleData}
            className="w-full"
            disabled={isLoading}
          >
            Usar dados de exemplo
          </Button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Para testar sem planilha
          </p>
        </div>

        {/* Instruções */}
        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>Formato esperado da planilha:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Aba "Cidades":</strong> cidade, irradiancia, estado</li>
            <li><strong>Aba "Inversores":</strong> id, nome, potencia, eficiencia, precoW, moduloPotencia</li>
            <li><strong>Aba "Tarifas":</strong> cidade, distribuidora, tarifaKwh</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
