import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
  name,
  label,
  className,
  type,
  ...props
}: React.ComponentProps<"input"> & {
  label: string;
}) {
  return (
    <div className="bg-input flex h-14 flex-col items-start px-4 py-2">
      <label
        htmlFor={name}
        className="text-muted-foreground text-[0.75rem] leading-4"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        data-slot="input"
        className="h-6 border-none bg-transparent text-base outline-none"
        {...props}
      />
    </div>
  );
}

export { Input };
