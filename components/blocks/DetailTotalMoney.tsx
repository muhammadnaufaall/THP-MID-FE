import { FormInputData } from "@/types/FormInputDataType";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import FormSkeleton from "../loading/FormSkeleton";

type DetailTotalMoneyProps = {
  selectedCountry: string;
  selectedRate: number;
};

const serviceRadioOptions = [
  { value: "Bank Transfer", label: "Bank Transfer" },
  { value: "Cash Pickup", label: "Cash Pickup" },
];

const DetailTotalMoney: React.FC<DetailTotalMoneyProps> = ({
  selectedCountry,
  selectedRate,
}) => {
  const [loadingBlock, setLoadingBlock] = useState<boolean>(false);

  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext<FormInputData>();

  const countTotalSend = (country: string, rate: number) => {
    const amount = watch("amount");
    const totalSend = amount * rate;
    return `${country} ${totalSend}`;
  };

  useEffect(() => {
    if (watch("destinationCountry") || watch("amount")) {
      setLoadingBlock(true);
      setTimeout(() => {
        setLoadingBlock(false);
      }, 500);
    }
  }, [watch("destinationCountry"), watch("amount")]);

  const countTotalPay = () => {
    const amount: number = watch("amount");
    const totalPay =
      amount + (watch("service") === "Bank Transfer" ? 35_000 : 5_000);
    return (
      <NumericFormat
        value={totalPay}
        displayType={"text"}
        thousandSeparator={"."}
        decimalSeparator=","
        prefix={"IDR "}
      />
    );
  };

  return (
    <>
      {loadingBlock ? (
        <div className="mt-4">
          <FormSkeleton quantity={3} />
        </div>
      ) : (
        <Box boxShadow="md" p="6" mt={"8"} rounded="md" bg="white">
          <Flex rounded="xl" boxShadow="xs" bg="white" p={3}>
            <Box flex="1" textAlign="left">
              <p className="text-sm font-semibold text-gray-900">
                The recipient will get :
              </p>
            </Box>
            <Box flex="1" textAlign="right">
              <p className="text-sm font-semibold text-gray-900">
                {countTotalSend(selectedCountry, selectedRate)}
              </p>
            </Box>
          </Flex>
          <FormControl mt={4} isInvalid={!!errors.destinationCountry}>
            <FormLabel>Service</FormLabel>
            <Controller
              name="service"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} defaultValue={watch("service")}>
                  <Stack direction="row">
                    {serviceRadioOptions.map((option) => (
                      <Radio value={option.value}>{option.label}</Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              )}
            />
            <FormErrorMessage>
              {errors.service && errors.service.message}
            </FormErrorMessage>
          </FormControl>
          <Flex mt={6} p={3}>
            <Box flex="1" textAlign="left">
              <p className="text-sm text-gray-400">Rate Service :</p>
            </Box>
            <Box flex="1" textAlign="right">
              <p className="text-sm text-gray-400">
                {watch("service") === "Bank Transfer" ? (
                  <NumericFormat
                    value={35_000}
                    displayType={"text"}
                    thousandSeparator={"."}
                    decimalSeparator=","
                    prefix={"IDR "}
                  />
                ) : (
                  <NumericFormat
                    value={5_000}
                    displayType={"text"}
                    thousandSeparator={"."}
                    decimalSeparator=","
                    prefix={"IDR "}
                  />
                )}
              </p>
            </Box>
          </Flex>
          <Flex rounded="xl" boxShadow="xs" bg="white" p={3}>
            <Box flex="1" textAlign="left">
              <p className="text-sm font-semibold text-gray-900">
                The money you will pay :
              </p>
            </Box>
            <Box flex="1" textAlign="right">
              <p className="text-sm font-semibold text-gray-900">
                {countTotalPay()}
              </p>
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default DetailTotalMoney;
