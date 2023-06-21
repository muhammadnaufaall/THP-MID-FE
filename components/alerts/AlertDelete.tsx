import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { useRef } from "react";

type AlertDeleteProps = {
  onClose: () => void;
  isOpen: boolean;
  onConfirm: () => void;
  titleAlert: string;
  descriptionAlert: string;
  isLoading: boolean;
};

const AlertDelete: React.FC<AlertDeleteProps> = ({
  onClose,
  isOpen,
  onConfirm,
  descriptionAlert,
  titleAlert,
  isLoading,
}) => {
  const leastDestructiveRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <AlertDialog
        motionPreset="slideInRight"
        onClose={onClose}
        isOpen={isOpen}
        leastDestructiveRef={leastDestructiveRef}
        isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{titleAlert}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{descriptionAlert}</AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>No</Button>
            <Button
              isLoading={isLoading}
              onClick={onConfirm}
              colorScheme="red"
              ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertDelete;
