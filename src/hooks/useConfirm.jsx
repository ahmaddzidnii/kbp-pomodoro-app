import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

import { Button } from "../components/Button";

export const useConfirm = (
  title = "Apakah anda yakin?",
  message = "Data yang dihapus tidak dapat dikembalikan?",
  onConfirm,
  onCancel,
) => {
  const [promise, setPromise] = useState(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
    if (onCancel) {
      onCancel();
    }
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
    if (onConfirm) {
      onConfirm();
    }
  };

  const ModalConfirm = () => {
    return (
      <Modal isOpen={promise !== null} onClose={handleCancel}>
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleConfirm} variant="error">
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return [ModalConfirm, confirm];
};
