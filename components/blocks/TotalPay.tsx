import React from "react";

import { Box, Flex, Text } from "@chakra-ui/react";

import { useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { FormInputData } from "@/types/FormInputDataType";

type TotalPayProps = {
  uniqueCode: number;
};

const TotalPay: React.FC<TotalPayProps> = ({ uniqueCode }) => {
  const { watch } = useFormContext<FormInputData>();

  return (
    <div className="mt-4">
      <Flex p={3}>
        <Box flex="1" textAlign="left">
          <Text fontSize={"sm"} textColor={"gray.600"}>
            Send To :
          </Text>
        </Box>
        <Box flex="1" textAlign="right">
          <Text fontSize={"sm"} textColor={"gray.600"}>
            BCA
          </Text>
        </Box>
      </Flex>
      <Flex p={3}>
        <Box flex="1" textAlign="left">
          <Text fontSize={"sm"} textColor={"gray.600"}>
            Account Number :
          </Text>
        </Box>
        <Box flex="1" textAlign="right">
          <Text fontSize={"sm"} textColor={"gray.600"}>
            0289340273489
          </Text>
        </Box>
      </Flex>
      <Flex p={3}>
        <Box flex="1" textAlign="left">
          <Text fontSize={"sm"} textColor={"gray.900"}>
            Total :
          </Text>
        </Box>
        <Box flex="1" textAlign="right">
          <Text fontSize={"sm"} textColor={"gray.900"}>
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
          </Text>
        </Box>
      </Flex>
      <Flex p={3}>
        <Box flex="1" textAlign="left">
          <Text fontWeight={"semibold"} fontSize={"sm"} textColor={"gray.900"}>
            Unique Code :
          </Text>
        </Box>
        <Box flex="1" textAlign="right">
          <Text fontWeight={"semibold"} fontSize={"sm"} textColor={"gray.900"}>
            {
              <NumericFormat
                value={uniqueCode}
                displayType={"text"}
                thousandSeparator={"."}
                decimalSeparator=","
                prefix={"IDR "}
              />
            }
          </Text>
        </Box>
      </Flex>
      <Flex alignItems={"center"} rounded="xl" boxShadow="xs" bg="white" p={3}>
        <Box flex="1" textAlign="left">
          <Text fontWeight={"semibold"} fontSize={"sm"} textColor={"green.600"}>
            Total Pay <Text fontSize={"2xs"}>(Total - Unique Code) :</Text>
          </Text>
        </Box>
        <Box flex="1" textAlign="right">
          <Text fontWeight={"semibold"} fontSize={"sm"} textColor={"green.600"}>
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
          </Text>
        </Box>
      </Flex>
    </div>
  );
};

export default TotalPay;
