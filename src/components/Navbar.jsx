import { FaGear } from "react-icons/fa6";

import { useModalOptions } from "../store/useModalOptions";
import { Button } from "./Button";
import { Logo } from "./Logo";

export const Navbar = () => {
  const { onOpen } = useModalOptions();
  return (
    <header className="flex justify-between items-center w-full py-10 h-14">
      <Logo />
      <Button onClick={onOpen}>
        <FaGear className="size-5" />
        <span className="hidden md:block select-none">Settings</span>
      </Button>
    </header>
  );
};
