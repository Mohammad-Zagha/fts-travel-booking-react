import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { cn } from "../../lib/utils";
import { buttonVariants } from "./Button";

export type DatePickerProps = React.ComponentProps<typeof DayPicker>;

function DatePicker({
  className,
  classNames,
  startMonth,
  endMonth,
  styles,
  components,
  showOutsideDays = true,
  ...props
}: DatePickerProps) {
  return (
    <DayPicker
      startMonth={startMonth}
      endMonth={endMonth}
      showOutsideDays={showOutsideDays}
      className={cn("bg-white rounded-2xl w-full p-1rem", className)}
      styles={{
        dropdown: {
          padding: "0.5rem",
          borderRadius: "0.5rem",
          backgroundColor: "white",
        },
        ...styles,
      }}
      classNames={{
        root: "relative box-border",
        months: "flex gap-4 pt-14 relative",
        month: "flex flex-col gap-4",
        month_caption:
          "text-sm font-medium flex items-center justify-center gap-2",
        nav: "flex items-center justify-center gap-2 w-full absolute top-1 left-1/2 -translate-x-1/2",
        button_previous: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "!p-0 !border !border-gray-200"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "!p-0 !border !border-gray-200"
        ),
        chevron: "w-4 h-4",
        dropdowns: "flex items-center justify-center w-full gap-[1rem]",
        dropdown_root:
          "border border-accent/40 px-2 py-1 rounded-xl pointer relative",
        caption_label: "flex items-center gap-[1rem]",
        weekday:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        weekdays: "h-10",
        outside:
          "text-muted-foreground opacity-50 aria-selected:bg-gray-200/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-full !border flex items-center justify-center !p-0 !border-gray-200 font-normal aria-selected:opacity-100"
        ),
        day: "size-10 p-px",
        today:
          "[&>button]:ring-1 [&>button]:ring-secondary [&>button]:ring-primary",
        selected:
          "[&>button]:!bg-primary [&>button]:!text-white [&>button]:hover:bg-primary/80",
        month_grid: "w-full border-collapse space-y-1",
        ...classNames,
      }}
      components={{
        ...components,
      }}
      {...props}
    />
  );
}
DatePicker.displayName = "DatePicker";

export { DatePicker };
