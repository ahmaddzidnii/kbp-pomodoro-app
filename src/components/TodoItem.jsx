import { useState } from "react";
import toast from "react-hot-toast";
import { Checkbox } from "@nextui-org/checkbox";
import { FaPencil, FaTrash } from "react-icons/fa6";

import { cn } from "../utils/cn";
import { Button } from "./Button";
import { ModalEditTodo } from "./ModalEditTodo";
import { useConfirm } from "../hooks/useConfirm";
import { useTodoListStore } from "../store/useTodoListStore";

export const TodoItem = ({ todo }) => {
  const { toggleTodo, removeTodo } = useTodoListStore();
  const [ModalConfirm, confirm] = useConfirm();

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

  const handleToggleTodo = (id) => {
    if (!id) return;
    toggleTodo(id);
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
      <div className="bg-white border-2 border-black p-3 rounded-lg mt-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
        <div className="flex gap-x-3">
          <div className="flex-shrink-0 pt-1">
            <Checkbox
              id={todo.id}
              type="checkbox"
              isSelected={todo.completed}
              size="lg"
              color="success"
              onValueChange={(isSelected) => handleToggleTodo(todo.id)}
            />
          </div>

          <div className="flex-1 min-w-0">
            <p
              className={cn(
                "text-sm md:text-lg font-semibold break-words",
                todo.completed && "line-through"
              )}
            >
              {todo.description}
            </p>
          </div>

          <div className="flex shrink-0 gap-x-2">
            <Button
              className="w-8 h-8 p-0"
              onClick={() => handleEditTodo(todo.id, todo.description)}
            >
              <FaPencil className="h-4 w-4" />
            </Button>
            <Button
              className="w-8 h-8 p-0"
              onClick={handleDeleteTodo}
            >
              <FaTrash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
