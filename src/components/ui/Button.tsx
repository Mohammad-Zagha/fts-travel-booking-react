import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex  shrink-0 items-center justify-center gap-1 cursor-pointer whitespace-nowrap text-md font-semilibold transition-all ease-in-out duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:active:scale-[0.90] [&_svg]:transition [&_svg]:duration-150 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-secondary text-white hover:bg-shade-600",
        "filled-primary": "bg-primary text-white hover:bg-shade-600",
        destructive: "bg-error text-white hover:bg-error/90",
        outline: "border border-primary text-primary hover:bg-primary/10",
        ghost:
          "bg-muted hover:bg-muted/80 text-gray-900 hover:text-gray-900/90",
        link: "text-primary underline-offset-4 hover:underline hover:decoration-primary",
      },
      size: {
        xs: "size-[22px] text-xs rounded-full [&_svg]:size-[13px]",
        sm: "h-2 rounded-[12.8px] px-3 text-xs [&_svg]:size-[14px]",
        "icon-md": "size-8 rounded-[12.8px] [&_svg]:size-[15px]",
        icon: "size-10 rounded-[13.8px]",
        tag: "rounded-full px-2 py-px text-[12px] font-500",
        md: "h-8 px-2 py-1 rounded-[12.8px] text-xs [&>svg]:size-4",
        lg: "h-3 px-[22px] py-[11px] text-[15px] font-600 rounded-[13.8px] [&>svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
