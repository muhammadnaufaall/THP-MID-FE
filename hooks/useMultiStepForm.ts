import { ReactElement, useState } from "react";

const useMultiStepForm = (steps: { form: ReactElement; name: string }[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const nextStep = () => {
    setCurrentStepIndex((prev) => {
      if (prev >= steps.length - 1) return prev;
      return prev + 1;
    });
  };

  const previousStep = () => {
    setCurrentStepIndex((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  };

  const goToStep = (index: number) => {
    setCurrentStepIndex(index);
  };

  return {
    currentStepIndex,
    step: steps[currentStepIndex].form,
    nextStep,
    previousStep,
    goToStep,
  };
};

export default useMultiStepForm;
