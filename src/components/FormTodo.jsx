import { FaPlus } from "react-icons/fa6";
import { Button } from "./Button";
export const FormTodo = () => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="relative"
    >
      <input
        type="text"
        id="neon-input"
        placeholder="Mau nugas apa..."
        className="w-full rounded-md p-4 text-lg font-bold shadow-[3px_3px_0_0_rgba(0,0,0,1)] border-[3px] border-black placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-black"
      />
      <Button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2"
      >
        <FaPlus className="size-5" />
      </Button>
    </form>
  );
};
