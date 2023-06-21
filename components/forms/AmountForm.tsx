import React, { useEffect, useState, lazy, Suspense } from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";

import { Controller, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import FormSkeleton from "../loading/FormSkeleton";

import useFetch from "@/hooks/useFetch";
import { FormInputData } from "@/types/FormInputDataType";

const DetailTotalMoney = lazy(() => import("../blocks/DetailTotalMoney"));

const AmountForm = () => {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormInputData>();

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

  if (isLoading) {
    return <FormSkeleton quantity={2} />;
  }

  return (
    <>
      <FormControl mt={4} isInvalid={!!errors.amount}>
        <FormLabel>Amount</FormLabel>
        <Controller
          name="amount"
          control={control}
          render={() => (
            <NumericFormat
              value={watch("amount")}
              displayType="input"
              prefix="IDR "
              decimalSeparator=","
              thousandSeparator="."
              allowNegative={false}
              {...register("amount", { required: "Amount is required" })}
              className="block w-full p-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded focus:ring-blue-500 focus:border-blue-500"
              onValueChange={(values) => {
                setValue("amount", +values.value);
              }}
            />
          )}
        />
        <FormErrorMessage>
          {errors.amount && errors.amount.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt={4} isInvalid={!!errors.destinationCountry}>
        <FormLabel>Destination Country Currency</FormLabel>
        <Controller
          name="destinationCountry"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Select Destination Country Currency"
              {...field}
              {...register("destinationCountry", {
                required: "Destination Country Currency is required",
              })}>
              {Object.entries(conversionRates).map(([currency, rate]) => (
                <option key={currency} value={currency}>
                  {currency} - {rate}
                </option>
              ))}
            </Select>
          )}
        />
        <FormErrorMessage>
          {errors.destinationCountry && errors.destinationCountry.message}
        </FormErrorMessage>
      </FormControl>
      {selectedCountry && watch("amount") ? (
        <Suspense fallback={<FormSkeleton quantity={2} />}>
          <DetailTotalMoney
            selectedCountry={selectedCountry}
            selectedRate={selectedRate}
          />
        </Suspense>
      ) : null}
    </>
  );
};

export default AmountForm;
