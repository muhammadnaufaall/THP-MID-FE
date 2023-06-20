import { Box, Flex } from "@chakra-ui/react";
import React from "react";

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
          <p className="text-sm text-gray-600">Bank Name :</p>
        </Box>
        <Box flex="1" textAlign="right">
          <p className="text-sm text-gray-600">{bankName}</p>
        </Box>
      </Flex>
      <Flex p={3}>
        <Box flex="1" textAlign="left">
          <p className="text-sm text-gray-600">Account Number :</p>
        </Box>
        <Box flex="1" textAlign="right">
          <p className="text-sm text-gray-600">{accountNumber}</p>
        </Box>
      </Flex>
      <Flex p={3}>
        <Box flex="1" textAlign="left">
          <p className="text-sm text-gray-600">Full Name :</p>
        </Box>
        <Box flex="1" textAlign="right">
          <p className="text-sm text-gray-600">{fullName}</p>
        </Box>
      </Flex>
    </div>
  );
};

export default DetailSender;
