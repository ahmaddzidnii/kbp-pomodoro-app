import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";

import { useModalStats } from "../store/useModalStats";
import { HeatMapChart } from "./GithubHeatmap";

export const ModalStats = () => {
  const { isOpen, onClose } = useModalStats();

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      backdrop="blur"
      size="3xl"
      placement="center"
      isOpen={isOpen}
      onClose={handleClose}
      scrollBehavior="inside"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Statistik Graph</ModalHeader>
          <ModalBody className="space-y-5">
            <HeatMapChart />
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};
