import { Formik, Form, Field } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Input } from "../ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/Popover";
import { Button } from "../ui/Button";
import { cn, formatDate } from "../../lib/utils";
import { FaCalendar, FaPlus, FaMinus } from "react-icons/fa";
import { DatePicker } from "../ui/DatePricker";
import { SearchSchema } from "../../lib/zod/Schemas";

type SearchFormValues = z.infer<typeof SearchSchema>;

const SearchBar = () => {
  const initialValues: SearchFormValues = {
    search: "",
    date: new Date(),
    adults: 1,
    children: 0,
    rooms: 1,
  };

  const CounterControl = ({
    label,
    value,
    onDecrement,
    onIncrement,
    min = 0,
    max = 10,
    description,
  }: {
    label: string;
    value: number;
    onDecrement: () => void;
    onIncrement: () => void;
    min?: number;
    max?: number;
    description?: string;
  }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-black">{label}</span>
        {description && (
          <span className="text-xs text-gray-500 mt-1">{description}</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrement}
          disabled={value <= min}
          className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200",
            value <= min
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-primary text-primary hover:bg-muted hover:border-secondary"
          )}
        >
          <FaMinus size={12} />
        </button>
        <span className="w-8 text-center font-semibold text-black">
          {value}
        </span>
        <button
          type="button"
          onClick={onIncrement}
          disabled={value >= max}
          className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200",
            value >= max
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-primary text-primary hover:bg-muted hover:border-secondary"
          )}
        >
          <FaPlus size={12} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="absolute z-50 top-[45%] left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[80%] lg:w-[60%] bg-white rounded-2xl shadow-xl p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(SearchSchema)}
        onSubmit={(values) => {
          console.log("Search submitted:", values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="flex items-center gap-4">
              <Field
                name="search"
                as={Input}
                placeholder="Search for Hotels"
                className="w-full bg-gray-100 rounded-2xl py-3 px-5 text-lg"
              />

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className={cn(
                      "justify-between border h-fit py-2 text-sm min-w-[180px] hover:bg-gray-50"
                    )}
                  >
                    <span className="text-left font-medium">
                      {values.adults} Adults, {values.children} Children,{" "}
                      {values.rooms} Rooms
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="bg-white shadow-2xl  rounded-xl p-0 w-80"
                  side="bottom"
                >
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-black mb-4">
                      Guest & Rooms
                    </h3>

                    <CounterControl
                      label="Adults"
                      description="Ages 13 or above"
                      value={values.adults}
                      min={1}
                      max={10}
                      onDecrement={() =>
                        values.adults > 1 &&
                        setFieldValue("adults", values.adults - 1)
                      }
                      onIncrement={() =>
                        values.adults < 10 &&
                        setFieldValue("adults", values.adults + 1)
                      }
                    />

                    <CounterControl
                      label="Children"
                      description="Ages 0-12"
                      value={values.children}
                      min={0}
                      max={10}
                      onDecrement={() =>
                        values.children > 0 &&
                        setFieldValue("children", values.children - 1)
                      }
                      onIncrement={() =>
                        values.children < 10 &&
                        setFieldValue("children", values.children + 1)
                      }
                    />

                    <CounterControl
                      label="Rooms"
                      description="Number of rooms needed"
                      value={values.rooms}
                      min={1}
                      max={8}
                      onDecrement={() =>
                        values.rooms > 1 &&
                        setFieldValue("rooms", values.rooms - 1)
                      }
                      onIncrement={() =>
                        values.rooms < 8 &&
                        setFieldValue("rooms", values.rooms + 1)
                      }
                    />
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className={cn(
                      "justify-between border h-fit py-2 text-sm min-w-[180px] hover:bg-gray-50"
                    )}
                  >
                    <span className="text-left font-medium">
                      {formatDate(values.date)}
                    </span>
                    <FaCalendar className="size-4 ml-2 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-white" side="bottom">
                  <DatePicker
                    mode="single"
                    captionLayout="dropdown"
                    selected={values.date}
                    onSelect={(selected) => {
                      if (selected) {
                        setFieldValue("date", selected);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchBar;
