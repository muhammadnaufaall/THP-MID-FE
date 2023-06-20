import { FormInputData } from "@/types/FormInputDataType";
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { TbReportAnalytics } from "react-icons/tb";

type TransactionListProps = {
  listTransaction: FormInputData[];
};

const TransactionList: React.FC<TransactionListProps> = ({
  listTransaction,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box mx="auto" maxW={"container.sm"}>
        <div
          onClick={onOpen}
          className="relative flex justify-end mt-4 cursor-pointer">
          <div className="p-1 bg-blue-500 rounded-full">
            <TbReportAnalytics className="w-6 h-6 text-white" />
          </div>
          <div className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
            {listTransaction.length}
          </div>
        </div>
      </Box>
      <div>
        <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxH={"xl"}>
            <ModalHeader>Transaction's History</ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY={"auto"}>
              <div className="flex flex-col">
                {listTransaction.map((transaction, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-3 mb-3 bg-white rounded-xl">
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-600">Sender :</p>
                        <p className="text-sm text-gray-600">Total :</p>
                        <p className="text-sm text-gray-600">Status :</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-600">
                          {transaction.fullName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {transaction.total}
                        </p>
                        <p className="text-sm text-gray-600">
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default TransactionList;
