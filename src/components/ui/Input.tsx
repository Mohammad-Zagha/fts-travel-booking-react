"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { cn } from "../../utils/cn";

const inputVariants = cva(
  "flex w-full rounded-[13.8px] ring-1  ring-gray-200/70 bg-transparent px-3 focus:px-4 font-400 transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none focus-visible:ring-[1.5px] focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 invalid:ring-red-500",
  {
    variants: {
      s: {
        lg: "h-14 text-base",
        md: "h-12 text-sm",
        sm: "h-9 text-xs",
      },
    },
    defaultVariants: {
      s: "md",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ containerClassName, className, type, s, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    const getType = React.useCallback(
      (type: InputProps["type"]) => {
        if (type === "password") {
          return show ? "text" : "password";
        }
        return type;
      },
      [show, type]
    );
    return (
      <div
        className={cn("relative w-full flex items-center ", containerClassName)}
      >
        <input
          type={getType(type)}
          className={cn(inputVariants({ s, className }), "")}
          ref={ref}
          {...props}
        />
        {type == "password" && (
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute center-y right-1 pointer text-muted-foreground"
          >
            {show ? <FaRegEye size={16} /> : <FaEyeSlash size={16} />}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

type TInputLabel = React.ComponentProps<"label"> & {
  isRequired?: boolean;
};

function InputLabel({
  children,
  isRequired,
  className,
  ...props
}: TInputLabel) {
  return (
    <label
      className={cn("w-fit inline-flex gap-1 font-700 text-sm ", className)}
      {...props}
    >
      {children}
      {isRequired && <span className="text-red-500 select-none">*</span>}
    </label>
  );
}
InputLabel.displayName = "InputLabel";
export type TInstruction = Readonly<{
  text?: string;
  type?: "info" | "error";
  className?: string;
}>;
function Instruction({ text, type = "info", className }: TInstruction) {
  if (!text) return null;
  return (
    <p
      className={cn(
        "text-sm text-muted-foreground px-0.5 peer-has-[input:focus]:pl-1 transition-all",
        className
      )}
    >
      <span
        className={cn(
          "opacity-100 transition",
          !text && "opacity-0",
          type === "error" && "text-red-500"
        )}
      >
        {text}
      </span>
    </p>
  );
}
Instruction.displayName = "Instruction";

type TInputBox = {
  label?: string;
  instruction?: TInstruction;
  isRequired?: boolean;
  lableClassName?: string;
} & InputProps;

const InputBox = React.forwardRef<HTMLInputElement, TInputBox>(
  (
    {
      label,
      instruction,
      type = "text",
      containerClassName,
      className,
      id,
      name,
      isRequired,
      lableClassName,
      ...props
    }: TInputBox,
    ref
  ) => {
    return (
      <div
        className={cn(
          "flex flex-col gap-0.5 w-full transition-all",
          containerClassName
        )}
      >
        {label && (
          <InputLabel
            htmlFor={id}
            isRequired={isRequired}
            className={lableClassName}
          >
            {label}
          </InputLabel>
        )}
        <Input
          ref={ref}
          type={type}
          id={id}
          name={name}
          className={cn("", className)}
          containerClassName="peer"
          {...props}
        />
        {instruction && <Instruction {...instruction} />}
      </div>
    );
  }
);
InputBox.displayName = "InputBox";

export { Input, InputBox, InputLabel, Instruction };
