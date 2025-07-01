import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../../shadcn/Sheet";
import { FaCalendar, FaSearch } from "react-icons/fa";
import { Field, Form, Formik } from "formik";
import { buildSearchParams } from "./misc";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { searchSchema } from "../../../lib/zod/Schemas";
import { Input } from "../../ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "../../shadcn/Popover";
import { Button } from "../../ui/Button";
import { CounterControl } from "../CounterControll";
import { useNavigate, useSearchParams } from "react-router";
import { formatDate } from "../../../lib/utils";
import { DatePicker } from "../../ui/DatePricker";
import type { SearchFormValues } from "../../../types/inferdTypes";

const MobileSearch = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialValues: SearchFormValues = {
    search: searchParams.get("search") || "",
    from: searchParams.get("from") || formatDate(new Date(), "YYYY-MM-DD"),
    to: searchParams.get("to") || formatDate(new Date(), "YYYY-MM-DD"),
    adults: parseInt(searchParams.get("adults") || "1", 10),
    children: parseInt(searchParams.get("children") || "0", 10),
    rooms: parseInt(searchParams.get("rooms") || "1", 10),
  };
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        {/* Trigger Button on side */}
        <button
          className="fixed top-1/2 right-0 z-50 -translate-y-1/2 rounded-l-full bg-primary p-3 shadow-lg hover:bg-acc transition-colors md:hidden"
          aria-label="Open Search"
        >
          <FaSearch className="text-white w-6 h-6" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className=" max-md:w-fullmax-w-2xl p-6"
        onInteractOutside={() => setSheetOpen(false)}
      >
        <h2 className="mb-4 text-xl font-semibold">Search Hotels</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(searchSchema)}
          onSubmit={(values) => {
            setSheetOpen(false);
            navigate(buildSearchParams(values));
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-4">
              <Field
                name="search"
                as={Input}
                placeholder="Search for Hotels"
                className="bg-gray-100 rounded-2xl py-3 px-5 text-lg w-full"
              />

              {/* Guests & Rooms Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="md"
                    className="py-4.5 w-full hover:bg-gray-50 justify-center"
                  >
                    <span className="font-semibold">
                      {values.adults} Adults, {values.children} Children,{" "}
                      {values.rooms} Rooms
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="bg-white shadow-2xl rounded-xl p-0 w-80"
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
                        setFieldValue("adults", values.adults - 1)
                      }
                      onIncrement={() =>
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
                        setFieldValue("children", values.children - 1)
                      }
                      onIncrement={() =>
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
                        setFieldValue("rooms", values.rooms - 1)
                      }
                      onIncrement={() =>
                        setFieldValue("rooms", values.rooms + 1)
                      }
                    />
                  </div>
                </PopoverContent>
              </Popover>

              {/* Date Range Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-between border  h-fit py-2 text-sm min-w-0 w-full hover:bg-gray-50"
                  >
                    <span className="text-left font-medium truncate">
                      {formatDate(values.from, "short")} -{" "}
                      {formatDate(values.to, "short")}
                    </span>
                    <FaCalendar className="size-4 ml-2 text-muted-foreground shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-white" side="bottom">
                  <DatePicker
                    mode="range"
                    captionLayout="dropdown"
                    selected={{
                      from: new Date(values.from),
                      to: new Date(values.to),
                    }}
                    onSelect={(selected) => {
                      if (selected?.from)
                        setFieldValue(
                          "from",
                          formatDate(selected.from, "YYYY-MM-DD")
                        );
                      if (selected?.to)
                        setFieldValue(
                          "to",
                          formatDate(selected.to, "YYYY-MM-DD")
                        );
                    }}
                  />
                </PopoverContent>
              </Popover>

              <Button
                type="submit"
                size="lg"
                className="py-4.5 w-full flex justify-center"
              >
                <FaSearch className="size-4 mr-2" />
                Search
              </Button>
            </Form>
          )}
        </Formik>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSearch;
