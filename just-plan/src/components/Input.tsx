import * as React from "react";

import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

const inputVariants = cva(
  "flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        showMoney:
          "bg-ourGreen/60 pl-10 focus-visible:ring-0 focus-visible:ring-offset-0 text-xs -webkit-appearance-none ",
        totalMoney:
          "border-2 border-ourGreen/60 pl-10 focus-visible:ring-0 focus-visible:ring-offset-0 text-xs -webkit-appearance-none ",
        detailMoney:
          "border-2 border-ourGreen/60 pl-20 text-right focus-visible:ring-0 focus-visible:ring-offset-0 text-xs -webkit-appearance-none ",
      },
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
