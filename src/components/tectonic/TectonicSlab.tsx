import * as React from "react";

import { cn } from "@/lib/utils";

type TectonicSlabProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "dark";
};

const TectonicSlab = React.forwardRef<HTMLDivElement, TectonicSlabProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          variant === "dark" ? "tectonic-slab-dark" : "tectonic-slab",
          className
        )}
        {...props}
      />
    );
  }
);

TectonicSlab.displayName = "TectonicSlab";

export { TectonicSlab };
