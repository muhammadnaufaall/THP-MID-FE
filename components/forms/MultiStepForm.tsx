import React, { lazy, Suspense, useEffect, useState } from "react";

import { Box, Button, useDisclosure, useToast } from "@chakra-ui/react";

import { useForm, FormProvider } from "react-hook-form";
import cookie from "js-cookie";

import useMultiStepForm from "../../hooks/useMultiStepForm";
import FormSkeleton from "../loading/FormSkeleton";

import { FormInputData } from "@/types/FormInputDataType";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import dynamic from "next/dynamic";

const AmountForm = dynamic(() => import("./AmountForm"));
const ConfirmationPayment = dynamic(
  () => import("../modals/ConfirmationPayment")
);
const RecipientForm = dynamic(() => import("./RecipientForm"));
const TransactionList = dynamic(() => import("../buttons/TransactionList"));
const StepForm = dynamic(() => import("../stepper/StepForm"));

const steps = [
  {
    form: <AmountForm />,
    name: "amountForm",
  },
  {
    form: <RecipientForm />,
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
  const { handleSubmit, watch, setValue } = methods;
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
    currentStepIndex,
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

  let activeStep = currentStepIndex;

  const disabledNextButton =
    !watch("destinationCountry") || !watch("amount") || !watch("service");

  const disabledSubmitButton =
    !watch("accountNumber") || !watch("bank") || !watch("fullName");

  const { localStorageData, setLocalStorageData } = useLocalStorage<
    FormInputData & { currentStepIndex: number }
  >("formData", {
    destinationCountry: "",
    service: "Bank Transfer",
    amount: 1_000_000,
    bank: "",
    accountNumber: "",
    fullName: "",
    total: 0,
    status: "",
    currentStepIndex: 0,
  });

  const watchedFields = watch();

  // Update nilai form dan local storage menggunakan debounce
  useEffect(() => {
    watchedFields.currentStepIndex = activeStep;
    setLocalStorageData(watchedFields);
  }, [watchedFields, setLocalStorageData, activeStep]);

  // Mengatur nilai form saat data diambil dari local storage
  useEffect(() => {
    if (localStorageData) {
      const { currentStepIndex } = localStorageData;
      goToStep(currentStepIndex);
      setValue("destinationCountry", localStorageData.destinationCountry);
      setValue("service", localStorageData.service);
      setValue("amount", localStorageData.amount);
      setValue("bank", localStorageData.bank);
      setValue("accountNumber", localStorageData.accountNumber);
      setValue("fullName", localStorageData.fullName);
      setValue("total", localStorageData.total);
      setValue("status", localStorageData.status);
    }
  }, [localStorageData, setValue]);

  return (
    <>
      <TransactionList
        setListTransaction={setListTransaction}
        listTransaction={listTransaction}
      />

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
