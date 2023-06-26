import React, { Suspense, lazy, useState } from "react";

import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { FormInputData } from "@/types/FormInputDataType";
import FormSkeleton from "../loading/FormSkeleton";
import cookie from "js-cookie";
import dynamic from "next/dynamic";

const CardHistory = dynamic(() => import("../cards/CardHistory"));
const AlertDelete = dynamic(() => import("../alerts/AlertDelete"));

type HistoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  listTransaction: FormInputData[];
  setListTransaction: React.Dispatch<React.SetStateAction<FormInputData[]>>;
};

const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  listTransaction,
  setListTransaction,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();

  const {
    onOpen: onOpenAlert,
    isOpen: isAlertOpen,
    onClose: onCLoseAlert,
  } = useDisclosure();

  const removeHistory = () => {
    setIsLoading(true);
    cookie.remove("listTransaction");
    setTimeout(() => {
      toast({
        title: "History Transaction Deleted.",
        description: "Now you have 0 transaction history.",
        status: "success",
        duration: 3000,
        isClosable: false,
      });
      setIsLoading(false);
      onClose();
      onCLoseAlert();
      setListTransaction([]);
    }, 1000);
  };

  return (
    <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pb={"4"} maxH={"xl"}>
        <ModalHeader>Transaction's History</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY={"auto"}>
          {listTransaction.length > 0 && (
            <Flex justify={"end"} mb={4}>
              <Text
                onClick={onOpenAlert}
                cursor={"pointer"}
                fontWeight={"semibold"}
                textColor={"red.400"}
                fontSize={"xs"}>
                Clear History
              </Text>
            </Flex>
          )}
          <Flex flexDir={"column"} gap={3}>
            {listTransaction.length === 0 && (
              <Text textAlign={"center"}>There's no transaction yet</Text>
            )}
            {listTransaction.map((transaction, index) => (
              <CardHistory
                key={index}
                amountTotal={transaction.amount}
                sender={transaction.fullName}
                status={transaction.status}
              />
            ))}
          </Flex>

          <AlertDelete
            isOpen={isAlertOpen}
            onClose={onCLoseAlert}
            onConfirm={removeHistory}
            isLoading={isLoading}
            descriptionAlert="Are you sure want to delete all your transaction history?"
            titleAlert="Delete History"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default HistoryModal;
