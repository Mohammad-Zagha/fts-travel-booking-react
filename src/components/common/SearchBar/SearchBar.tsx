import { Formik, Form, Field } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Input } from "../../ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "../../shadcn/Popover";
import { Button } from "../../ui/Button";
import { formatDate } from "../../../lib/utils";
import { FaCalendar, FaSearch } from "react-icons/fa";
import { DatePicker } from "../../ui/DatePricker";
import { searchSchema } from "../../../lib/zod/Schemas";
import { useNavigate, useSearchParams } from "react-router";
import { CounterControl } from "../CounterControll";
import { buildSearchParams } from "./misc";
import type { SearchFormValues } from "../../../types/inferdTypes";
import MobileSearch from "./MobileSearch";

type SearchBarProps = {
  isResultsPage?: boolean;
};

const SearchBar = ({ isResultsPage = false }: SearchBarProps) => {
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
  return (
    <>
      {/* Desktop Full Search Bar */}
      <div
        className={`z-50 max-md:hidden lg:w-[65%] bg-white rounded-2xl shadow-xl p-6
          ${
            isResultsPage
              ? "relative mx-auto mt-4"
              : "absolute top-[45%] left-1/2 transform -translate-x-1/2"
          }
        `}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(searchSchema)}
          onSubmit={(values) => navigate(buildSearchParams(values))}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="flex flex-col md:flex-row items-center gap-4 flex-wrap w-full">
                {/* Search Input */}
                <Field
                  name="search"
                  as={Input}
                  placeholder="Search for Hotels"
                  className="bg-gray-100 rounded-2xl py-3 px-5 text-lg w-full md:w-auto flex-1"
                />

                {/* Guests & Rooms Popover */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="md"
                      className="py-4.5 flex-1 hover:bg-gray-50 w-full md:w-auto justify-center"
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
                      className="justify-between border  h-fit py-2 text-sm min-w-0 max-lg:!w-full md:w-auto hover:bg-gray-50"
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

                {/* Search Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="py-4.5 w-full flex-1 md:w-auto flex justify-center "
                >
                  <FaSearch className="size-4 mr-2" />
                  Search
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Mobile Sheet Search */}
      <MobileSearch />
    </>
  );
};

export default SearchBar;
