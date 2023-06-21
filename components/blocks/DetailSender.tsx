import React from "react";

import { Box, Flex, Text } from "@chakra-ui/react";

type DetailSenderProps = {
  bankName: string;
  accountNumber: string;
  fullName: string;
};

const DetailSender: React.FC<DetailSenderProps> = ({
  bankName,
  accountNumber,
  fullName,
}) => {
  return (
    <div>
      <Flex mt={6} p={3}>
        <Box flex="1" textAlign="left">
          <Text fontSize={"sm"} textColor={"gray.600"}>
            Bank Name :
          </Text>
        </Box>
        <Box flex="1" textAlign="right">
          <Text fontSize={"sm"} textColor={"gray.600"}>
            {bankName}
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
            {accountNumber}
          </Text>
        </Box>
      </Flex>
      <Flex p={3}>
        <Box flex="1" textAlign="left">
          <Text fontSize={"sm"} textColor={"gray.600"}>
            Full Name :
          </Text>
        </Box>
        <Box flex="1" textAlign="right">
          <Text fontSize={"sm"} textColor={"gray.600"}>
            {fullName}
          </Text>
        </Box>
      </Flex>
    </div>
  );
};

export default DetailSender;
