import { FaGear } from "react-icons/fa6";
import { Button } from "./Button";
import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <header className="flex justify-between items-center w-full py-10 h-14">
      <Logo />
      <Button>
        <FaGear className="size-5" />
        <span className="hidden md:block">Settings</span>
      </Button>
    </header>
  );
};
