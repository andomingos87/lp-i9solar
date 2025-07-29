import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sun, Calculator, MessageCircle, FileText, User, Loader2 } from "lucide-react";
import solarHeroBg from "@/assets/solar-hero-bg.jpg";

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  energyBill: string;
  monthlyConsumption: string;
}

const SolarLandingPage = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
    energyBill: "",
    monthlyConsumption: "",
  });

  const brazilianCities = [
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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStep1Next = () => {
    const { city, energyBill, monthlyConsumption } = formData;
    // Validação mais robusta com trim para remover espaços em branco
    const isCityValid = city && city.trim() !== '';
    const isEnergyBillValid = energyBill && energyBill.trim() !== '';
    const isMonthlyConsumptionValid = monthlyConsumption && monthlyConsumption.trim() !== '';
    
    if (isCityValid && isEnergyBillValid && isMonthlyConsumptionValid) {
      setStep(2);
    } else {
      // Opcional: adicionar feedback visual ou console.log para debug
      console.log('Campos obrigatórios não preenchidos:', {
        city: isCityValid,
        energyBill: isEnergyBillValid,
        monthlyConsumption: isMonthlyConsumptionValid
      });
    }
  };

  const handleStep2Next = () => {
    const { name, email, whatsapp } = formData;
    if (name && email && whatsapp) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(3);
      }, 3000);
    }
  };

  const calculateSolarResults = () => {
    const billValue = parseFloat(formData.energyBill.replace(/[^\d,]/g, "").replace(",", "."));
    const monthlyConsumption = parseFloat(formData.monthlyConsumption.replace(/[^\d,]/g, "").replace(",", "."));
    
    // Cálculos de economia
    const monthlySavings = billValue * 0.75; // 75% de economia estimada
    const yearlySavings = monthlySavings * 12;
    const twentyYearSavings = yearlySavings * 20;
    
    // Potencial de geração (assumindo que o sistema gerará 90% do consumo)
    const monthlyGenerationKwh = monthlyConsumption * 0.9;
    const yearlyGenerationKwh = monthlyGenerationKwh * 12;
    
    // Faixa de preço do sistema (baseado na potência necessária)
    // Assumindo R$ 4.500 a R$ 6.000 por kWp instalado
    // E que cada kWp gera aproximadamente 130 kWh/mês
    const requiredKwp = monthlyGenerationKwh / 130;
    const minPrice = requiredKwp * 4500;
    const maxPrice = requiredKwp * 6000;
    
    return {
      monthly: monthlySavings,
      yearly: yearlySavings,
      twentyYear: twentyYearSavings,
      monthlyGenerationKwh,
      yearlyGenerationKwh,
      systemPowerKwp: requiredKwp,
      priceRange: {
        min: minPrice,
        max: maxPrice
      }
    };
  };

  const solarResults = step === 3 ? calculateSolarResults() : { 
    monthly: 0, 
    yearly: 0, 
    twentyYear: 0,
    monthlyGenerationKwh: 0,
    yearlyGenerationKwh: 0,
    systemPowerKwp: 0,
    priceRange: { min: 0, max: 0 }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Dados de consumo";
      case 2: return "Seus dados";
      case 3: return "Sua economia";
      default: return "";
    }
  };

  const getStepIcon = () => {
    switch (step) {
      case 1: return Calculator;
      case 2: return User;
      case 3: return Sun;
      default: return Calculator;
    }
  };

  return (
    <div 
      className="h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${solarHeroBg})` }}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-i9-blue/80 to-i9-blue/40"
        style={{ background: 'var(--gradient-overlay)' }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-4 md:py-6 h-full flex flex-col">
        <div className="max-w-6xl mx-auto flex flex-col">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center mb-2">
              <img 
                src="/lovable-uploads/9db79ece-e986-4d58-ba47-4c0ba70668df.png" 
                alt="i9 Solar" 
                className="h-8 md:h-8 w-auto"
              />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
              Descubra quanto você pode economizar com energia solar!
            </h2>
            <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto">
              Simule sua economia gratuitamente e descubra como a energia solar pode 
              revolucionar sua conta de luz.
            </p>
          </div>

          {/* Form Card */}
          <Card className="max-w-4x1 mx-40 bg-white/95 backdrop-blur-sm border-0 shadow-2xl flex-grow flex flex-col">
            <CardContent className="p-4 md:p-5 flex-grow flex flex-col">
              {/* Progress Indicator */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  {[1, 2, 3].map((stepNumber) => {
                    const StepIcon = stepNumber === 1 ? Calculator : stepNumber === 2 ? User : Sun;
                    return (
                      <div key={stepNumber} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          stepNumber <= step ? 'bg-i9-blue text-white' : 'bg-gray-200 text-gray-400'
                        }`}>
                          <StepIcon className="w-4 h-4" />
                        </div>
                        <span className={`text-xs mt-1 ${
                          stepNumber <= step ? 'text-i9-blue font-medium' : 'text-gray-400'
                        }`}>
                          {stepNumber === 1 ? 'Consumo' : stepNumber === 2 ? 'Dados' : 'Resultado'}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <Progress value={(step / 3) * 100} className="h-2" />
              </div>
              {step === 1 ? (
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-3">
                    <Calculator className="w-5 h-5 text-i9-blue mr-2" />
                    <h3 className="text-xl font-semibold text-i9-blue">
                      Dados de consumo
                    </h3>
                  </div>

                  <div className="space-y-3 flex-grow">
                    <div>
                      <Label htmlFor="city" className="text-i9-blue font-medium text-sm">
                        Cidade *
                      </Label>
                      <Select onValueChange={(value) => handleInputChange("city", value)}>
                        <SelectTrigger className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue h-9">
                          <SelectValue placeholder="Selecione sua cidade" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-300 z-50">
                          {brazilianCities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="energyBill" className="text-i9-blue font-medium text-sm">
                        Valor médio da conta de energia (R$) *
                      </Label>
                      <Input
                        id="energyBill"
                        type="text"
                        placeholder="R$ 500,00"
                        value={formData.energyBill}
                        onChange={(e) => handleInputChange("energyBill", e.target.value)}
                        className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue h-9"
                      />
                    </div>

                    <div>
                      <Label htmlFor="monthlyConsumption" className="text-i9-blue font-medium text-sm">
                        Consumo mensal (kWh) *
                      </Label>
                      <Input
                        id="monthlyConsumption"
                        type="text"
                        placeholder="400 kWh"
                        value={formData.monthlyConsumption}
                        onChange={(e) => handleInputChange("monthlyConsumption", e.target.value)}
                        className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue h-9"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleStep1Next}
                    className="w-full mt-4 bg-i9-yellow hover:bg-i9-yellow/90 text-i9-blue font-semibold py-2 text-base transition-all duration-300 hover:scale-105"
                  >
                    Próxima Etapa
                  </Button>
                </div>
              ) : step === 2 ? (
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-3">
                    <User className="w-5 h-5 text-i9-blue mr-2" />
                    <h3 className="text-xl font-semibold text-i9-blue">
                      Seus dados
                    </h3>
                  </div>

                  <div className="space-y-3 flex-grow">
                    <div>
                      <Label htmlFor="name" className="text-i9-blue font-medium text-sm">
                        Nome completo *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Digite seu nome completo"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue h-9"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-i9-blue font-medium text-sm">
                        E-mail *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue h-9"
                      />
                    </div>

                    <div>
                      <Label htmlFor="whatsapp" className="text-i9-blue font-medium text-sm">
                        WhatsApp *
                      </Label>
                      <Input
                        id="whatsapp"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={formData.whatsapp}
                        onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                        className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue h-9"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1 border-i9-blue text-i9-blue hover:bg-i9-blue/10 py-2 text-sm"
                    >
                      Voltar
                    </Button>
                    <Button
                      onClick={handleStep2Next}
                      className="flex-1 bg-i9-yellow hover:bg-i9-yellow/90 text-i9-blue font-semibold py-2 text-base transition-all duration-300 hover:scale-105"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Calcular Economia"}
                    </Button>
                  </div>
                </div>
              ) : isLoading ? (
                <div className="text-center py-8 flex-grow flex flex-col justify-center">
                  <div className="animate-spin w-12 h-12 mx-auto mb-4">
                    <Sun className="w-12 h-12 text-i9-yellow" />
                  </div>
                  <h3 className="text-xl font-semibold text-i9-blue mb-2">
                    Calculando sua economia...
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Estamos processando seus dados para calcular o potencial de economia com energia solar.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="text-center mb-2">
                    <Sun className="w-6 h-6 text-i9-yellow mx-auto mb-1" />
                    <h3 className="text-lg font-bold text-i9-blue mb-1">
                      Seus Resultados Solares
                    </h3>
                    <p className="text-gray-600 text-xs">
                      Olá {formData.name}! Veja o potencial do seu sistema:
                    </p>
                  </div>

                  {/* Grid com 4 informações principais */}
                  <div className="grid grid-cols-2 gap-2 mb-3 flex-grow">
                    {/* Potencial de Geração */}
                    <div className="text-center p-2 bg-gradient-to-r from-i9-yellow/20 to-i9-lightBlue/20 rounded-lg border border-i9-yellow/30">
                      <p className="text-xs text-i9-blue font-semibold mb-1">Potencial de Geração</p>
                      <p className="text-lg font-bold text-i9-blue">
                        {solarResults.monthlyGenerationKwh.toFixed(0)} kWh
                      </p>
                      <p className="text-xs text-gray-600">por mês</p>
                    </div>

                    {/* Faixa de Preço */}
                    <div className="text-center p-2 bg-i9-lightBlue/10 rounded-lg border border-i9-blue/20">
                      <p className="text-xs text-i9-blue font-semibold mb-1">Faixa de Preço</p>
                      <p className="text-sm font-bold text-i9-blue">
                        R$ {(solarResults.priceRange.min/1000).toFixed(0)}k
                      </p>
                      <p className="text-xs text-gray-600">
                        a R$ {(solarResults.priceRange.max/1000).toFixed(0)}k
                      </p>
                    </div>

                    {/* Economia Mensal */}
                    <div className="text-center p-2 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-xs text-green-700 font-semibold mb-1">Economia Mensal</p>
                      <p className="text-lg font-bold text-green-700">
                        R$ {solarResults.monthly.toFixed(0)}
                      </p>
                      <p className="text-xs text-gray-600">por mês</p>
                    </div>

                    {/* Economia Anual */}
                    <div className="text-center p-2 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-xs text-green-700 font-semibold mb-1">Economia Anual</p>
                      <p className="text-lg font-bold text-green-700">
                        R$ {(solarResults.yearly/1000).toFixed(1)}k
                      </p>
                      <p className="text-xs text-gray-600">por ano</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        className="bg-i9-yellow hover:bg-i9-yellow/90 text-i9-blue font-semibold py-1.5 text-xs transition-all duration-300"
                        onClick={() => {
                          // Ação para receber relatório
                          alert("Relatório detalhado será enviado para seu e-mail!");
                        }}
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        Relatório
                      </Button>

                      <Button
                        variant="outline"
                        className="border-i9-blue text-i9-blue hover:bg-i9-blue hover:text-white font-semibold py-1.5 text-xs transition-all duration-300"
                        onClick={() => {
                          // Ação para falar com consultor
                          window.open(`https://wa.me/5511999999999?text=Olá! Gostaria de falar com um consultor sobre energia solar. Meu nome é ${formData.name}.`, '_blank');
                        }}
                      >
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Consultor
                      </Button>
                    </div>
                    
                    <button
                      onClick={() => setStep(1)}
                      className="w-full text-i9-blue hover:underline text-xs py-1"
                    >
                      ← Voltar e editar dados
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-2">
            <p className="text-white/80 text-xs">
              🔒 Seus dados estão protegidos conosco
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarLandingPage;