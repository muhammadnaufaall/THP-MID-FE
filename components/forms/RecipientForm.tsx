import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FormInputData } from "@/types/FormInputDataType";

const RecipientForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormInputData>();

  return (
    <>
      <FormControl mt={4} isInvalid={!!errors.bank}>
        <FormLabel>Bank</FormLabel>
        <Input
          {...register("bank", { required: "Bank is required" })}
          variant="outline"
        />
        <FormErrorMessage>
          {errors.bank && errors.bank.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt={4} isInvalid={!!errors.accountNumber}>
        <FormLabel>Account Number</FormLabel>
        <Input
          {...register("accountNumber", {
            required: "Account Number is required",
          })}
          variant="outline"
        />
        <FormErrorMessage>
          {errors.accountNumber && errors.accountNumber.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt={4} isInvalid={!!errors.fullName}>
        <FormLabel>Full Name</FormLabel>
        <Input
          {...register("fullName", { required: "Full Name is required" })}
          variant="outline"
        />
        <FormErrorMessage>
          {errors.fullName && errors.fullName.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default RecipientForm;
