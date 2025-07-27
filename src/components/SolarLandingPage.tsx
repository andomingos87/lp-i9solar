import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Calculator, MessageCircle, FileText } from "lucide-react";
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
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
    energyBill: "",
    monthlyConsumption: "",
  });

  const brazilianCities = [
    "São Paulo - SP",
    "Rio de Janeiro - RJ",
    "Belo Horizonte - MG",
    "Brasília - DF",
    "Salvador - BA",
    "Fortaleza - CE",
    "Manaus - AM",
    "Curitiba - PR",
    "Recife - PE",
    "Goiânia - GO",
    "Belém - PA",
    "Porto Alegre - RS",
    "Guarulhos - SP",
    "Campinas - SP",
    "São Luís - MA",
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    const { name, email, whatsapp, city, energyBill, monthlyConsumption } = formData;
    if (name && email && whatsapp && city && energyBill && monthlyConsumption) {
      setStep(2);
    }
  };

  const calculateSavings = () => {
    const billValue = parseFloat(formData.energyBill.replace(/[^\d,]/g, "").replace(",", "."));
    const monthlySavings = billValue * 0.75; // 75% de economia estimada
    const yearlySavings = monthlySavings * 12;
    const twentyYearSavings = yearlySavings * 20;

    return {
      monthly: monthlySavings,
      yearly: yearlySavings,
      twentyYear: twentyYearSavings,
    };
  };

  const savings = step === 2 ? calculateSavings() : { monthly: 0, yearly: 0, twentyYear: 0 };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${solarHeroBg})` }}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-i9-blue/80 to-i9-blue/40"
        style={{ background: 'var(--gradient-overlay)' }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sun className="w-8 h-8 text-i9-yellow mr-2" />
              <h1 className="text-2xl md:text-3xl font-bold text-white">i9 Solar</h1>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Descubra quanto você pode economizar com energia solar!
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Simule sua economia gratuitamente e descubra como a energia solar pode 
              revolucionar sua conta de luz.
            </p>
          </div>

          {/* Form Card */}
          <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-6 md:p-8">
              {step === 1 ? (
                <div>
                  <div className="flex items-center mb-6">
                    <Calculator className="w-6 h-6 text-i9-blue mr-2" />
                    <h3 className="text-2xl font-semibold text-i9-blue">
                      Passo 1: Seus dados
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-i9-blue font-medium">
                        Nome completo *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Digite seu nome completo"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-i9-blue font-medium">
                        E-mail *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue"
                      />
                    </div>

                    <div>
                      <Label htmlFor="whatsapp" className="text-i9-blue font-medium">
                        WhatsApp *
                      </Label>
                      <Input
                        id="whatsapp"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={formData.whatsapp}
                        onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                        className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue"
                      />
                    </div>

                    <div>
                      <Label htmlFor="city" className="text-i9-blue font-medium">
                        Cidade *
                      </Label>
                      <Select onValueChange={(value) => handleInputChange("city", value)}>
                        <SelectTrigger className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue">
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
                      <Label htmlFor="energyBill" className="text-i9-blue font-medium">
                        Valor médio da conta de energia (R$) *
                      </Label>
                      <Input
                        id="energyBill"
                        type="text"
                        placeholder="R$ 500,00"
                        value={formData.energyBill}
                        onChange={(e) => handleInputChange("energyBill", e.target.value)}
                        className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue"
                      />
                    </div>

                    <div>
                      <Label htmlFor="monthlyConsumption" className="text-i9-blue font-medium">
                        Consumo mensal (kWh) *
                      </Label>
                      <Input
                        id="monthlyConsumption"
                        type="text"
                        placeholder="400 kWh"
                        value={formData.monthlyConsumption}
                        onChange={(e) => handleInputChange("monthlyConsumption", e.target.value)}
                        className="mt-1 border-gray-300 focus:border-i9-blue focus:ring-i9-blue"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleNextStep}
                    className="w-full mt-6 bg-i9-yellow hover:bg-i9-yellow/90 text-i9-blue font-semibold py-3 text-lg transition-all duration-300 hover:scale-105"
                  >
                    Calcular Economia
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-6">
                    <Sun className="w-12 h-12 text-i9-yellow mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-i9-blue mb-2">
                      Sua Economia Estimada
                    </h3>
                    <p className="text-gray-600">
                      Olá {formData.name}! Veja quanto você pode economizar:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 bg-i9-lightBlue/20 rounded-lg">
                      <p className="text-sm text-i9-blue font-medium">Economia Mensal</p>
                      <p className="text-2xl font-bold text-i9-blue">
                        R$ {savings.monthly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-i9-lightBlue/20 rounded-lg">
                      <p className="text-sm text-i9-blue font-medium">Economia Anual</p>
                      <p className="text-2xl font-bold text-i9-blue">
                        R$ {savings.yearly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-i9-lightBlue/20 rounded-lg">
                      <p className="text-sm text-i9-blue font-medium">Economia em 20 anos</p>
                      <p className="text-2xl font-bold text-i9-blue">
                        R$ {savings.twentyYear.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button
                      className="w-full bg-i9-yellow hover:bg-i9-yellow/90 text-i9-blue font-semibold py-3 text-lg transition-all duration-300 hover:scale-105"
                      onClick={() => {
                        // Ação para receber relatório
                        alert("Relatório detalhado será enviado para seu e-mail!");
                      }}
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      Receber Relatório Detalhado
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-i9-blue text-i9-blue hover:bg-i9-blue hover:text-white font-semibold py-3 text-lg transition-all duration-300"
                      onClick={() => {
                        // Ação para falar com consultor
                        window.open(`https://wa.me/5511999999999?text=Olá! Gostaria de falar com um consultor sobre energia solar. Meu nome é ${formData.name}.`, '_blank');
                      }}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Falar com um Consultor
                    </Button>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="text-i9-blue hover:underline text-sm"
                    >
                      ← Voltar e editar dados
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-white/80 text-sm">
              🔒 Seus dados estão protegidos conosco
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarLandingPage;