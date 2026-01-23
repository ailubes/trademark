import * as React from "react";

import { cn } from "@/lib/utils";

type SearchInputGroupProps = React.ComponentPropsWithoutRef<"form"> & {
  placeholder?: string;
  buttonLabel?: string;
};

const SearchInputGroup = React.forwardRef<HTMLFormElement, SearchInputGroupProps>(
  (
    {
      className,
      placeholder = "Введіть назву торгової марки...",
      buttonLabel = "Перевірити",
      ...props
    },
    ref
  ) => {
    return (
      <form
        ref={ref}
        className={cn("search-input-group", className)}
        {...props}
      >
        <input
          name="q"
          type="text"
          placeholder={placeholder}
          className="serif"
          aria-label="Пошуковий запит торгової марки"
        />
        <button type="submit" className="search-btn">
          {buttonLabel}
        </button>
      </form>
    );
  }
);

SearchInputGroup.displayName = "SearchInputGroup";

export { SearchInputGroup };
