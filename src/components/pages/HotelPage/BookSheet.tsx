"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { Sheet, SheetContent, SheetTrigger } from "../../shadcn/Sheet";
import { Popover, PopoverTrigger, PopoverContent } from "../../shadcn/Popover";
import { Button } from "../../ui/Button";
import { DatePicker } from "../../ui/DatePricker";
import { FaCalendar } from "react-icons/fa";
import type { RoomAvailability } from "../../../types/hotel_types";
import { formatDate } from "../../../lib/utils";
import { useCart } from "../../../context/cartContext";

export const addToCartSchema = z.object({
  checkIn: z.date(),
  checkOut: z.date(),
});

type FormData = z.infer<typeof addToCartSchema>;

const BookSheet = ({ room }: { room: RoomAvailability }) => {
  const [open, setOpen] = useState(false);
  const { addToCart } = useCart();
  const initialValues: FormData = {
    checkIn: new Date(),
    checkOut: new Date(),
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          disabled={!room.availability}
          className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
            room.availability
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {room.availability ? "Book Now" : "Unavailable"}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="p-6 space-y-6 overflow-y-auto">
        <div>
          <img
            src={room.roomPhotoUrl}
            alt=""
            className="w-full h-48 object-cover rounded-lg"
          />
          <h2 className="text-lg font-semibold mt-4">{room.roomType}</h2>
          <p className="text-sm text-muted-foreground">
            Room #{room.roomNumber} • {room.capacityOfAdults} Adults •{" "}
            {room.capacityOfChildren} Children
          </p>
          <p className="mt-2 font-semibold text-primary">
            ${room.price} / night
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(addToCartSchema)}
          onSubmit={(values) => {
            addToCart({
              ...room,
              ...values,
              quantity: 0,
            });
            setOpen(false);
          }}
        >
          {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form className="space-y-6">
              {/* Guest Info Grid */}

              {/* Dates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-between w-full hover:bg-gray-50 p-6"
                      >
                        <span className="text-left font-medium truncate">
                          {formatDate(values.checkIn, "short")}
                        </span>
                        <FaCalendar className="ml-2 text-muted-foreground" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-white">
                      <DatePicker
                        mode="single"
                        selected={values.checkIn}
                        onSelect={(date) => setFieldValue("checkIn", date!)}
                      />
                    </PopoverContent>
                  </Popover>
                  {touched.checkIn && (
                    <p className="text-xs text-red-500">
                      {errors.checkIn ? "sad" : "dd"}
                    </p>
                  )}
                </div>

                <div>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-between w-full hover:bg-gray-50 p-6"
                      >
                        <span className="text-left font-medium truncate">
                          {formatDate(values.checkOut, "short")}
                        </span>
                        <FaCalendar className="ml-2 text-muted-foreground" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-white">
                      <DatePicker
                        mode="single"
                        selected={values.checkOut}
                        disabled={(date) =>
                          values.checkIn && date < values.checkIn
                        }
                        onSelect={(date) => setFieldValue("checkOut", date!)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full p-6 font-semibold text-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Add to Cart"}
              </Button>
            </Form>
          )}
        </Formik>
      </SheetContent>
    </Sheet>
  );
};

export default BookSheet;
