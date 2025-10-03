// Stub analytics functions for compatibility
export const trackQuizStep = (step: string, data?: any) => {
  // No-op for now
  console.log('Quiz step:', step, data);
};

export const trackConversion = (data?: any) => {
  // No-op for now
  console.log('Conversion:', data);
};

export const trackFormInteraction = (field: string, action?: string, data?: any) => {
  // No-op for now
  console.log('Form interaction:', field, action, data);
};

export const trackCTAClick = (cta: string, location: string) => {
  // No-op for now
  console.log('CTA click:', cta, location);
};
