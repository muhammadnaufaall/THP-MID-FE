import React, { lazy, Suspense, useEffect, useState } from "react";

import { Box, Button, useDisclosure, useToast } from "@chakra-ui/react";

import { useForm, FormProvider } from "react-hook-form";
import cookie from "js-cookie";

import useMultiStepForm from "../../hooks/useMultiStepForm";
import FormSkeleton from "../loading/FormSkeleton";

import { FormInputData } from "@/types/FormInputDataType";

const AmountForm = lazy(() => import("./AmountForm"));
const ConfirmationPayment = lazy(() => import("../modals/ConfirmationPayment"));
const RecipientForm = lazy(() => import("./RecipientForm"));
const TransactionList = lazy(() => import("../buttons/TransactionList"));
const StepForm = lazy(() => import("../stepper/StepForm"));

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

  // Get list transaction from cookie
  useEffect(() => {
    const cookieListTransaction = cookie.get("listTransaction");
    if (cookieListTransaction) {
      setTimeout(() => {
        setListTransaction(JSON.parse(cookieListTransaction));
      }, 100);
    }
  }, []);

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
    cookie.set(
      "listTransaction",
      JSON.stringify([...listTransaction, submittedData])
    );
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
      <Suspense fallback={<FormSkeleton quantity={1} />}>
        <TransactionList
          setListTransaction={setListTransaction}
          listTransaction={listTransaction}
        />
      </Suspense>
      <Box
        boxShadow="base"
        p="6"
        rounded="md"
        bg="white"
        maxW="container.sm"
        mx="auto"
        mt={8}
        mb={8}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Suspense fallback={<FormSkeleton quantity={1} />}>
              <StepForm activeStep={activeStep} steps={steps} />
            </Suspense>
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
            <Suspense fallback={null}>
              <ConfirmationPayment
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
              />
            </Suspense>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default MultiStepForm;
