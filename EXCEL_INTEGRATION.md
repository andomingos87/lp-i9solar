# Integração Excel como Banco de Dados

Este projeto implementa uma solução completa para usar planilhas Excel como banco de dados para o sistema de cálculo solar.

## 🚀 Funcionalidades

### ✅ Implementado
- ✅ Upload de planilhas Excel (.xlsx, .xls)
- ✅ Leitura automática de dados de cidades, inversores e tarifas
- ✅ Validação da estrutura da planilha
- ✅ Painel administrativo para gerenciar dados
- ✅ Calculadora solar integrada com dados do Excel
- ✅ Geração de templates Excel
- ✅ Exportação de dados atuais
- ✅ Fallback para dados padrão quando não há Excel carregado

## 📁 Estrutura de Arquivos

```
src/
├── components/
│   ├── ExcelUploader.tsx      # Componente para upload de Excel
│   ├── AdminDashboard.tsx     # Painel administrativo
│   └── ExcelDemo.tsx          # Demo completa da integração
├── utils/
│   ├── excelDatabase.ts       # Classe principal para gerenciar dados
│   ├── solarCalculator.ts     # Calculadora integrada com Excel
│   └── excelTemplate.ts       # Gerador de templates
```

## 📊 Estrutura da Planilha Excel

### Aba "Cidades"
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| cidade | string | ✅ | Nome da cidade |
| irradiancia | number | ✅ | Irradiância solar (kWh/m²/dia) |
| estado | string | ✅ | Sigla do estado (ex: SP) |
| latitude | number | ❌ | Coordenada latitude |
| longitude | number | ❌ | Coordenada longitude |

### Aba "Inversores"
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| id | string | ✅ | Identificador único |
| nome | string | ✅ | Nome comercial do kit |
| potencia | number | ✅ | Potência em kW |
| eficiencia | number | ✅ | Eficiência em % (0-100) |
| precoW | number | ✅ | Preço por Watt em R$ |
| moduloPotencia | number | ✅ | Potência do módulo em W |
| marca | string | ❌ | Marca do equipamento |
| modelo | string | ❌ | Modelo do equipamento |

### Aba "Tarifas"
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| cidade | string | ✅ | Nome da cidade |
| distribuidora | string | ✅ | Nome da distribuidora |
| tarifaKwh | number | ✅ | Tarifa por kWh em R$ |
| bandeira | string | ❌ | Bandeira tarifária |

## 🛠️ Como Usar

### 1. Instalar Dependência
```bash
npm install xlsx
```

### 2. Baixar Template
1. Acesse o **Painel Admin** no sistema
2. Vá para a aba **Templates**
3. Clique em **Download Template + Dados** para um exemplo
4. Ou **Download Template Vazio** para começar do zero

### 3. Preencher Planilha
- Abra o template no Excel
- Preencha as abas com seus dados
- Mantenha os nomes das colunas exatamente como no template
- Salve como arquivo .xlsx

### 4. Carregar no Sistema
1. Acesse o **Painel Admin**
2. Na aba **Upload de Dados**
3. Clique em **Selecionar arquivo Excel**
4. Escolha sua planilha preenchida
5. Aguarde o processamento

### 5. Usar na Calculadora
- Vá para a **Calculadora Solar**
- Os dados da planilha estarão disponíveis nos dropdowns
- Faça seus cálculos normalmente

## 💡 Exemplo de Uso no Código

```typescript
import { useExcelDatabase, useSolarCalculator } from '@/utils';

// Carregar dados do Excel
const { loadFile, getCityData } = useExcelDatabase();
await loadFile(excelFile);

// Usar na calculadora
const { calculate } = useSolarCalculator();
const result = calculate({
  cidade: 'São Paulo',
  consumoMensal: 350,
  valorConta: 280,
  kitInversorId: 'kit_5kw_inter'
});
```

## 🔧 Personalização

### Adicionar Novos Campos
1. Edite a interface em `excelDatabase.ts`
2. Atualize o método de carregamento correspondente
3. Modifique o template em `excelTemplate.ts`

### Modificar Cálculos
- Edite a classe `SolarCalculator` em `solarCalculator.ts`
- Ajuste as constantes e fórmulas conforme necessário

### Customizar Interface
- Modifique os componentes em `components/`
- Ajuste estilos e layout conforme sua marca

## 🚨 Tratamento de Erros

O sistema possui tratamento robusto de erros:
- **Arquivo inválido**: Verifica se é Excel (.xlsx/.xls)
- **Estrutura incorreta**: Valida colunas obrigatórias
- **Dados faltando**: Usa valores padrão como fallback
- **Erro de processamento**: Exibe mensagens claras ao usuário

## 📈 Vantagens da Solução

### ✅ Prós
- **Simplicidade**: Qualquer pessoa pode editar Excel
- **Flexibilidade**: Fácil de adicionar/remover dados
- **Backup**: Planilhas podem ser versionadas
- **Offline**: Funciona sem internet
- **Familiar**: Interface conhecida (Excel)

### ⚠️ Limitações
- **Performance**: Não ideal para milhares de registros
- **Concorrência**: Apenas um usuário pode editar por vez
- **Validação**: Limitada comparada a bancos de dados
- **Relacionamentos**: Sem foreign keys automáticas

## 🔄 Alternativas Futuras

Para projetos maiores, considere migrar para:
- **SQLite**: Banco local mais robusto
- **Supabase**: Banco na nuvem com interface web
- **Airtable**: Híbrido entre planilha e banco
- **Google Sheets API**: Planilhas online colaborativas

## 🆘 Suporte

Se encontrar problemas:
1. Verifique se a planilha segue o formato exato
2. Confirme que todas as colunas obrigatórias estão presentes
3. Teste com o template fornecido primeiro
4. Verifique o console do navegador para erros detalhados

---

**Desenvolvido para facilitar o gerenciamento de dados em sistemas solares** ⚡
