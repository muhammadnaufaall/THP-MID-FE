import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FormInputData } from "@/types/FormInputDataType";

const AmountForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormInputData>();

  return (
    <>
      <FormControl mt={4} isInvalid={!!errors.destinationCountry}>
        <FormLabel>Destination Country</FormLabel>
        <Input
          {...register("destinationCountry", {
            required: "Destination Country is required",
          })}
          variant="outline"
        />
        <FormErrorMessage>
          {errors.destinationCountry && errors.destinationCountry.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt={4} isInvalid={!!errors.service}>
        <FormLabel>Service</FormLabel>
        <Input
          {...register("service", { required: "Service is required" })}
          variant="outline"
        />
        <FormErrorMessage>
          {errors.service && errors.service.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt={4} isInvalid={!!errors.amount}>
        <FormLabel>Amount</FormLabel>
        <Input
          {...register("amount", { required: "Amount is required" })}
          variant="outline"
        />
        <FormErrorMessage>
          {errors.amount && errors.amount.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default AmountForm;
