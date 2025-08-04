import { useState } from 'react';
import { FormData } from '@/types/solar';

export const useSolarForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
    installationType: "",
    energyBill: "",
    monthlyConsumption: "",
    observations: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = (): boolean => {
    const { city, installationType, energyBill, monthlyConsumption } = formData;
    const isCityValid = city && city.trim() !== '';
    const isInstallationTypeValid = installationType && installationType.trim() !== '';
    const isEnergyBillValid = energyBill && energyBill.trim() !== '';
    const isMonthlyConsumptionValid = monthlyConsumption && monthlyConsumption.trim() !== '';
    
    if (!isCityValid || !isInstallationTypeValid || !isEnergyBillValid || !isMonthlyConsumptionValid) {
      console.log('Campos obrigatórios não preenchidos:', {
        city: isCityValid,
        installationType: isInstallationTypeValid,
        energyBill: isEnergyBillValid,
        monthlyConsumption: isMonthlyConsumptionValid
      });
      return false;
    }
    
    return true;
  };

  const validateStep2 = (): boolean => {
    const { name, email, whatsapp } = formData;
    return !!(name && email && whatsapp);
  };

  return {
    formData,
    handleInputChange,
    validateStep1,
    validateStep2
  };
};
