import { FaGear } from "react-icons/fa6";
import { ImStatsDots } from "react-icons/im";

import { Logo } from "./Logo";
import { Button } from "./Button";
import { useModalStats } from "../store/useModalStats";
import { useModalOptions } from "../store/useModalOptions";

export const Navbar = () => {
  const { onOpen } = useModalOptions();
  const { onOpen: onOpenModalStats } = useModalStats();
  return (
    <header className="flex justify-between pt-3 items-center w-full h-14">
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
