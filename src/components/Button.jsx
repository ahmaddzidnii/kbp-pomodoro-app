import { forwardRef } from "react";

import { cn } from "../utils/cn";

export const Button = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex justify-center items-center gap-x-2 bg-[#307BA9] text-foreground rounded-md font-bold px-4 py-2 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-[#307BA9]/80",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
