import React from "react";

import { Badge, Box, Card, CardBody, Flex, Text } from "@chakra-ui/react";

import { NumericFormat } from "react-number-format";

type CardHistoryProps = {
  amountTotal: number;
  sender: string;
  status: string;
};

const CardHistory: React.FC<CardHistoryProps> = ({
  amountTotal,
  sender,
  status,
}) => {
  return (
    <Card>
      <CardBody>
        <Flex>
          <Box ml="3">
            <Flex alignItems={"center"}>
              <Text fontSize="sm">
                Amount money :{" "}
                <Text as={"span"} fontSize="md" fontWeight={"bold"}>
                  <NumericFormat
                    value={amountTotal}
                    displayType={"text"}
                    thousandSeparator={"."}
                    decimalSeparator=","
                    prefix={"IDR "}
                  />
                </Text>
              </Text>

              <Badge
                ml="8"
                colorScheme={`${status === "Pending" ? "yellow" : "green"}`}>
                {status}
              </Badge>
            </Flex>
            <Text fontSize="sm">Sender : {sender}</Text>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CardHistory;
