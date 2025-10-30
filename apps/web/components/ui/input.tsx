import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
  name,
  label,
  className,
  type,
  labelClassName,
  inputClassName,
  ...props
}: React.ComponentProps<"input"> & {
  label: string;
  labelClassName?: string;
  inputClassName?: string;
}) {
  return (
    <div
      className={cn(
        "bg-input flex h-14 flex-col items-start px-4 py-2",
        className,
      )}
    >
      <label
        htmlFor={name}
        className={cn(
          "text-muted-foreground text-[0.75rem] leading-4",
          labelClassName,
        )}
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        data-slot="input"
        className={cn(
          "h-6 border-none bg-transparent text-base outline-none",
          inputClassName,
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
