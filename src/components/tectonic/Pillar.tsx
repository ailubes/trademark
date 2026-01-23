import * as React from "react";

import { cn } from "@/lib/utils";

type PillarProps = React.HTMLAttributes<HTMLDivElement>;

const Pillar = React.forwardRef<HTMLDivElement, PillarProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("pillar", className)} {...props} />;
  }
);

Pillar.displayName = "Pillar";

export { Pillar };
