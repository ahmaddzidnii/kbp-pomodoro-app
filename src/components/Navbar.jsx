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
    <header className="flex h-14 w-full items-center justify-between pt-3">
      <Logo />
      <div className="space-x-3">
        <Button onClick={onOpenModalStats}>
          <ImStatsDots className="size-5" />
          <span className="hidden select-none md:block">Stats</span>
        </Button>
        <Button onClick={onOpen}>
          <FaGear className="size-5" />
          <span className="hidden select-none md:block">Settings</span>
        </Button>
      </div>
    </header>
  );
};
