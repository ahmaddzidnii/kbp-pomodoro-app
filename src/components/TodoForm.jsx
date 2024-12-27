import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";

import { Button } from "./Button";
import { useTodoListStore } from "../store/useTodoListStore";

export const TodoForm = () => {
  const [description, setDescription] = useState("");

  const { addTodo } = useTodoListStore();

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (!description.trim()) {
      toast.error("Tugas tidak boleh kosong");
      return;
    }
    const todo = {
      id: new Date().getTime(),
      description,
      completed: false,
    };
    addTodo(todo);
    toast.success("Tugas berhasil ditambahkan");
    setDescription("");
  };

  return (
    <form onSubmit={handleAddTodo} className="flex">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        id="input-todo"
        placeholder="Mau nugas apa..."
        className="w-full rounded-e-none border-[3px] border-black p-4 text-lg font-bold placeholder-muted-foreground shadow-[3px_3px_0_0_rgba(0,0,0,1)] focus:outline-none focus:ring-1 focus:ring-black"
      />
      <Button type="submit" className="rounded-s-none">
        <FaPlus className="size-5" />
      </Button>
    </form>
  );
};
