import { useMemo } from "react";
import { SiLazyvim } from "react-icons/si";

import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { useTodoListStore } from "../store/useTodoListStore";

export const TodoList = () => {
  const { todos, getCompletedTodos, getTotalTodos } = useTodoListStore();

  const shortedTodos = useMemo(() => todos.sort((a, b) => a.completed - b.completed), [todos]);

  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">Todo List :</h1>
        <span className="text-xl font-bold">{`${
          getCompletedTodos().length
        }/${getTotalTodos()}`}</span>
      </div>
      <hr className="border-2 mb-3 mt-1" />
      <TodoForm />

      <div>
        {shortedTodos.length === 0 ? (
          <div className="w-full h-[260px] bg-white flex justify-center items-center mt-3 rounded-md p-4 text-lg font-bold shadow-[3px_3px_0_0_rgba(0,0,0,1)] border-[3px] border-black">
            <div className="flex justify-center flex-col items-center gap-2">
              <SiLazyvim className="size-16" />
              <span className="text-xl">Tidak ada tugas, Waktunya bersantai</span>
            </div>
          </div>
        ) : (
          shortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          ))
        )}
      </div>
    </section>
  );
};
