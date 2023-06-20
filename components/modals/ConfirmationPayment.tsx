import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DetailTotalMoney from "../blocks/DetailTotalMoney";
import { useFetch } from "@/hooks/useFetch";
import { useFormContext } from "react-hook-form";
import { FormInputData } from "@/types/FormInputDataType";
import FormSkeleton from "../loading/FormSkeleton";
import { NumericFormat } from "react-number-format";
import TotalPay from "../blocks/TotalPay";
import DetailSender from "../blocks/DetailSender";

type ConfirmationPaymentProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};

const ConfirmationPayment: React.FC<ConfirmationPaymentProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}) => {
  const [uniqueCode] = useState<number>(Math.floor(Math.random() * 100));
  const { watch } = useFormContext<FormInputData>();

  const urlRate =
    "https://v6.exchangerate-api.com/v6/bfd760190100fa938e1ae461/latest/IDR";

  const { data: apiResponse, isLoading } = useFetch("getRateExchange", urlRate);

  const [conversionRates, setConversionRates] = useState<
    Record<string, number>
  >({});

  const selectedCountry = watch("destinationCountry");
  const selectedRate = conversionRates[selectedCountry] || 0;

  useEffect(() => {
    if (!isLoading) {
      setConversionRates(apiResponse.conversion_rates);
    }
  }, [isLoading, apiResponse]);

  const bankName = watch("bank");
  const accountNumber = watch("accountNumber");
  const fullName = watch("fullName");

  return (
    <div>
      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxH={"xl"}>
          <ModalHeader>Detail Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY={"auto"}>
            {isLoading ? (
              <FormSkeleton quantity={3} />
            ) : (
              <div className="flex flex-col">
                <DetailSender
                  accountNumber={accountNumber}
                  bankName={bankName}
                  fullName={fullName}
                />
                <DetailTotalMoney
                  selectedCountry={selectedCountry}
                  selectedRate={selectedRate}
                />
                <TotalPay uniqueCode={uniqueCode} />
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isSubmitting}
              mt={4}
              isDisabled={isSubmitting}
              colorScheme="blue"
              onClick={() => onSubmit()}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ConfirmationPayment;
