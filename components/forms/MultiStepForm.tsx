import React, { lazy, Suspense, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Button, useDisclosure, useToast } from "@chakra-ui/react";
import useMultiStepForm from "../../hooks/useMultiStepForm";
const AmountForm = lazy(() => import("./AmountForm"));
const RecipientForm = lazy(() => import("./RecipientForm"));
import { FormInputData } from "@/types/FormInputDataType";
import FormSkeleton from "../loading/FormSkeleton";
import ConfirmationPayment from "../modals/ConfirmationPayment";
import StepForm from "../stepper/StepForm";
import { TbReportAnalytics } from "react-icons/tb";
import TransactionList from "../buttons/TransactionList";

const steps = [
  {
    form: (
      <Suspense fallback={<FormSkeleton quantity={3} />}>
        <AmountForm />
      </Suspense>
    ),
    name: "amountForm",
  },
  {
    form: (
      <Suspense fallback={<FormSkeleton quantity={3} />}>
        <RecipientForm />
      </Suspense>
    ),
    name: "recipientForm",
  },
];

const MultiStepForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [listTransaction, setListTransaction] = useState<FormInputData[]>([]);

  const methods = useForm<FormInputData>({
    defaultValues: {
      amount: 1000000,
      service: "Bank Transfer",
    },
  });
  const { handleSubmit, watch } = methods;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const {
    currentStepIndex,
    step: renderForm,
    nextStep,
    previousStep,
    goToStep,
  } = useMultiStepForm(steps);

  const submittedData: FormInputData = {
    amount: watch("amount"),
    service: watch("service"),
    destinationCountry: watch("destinationCountry"),
    bank: watch("bank"),
    accountNumber: watch("accountNumber"),
    fullName: watch("fullName"),
    total:
      watch("amount") + (watch("service") === "Bank Transfer" ? 35_000 : 5_000),
    status: "Pending",
  };

  const succesSubmit = () => {
    setListTransaction([...listTransaction, submittedData]);
    setIsSubmitting(false);
    onClose();
    methods.reset();
    goToStep(0);
    toast({
      title: "Transaction created.",
      description: "Check your transaction in history.",
      status: "success",
      duration: 3000,
      isClosable: false,
    });
  };

  const onSubmit = () => {
    if (currentStepIndex === steps.length - 1 && isOpen) {
      setIsSubmitting(true);

      setTimeout(() => {
        succesSubmit();
      }, 2000);
    } else {
      nextStep();
    }
  };

  const activeStep = currentStepIndex;

  const disabledNextButton =
    !watch("destinationCountry") || !watch("amount") || !watch("service");

  const disabledSubmitButton =
    !watch("accountNumber") || !watch("bank") || !watch("fullName");

  return (
    <>
      <TransactionList listTransaction={listTransaction} />
      <Box
        boxShadow="base"
        p="6"
        rounded="md"
        bg="white"
        maxW="container.sm"
        mx="auto"
        mt={8}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <StepForm activeStep={activeStep} steps={steps} />
            {renderForm}
            {watch("service") && (
              <div className="flex justify-end gap-3 mt-5">
                {currentStepIndex === 0 ? null : (
                  <Button
                    disabled={currentStepIndex === 0}
                    onClick={previousStep}
                    mt={4}
                    colorScheme="blue">
                    Back
                  </Button>
                )}
                {currentStepIndex < steps.length - 1 && (
                  <Button
                    isDisabled={disabledNextButton}
                    onClick={nextStep}
                    variant="solid"
                    colorScheme="blue"
                    mt={4}>
                    Next
                  </Button>
                )}
                {currentStepIndex === steps.length - 1 && (
                  <Button
                    isDisabled={disabledSubmitButton}
                    onClick={onOpen}
                    variant="solid"
                    colorScheme="blue"
                    mt={4}>
                    Submit
                  </Button>
                )}
              </div>
            )}
            <ConfirmationPayment
              isOpen={isOpen}
              onClose={onClose}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
            />
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default MultiStepForm;
