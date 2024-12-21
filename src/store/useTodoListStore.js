import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useTodoListStore = create(
  persist(
    (set, get) => ({
      todos: [],

      addTodo: (todo) => {
        set((state) => ({
          todos: [...state.todos, todo],
        }));
      },

      removeTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },

      updateTodo: (id, description) => {
        set((state) => ({
          todos: state.todos.map((todo) => (todo.id === id ? { ...todo, description } : todo)),
        }));
      },

      getTotalTodos: () => {
        return get().todos.length;
      },

      getCompletedTodos: () => {
        return get().todos.filter((todo) => todo.completed);
      },
    }),
    {
      name: "todo-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ todos: state.todos }),
    }
  )
);
