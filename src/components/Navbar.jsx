import { FaGear } from "react-icons/fa6";

import { useModalOptions } from "../store/useModalOptions";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { ImStatsDots } from "react-icons/im";
import { useModalStats } from "../store/useModalStats";

export const Navbar = () => {
  const { onOpen } = useModalOptions();
  const { onOpen: onOpenModalStats } = useModalStats();
  return (
    <header className="flex justify-between items-center w-full py-10 h-14">
      <Logo />
      <div className="space-x-3">
        <Button onClick={onOpenModalStats}>
          <ImStatsDots className="size-5" />
          <span className="hidden md:block select-none">Stats</span>
        </Button>
        <Button onClick={onOpen}>
          <FaGear className="size-5" />
          <span className="hidden md:block select-none">Settings</span>
        </Button>
      </div>
    </header>
  );
};
