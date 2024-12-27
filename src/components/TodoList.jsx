import { useMemo } from "react";
import { SiLazyvim } from "react-icons/si";

import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { useTodoListStore } from "../store/useTodoListStore";

export const TodoList = () => {
  const { todos, getCompletedTodos, getTotalTodos } = useTodoListStore();

  const shortedTodos = useMemo(
    () => todos.sort((a, b) => a.completed - b.completed),
    [todos],
  );

  return (
    <section className="rounded-lg bg-white p-5 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
      <div className="flex items-center justify-between">
        <div className="mb-3 flex items-center gap-2">
          <div
            className="aspect-square size-10 rounded-full bg-cover bg-center bg-no-repeat p-4"
            style={{
              backgroundImage: `url("/assets/img/todo-icon.png")`,
            }}
          />
          <h1 className="text-xl font-bold">Todo List :</h1>
        </div>
        <span className="text-xl font-bold">{`${
          getCompletedTodos().length
        }/${getTotalTodos()}`}</span>
      </div>

      <TodoForm />

      <div>
        {shortedTodos.length === 0 ? (
          <div className="mt-3 flex h-[260px] w-full items-center justify-center rounded-md border-[3px] border-black bg-white p-4 text-lg font-bold shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
            <div className="flex flex-col items-center justify-center gap-2">
              <SiLazyvim className="size-16" />
              <span className="text-center text-xl">
                Tidak ada tugas, Waktunya bersantai
              </span>
            </div>
          </div>
        ) : (
          shortedTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
    </section>
  );
};
