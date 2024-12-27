import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useFirstMountState } from "react-use";
import { Checkbox } from "@nextui-org/checkbox";
import { FaPencil, FaTrash } from "react-icons/fa6";

import { cn } from "../utils/cn";
import { Button } from "./Button";
import { ModalEditTodo } from "./ModalEditTodo";
import { useConfirm } from "../hooks/useConfirm";
import { useTodoListStore } from "../store/useTodoListStore";
import useContributionStore from "../store/useContributionsStore";

export const TodoItem = ({ todo }) => {
  const { toggleTodo, removeTodo } = useTodoListStore();
  const [ModalConfirm, confirm] = useConfirm();

  const isFirstMount = useFirstMountState();
  const { addContribution } = useContributionStore();

  const [stateEdit, setStateEdit] = useState({
    isEditing: false,
    id: null,
    description: "",
  });

  const handleEditTodo = (id, description) => {
    setStateEdit({
      isEditing: true,
      id,
      description,
    });
  };

  const handleToggleTodo = (id, isCompleted) => {
    if (!id) return;
    toggleTodo(id);
    // Jika tugas sebelumnya belum selesai dan sekarang menjadi selesai
    if (!isCompleted) {
      const today = new Date().toISOString().split("T")[0];

      // Tambahkan kontribusi untuk hari ini
      addContribution(today, 1);
    }
  };

  const handleDeleteTodo = async () => {
    const ok = await confirm();
    if (!ok) return;
    removeTodo(todo.id);
    toast.success("Tugas berhasil dihapus");
  };

  return (
    <>
      <ModalConfirm />
      <ModalEditTodo
        open={stateEdit.isEditing}
        idTodo={stateEdit.id}
        descriptionTodo={stateEdit.description}
        onOpen={(state) => {
          setStateEdit({
            ...stateEdit,
            isEditing: state,
          });
        }}
        onSuccses={() => {
          setStateEdit({
            ...stateEdit,
            isEditing: false,
          });
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        layout
        transition={{
          layout: {
            duration: 0.4,
            ease: "easeInOut",
          },
          duration: 0.4,
          ease: "easeInOut",
        }}
        className="mt-3 rounded-lg border-2 border-black bg-white p-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)]"
      >
        <div className="flex gap-x-3">
          <div className="flex-shrink-0 pt-1">
            <Checkbox
              id={todo.id}
              type="checkbox"
              isSelected={todo.completed}
              size="lg"
              color="success"
              onValueChange={(isSelected) =>
                handleToggleTodo(todo.id, todo.completed)
              }
            />
          </div>

          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "break-words text-sm font-semibold md:text-lg",
                todo.completed && "line-through",
              )}
            >
              {todo.description}
            </p>
          </div>

          <div className="flex shrink-0 gap-x-2">
            <Button
              className="h-8 w-8 p-0"
              onClick={() => handleEditTodo(todo.id, todo.description)}
            >
              <FaPencil className="h-4 w-4" />
            </Button>
            <Button
              className="h-8 w-8 border-black bg-red-500 p-0 text-white hover:bg-red-500/80"
              onClick={handleDeleteTodo}
            >
              <FaTrash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
