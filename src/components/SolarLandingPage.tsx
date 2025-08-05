import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import solarHeroBg from "@/assets/solar-hero-bg.jpg";

// Components
import { SolarHeader } from "@/components/solar/SolarHeader";
import { ProgressIndicator } from "@/components/solar/ProgressIndicator";
import { Step1ConsumptionForm } from "@/components/solar/Step1ConsumptionForm";
import { Step2PersonalForm } from "@/components/solar/Step2PersonalForm";
import { LoadingStep } from "@/components/solar/LoadingStep";
import { Step3Results } from "@/components/solar/Step3Results";

// Hooks and utilities
import { useSolarForm } from "@/hooks/useSolarForm";
import { useVirtualKeyboard } from "@/hooks/useVirtualKeyboard";
import { calculateSolarResults } from "@/utils/solarCalculations";

const SolarLandingPage = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { formData, handleInputChange, validateStep1, validateStep2 } = useSolarForm();
  
  // Handle virtual keyboard issues on mobile
  useVirtualKeyboard();

  const handleStep1Next = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleStep2Next = () => {
    if (validateStep2()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(3);
      }, 3000);
    }
  };

  const handleBackToStep1 = () => {
    setStep(1);
  };

  const handleBackToStart = () => {
    setStep(1);
  };

  const renderStepContent = () => {
    if (isLoading) {
      return <LoadingStep />;
    }

    switch (step) {
      case 1:
        return (
          <Step1ConsumptionForm
            formData={formData}
            onInputChange={handleInputChange}
            onNext={handleStep1Next}
          />
        );
      case 2:
        return (
          <Step2PersonalForm
            formData={formData}
            onInputChange={handleInputChange}
            onNext={handleStep2Next}
            onBack={handleBackToStep1}
            isLoading={isLoading}
          />
        );
      case 3:
        return (
          <Step3Results
            formData={formData}
            solarResults={calculateSolarResults(formData)}
            onBackToStart={handleBackToStart}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative keyboard-aware"
      style={{ backgroundImage: `url(${solarHeroBg})` }}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-i9-blue/80 to-i9-blue/40"
        style={{ background: 'var(--gradient-overlay)' }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-2 md:px-4 py-2 md:py-6 min-h-screen flex flex-col">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-none flex-1">
          {/* Header */}
          <SolarHeader />

          {/* Form Card */}
          <Card className="max-w-4xl mx-auto w-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl md:flex-none flex-1 flex flex-col md:max-h-none max-h-screen overflow-hidden desktop-adaptive">
            <CardContent className="p-3 md:p-6 md:flex-none flex-1 flex flex-col md:overflow-visible overflow-y-auto mobile-scroll">
              {/* Progress Indicator */}
              <ProgressIndicator currentStep={step} />
              
              {/* Step Content */}
              <div className="md:flex-none flex-1 md:overflow-visible overflow-y-auto">
                {renderStepContent()}
              </div>
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