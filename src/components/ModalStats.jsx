import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

import { HeatMapChart } from "./GithubHeatmap";
import { useModalStats } from "../store/useModalStats";

export const ModalStats = () => {
  const { isOpen, onClose } = useModalStats();

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      backdrop="blur"
      size="3xl"
      isOpen={isOpen}
      onClose={handleClose}
      scrollBehavior="inside"
    >
      <ModalContent>
        <>
          <ModalHeader>Graph Keaktifan</ModalHeader>
          <ModalBody className="gap-0">
            <HeatMapChart />
            <p className="text-sm text-slate-400">
              *Aktivitas dihitung dari jumlah berapa kali menyelesaikan todo
              (tugas).
            </p>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};
