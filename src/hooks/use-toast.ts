
import { useState } from "react";

// Simple placeholder toast hook
export const useToast = () => {
  const [toasts, setToasts] = useState<any[]>([]);

  const toast = (props: any) => {
    console.log("Toast:", props);
    // Ici, vous pourriez intégrer un système de toast complet si nécessaire
    setToasts((currentToasts) => [...currentToasts, props]);
  };

  return { toast };
};

export const toast = (props: any) => {
  console.log("Toast global:", props);
  // Implementation simplifiée pour les appels globaux
};
