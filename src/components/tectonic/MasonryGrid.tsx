import * as React from "react";

import { cn } from "@/lib/utils";

type MasonryGridProps = React.HTMLAttributes<HTMLDivElement>;

const MasonryGrid = React.forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("masonry-grid", className)} {...props} />;
  }
);

MasonryGrid.displayName = "MasonryGrid";

export { MasonryGrid };
