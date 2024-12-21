import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";

import { Button } from "./Button";
import { useTodoListStore } from "../store/useTodoListStore";

export const ModalEditTodo = ({ open, onOpen, onSuccses, idTodo, descriptionTodo }) => {
  const [description, setDescription] = useState(descriptionTodo);
  const { updateTodo } = useTodoListStore();

  const handleEditTodo = () => {
    if (!description.trim()) {
      toast.error("Tugas tidak boleh kosong");
      return;
    }

    if (description === descriptionTodo) {
      return;
    }

    updateTodo(idTodo, description);

    onSuccses && onSuccses();
    toast.success("Tugas berhasil diubah");
  };

  useEffect(() => {
    if (open) {
      setDescription(descriptionTodo);
    }
  }, [open, descriptionTodo]);

  return (
    <>
      <Modal
        isOpen={open}
        onOpenChange={(open) => onOpen && onOpen(open)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Tugas</ModalHeader>
              <ModalBody>
                <input
                  type="text"
                  autoFocus
                  placeholder="Mau nugas apa..."
                  className="w-full rounded-md p-4 text-lg font-bold shadow-[3px_3px_0_0_rgba(0,0,0,1)] border-[3px] border-black placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-black"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Batal</Button>
                <Button onClick={handleEditTodo}>Ubah</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
