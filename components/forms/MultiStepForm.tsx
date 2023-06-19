import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import useMultiStepForm from "../../hooks/useMultiStepForm";
import AmountForm from "./AmountForm";
import RecipientForm from "./RecipientForm";
import { FormInputData } from "@/types/FormInputDataType";

const steps = [<AmountForm />, <RecipientForm />];

const MultiStepForm = () => {
  const methods = useForm<FormInputData>();
  const { handleSubmit } = methods;

  const {
    currentStepIndex,
    step: renderForm,
    nextStep,
    previousStep,
  } = useMultiStepForm(steps);

  const onSubmit = () => {
    if (currentStepIndex === steps.length - 1) {
      console.log(methods.watch());
    } else {
      nextStep();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderForm}
        <div className="flex gap-3">
          <Button
            disabled={currentStepIndex === 0}
            onClick={previousStep}
            mt={4}
            colorScheme="blue">
            Back
          </Button>
          {currentStepIndex < steps.length - 1 && (
            <Button type="submit" variant="solid" colorScheme="blue" mt={4}>
              Next
            </Button>
          )}
          {currentStepIndex === steps.length - 1 && (
            <Button type="submit" variant="solid" colorScheme="blue" mt={4}>
              Submit
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default MultiStepForm;
