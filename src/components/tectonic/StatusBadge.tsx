import * as React from "react";

import { cn } from "@/lib/utils";

type StatusBadgeProps = React.HTMLAttributes<HTMLSpanElement>;

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, ...props }, ref) => {
    return (
      <span ref={ref} className={cn("status-badge", className)} {...props} />
    );
  }
);

StatusBadge.displayName = "StatusBadge";

export { StatusBadge };
