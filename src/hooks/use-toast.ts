
import { useState } from "react";

type Toast = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (props: Partial<Toast>) => {
    console.log("Toast:", props);
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, ...props };
    setToasts((currentToasts) => [...currentToasts, newToast]);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((currentToasts) => 
        currentToasts.filter((toast) => toast.id !== id)
      );
    }, 5000);
  };

  return { toast, toasts };
};

export const toast = (props: Partial<Toast>) => {
  console.log("Toast global:", props);
  // Implementation simplified for global calls
};
