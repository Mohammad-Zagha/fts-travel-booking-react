import { Formik, Form, Field } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Input } from "../ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/Popover";
import { Button } from "../ui/Button";
import { formatDate } from "../../lib/utils";
import { FaCalendar, FaSearch } from "react-icons/fa";
import { DatePicker } from "../ui/DatePricker";
import { SearchSchema } from "../../lib/zod/Schemas";
import { useNavigate } from "react-router";
import type { SearchFormValues } from "../../types/inferdTypes";
import { CounterControl } from "./CounterControll";

const buildSearchParams = (values: SearchFormValues) => {
  const params = new URLSearchParams({
    search: values.search,
    from: formatDate(values.from, "YYYY-MM-DD"),
    to: formatDate(values.to, "YYYY-MM-DD"),
    adults: values.adults.toString(),
    children: values.children.toString(),
    rooms: values.rooms.toString(),
  });

  return `/search-results?${params.toString()}`;
};

const SearchBar = () => {
  const navigate = useNavigate();

  const initialValues: SearchFormValues = {
    search: "",
    from: formatDate(new Date(), "YYYY-MM-DD"),
    to: formatDate(new Date(), "YYYY-MM-DD"),
    adults: 1,
    children: 0,
    rooms: 1,
  };

  return (
    <div className="absolute z-50 top-[45%] left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[80%] lg:w-[60%] bg-white rounded-2xl shadow-xl p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(SearchSchema)}
        onSubmit={(values) => navigate(buildSearchParams(values))}
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

              {/* Guest & Room Selector */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="md"
                    className="py-4.5 min-w-[200px] hover:bg-gray-50"
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
                    className="justify-between border h-fit py-2 text-sm min-w-[180px] hover:bg-gray-50"
                  >
                    <span className="text-left font-medium">
                      {formatDate(values.from, "short")} -{" "}
                      {formatDate(values.to, "short")}
                    </span>
                    <FaCalendar className="size-4 ml-2 text-muted-foreground" />
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
              <Button type="submit" size="lg" className="py-4.5">
                <FaSearch className="size-4 mr-2" />
                Search
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchBar;
