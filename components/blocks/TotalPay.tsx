import { FormInputData } from "@/types/FormInputDataType";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

type TotalPayProps = {
  uniqueCode: number;
};

const TotalPay: React.FC<TotalPayProps> = ({ uniqueCode }) => {
  const { watch } = useFormContext<FormInputData>();

  return (
    <div className="mt-4">
      <Flex p={3}>
        <Box flex="1" textAlign="left">
          <p className="text-sm text-gray-600">Send To :</p>
        </Box>
        <Box flex="1" textAlign="right">
          <p className="text-sm text-gray-600">BCA</p>
        </Box>
      </Flex>
      <Flex p={3}>
        <Box flex="1" textAlign="left">
          <p className="text-sm text-gray-600">Account Number :</p>
        </Box>
        <Box flex="1" textAlign="right">
          <p className="text-sm text-gray-600">09718293463</p>
        </Box>
      </Flex>
      <Flex p={3}>
        <Box flex="1" textAlign="left">
          <p className="text-sm text-gray-900">Total :</p>
        </Box>
        <Box flex="1" textAlign="right">
          <p className="text-sm text-gray-900">
            {
              <NumericFormat
                value={
                  watch("amount") +
                  (watch("service") === "Bank Transfer" ? 35_000 : 5_000)
                }
                displayType={"text"}
                thousandSeparator={"."}
                decimalSeparator=","
                prefix={"IDR "}
              />
            }
          </p>
        </Box>
      </Flex>
      <Flex p={3}>
        <Box flex="1" textAlign="left">
          <p className="text-sm font-semibold text-gray-900">Unique Code :</p>
        </Box>
        <Box flex="1" textAlign="right">
          <p className="text-sm font-semibold text-gray-900">
            {
              <NumericFormat
                value={uniqueCode}
                displayType={"text"}
                thousandSeparator={"."}
                decimalSeparator=","
                prefix={"IDR "}
              />
            }
          </p>
        </Box>
      </Flex>
      <Flex rounded="xl" boxShadow="xs" bg="white" p={3}>
        <Box flex="1" textAlign="left">
          <p className="text-sm font-semibold text-green-600">
            Total Pay <span className="text-xs">(Total - Unique Code)</span> :
          </p>
        </Box>
        <Box flex="1" textAlign="right">
          <p className="text-sm font-semibold text-green-600">
            {
              <NumericFormat
                value={
                  watch("amount") +
                  (watch("service") === "Bank Transfer" ? 35_000 : 5_000) -
                  uniqueCode
                }
                displayType={"text"}
                thousandSeparator={"."}
                decimalSeparator=","
                prefix={"IDR "}
              />
            }
          </p>
        </Box>
      </Flex>
    </div>
  );
};

export default TotalPay;
