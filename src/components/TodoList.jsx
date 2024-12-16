import { IoIosMore } from "react-icons/io";
import { Button } from "./Button";
import { FormTodo } from "./FormTodo";
import { cn } from "../utils/cn";

const todos = [
  {
    id: 1,
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias natus assumenda voluptate?",
    completed: false,
  },
  {
    id: 2,
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias natus assumenda voluptate?",
    completed: false,
  },
  {
    id: 3,
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias natus assumenda voluptate?",
    completed: false,
  },
  {
    id: 4,
    description: "madang",
    completed: true,
  },
];

const shortedTodos = todos.sort((a, b) => a.completed - b.completed);

export const TodoList = () => {
  return (
    <section className="max-w-lg mx-auto ">
      <h1 className="font-bold text-xl">Todo List :</h1>
      <hr className="border-2 mb-3 mt-1" />
      <FormTodo />
      <div>
        {shortedTodos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white border-2 flex gap-x-2 justify-between border-black p-3 rounded-lg mt-3 shadow-[3px_3px_0_0_rgba(0,0,0,1)]"
          >
            <div>
              <input
                id={todo.id}
                type="checkbox"
                value=""
                defaultChecked={todo.completed}
                className="w-6 h-6 text-green-600 bg-gray-100 border-gray-300 rounded-full"
              />
            </div>
            <p
              className={cn(
                "text-sm md:text-lg  flex-1 font-semibold",
                todo.completed && "line-through"
              )}
            >
              {todo.description}
            </p>
            <div>
              <Button className="w-8 h-8 p-0">
                <IoIosMore />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
