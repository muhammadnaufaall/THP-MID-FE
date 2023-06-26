import React, { Suspense, lazy } from "react";

import { Box, useDisclosure } from "@chakra-ui/react";

import { TbReportAnalytics } from "react-icons/tb";

import { FormInputData } from "@/types/FormInputDataType";
import dynamic from "next/dynamic";

const HistoryModal = dynamic(() => import("../modals/HistoryModal"));

type TransactionListProps = {
  listTransaction: FormInputData[];
  setListTransaction: React.Dispatch<React.SetStateAction<FormInputData[]>>;
};

const TransactionList: React.FC<TransactionListProps> = ({
  listTransaction,
  setListTransaction,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box mx="auto" maxW={"container.sm"}>
        <div className="relative flex justify-end mt-4">
          <div
            onClick={onOpen}
            className="p-1 bg-blue-500 rounded-full cursor-pointer">
            <TbReportAnalytics className="w-6 h-6 text-white" />
          </div>
          <div className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
            {listTransaction.length}
          </div>
        </div>
      </Box>
      <HistoryModal
        isOpen={isOpen}
        onClose={onClose}
        listTransaction={listTransaction}
        setListTransaction={setListTransaction}
      />
    </>
  );
};

export default TransactionList;
