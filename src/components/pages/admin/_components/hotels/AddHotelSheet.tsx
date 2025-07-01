import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../../../../shadcn/Sheet";
import { Button } from "../../../../ui/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Input } from "../../../../ui/Input";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { addHotelSchema } from "../../../../../lib/zod/Schemas";
import type { AddHotelFormValues } from "../../../../../types/inferdTypes";
import { userAddHotel } from "../../../../../hooks/admin/hotels/useAddHotel";

const AddHotelSideSheet = () => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = userAddHotel();
  const queryClient = useQueryClient();

  const initialValues: AddHotelFormValues = {
    hotelName: "",
    location: "",
    description: "",
    hotelType: "",
    starRating: 0,
    latitude: 0,
    longitude: 0,
    imageUrl: "",
    availableRooms: 0,
    cityId: 0,
    amenities: [],
    rooms: [],
  };

  const handleSubmit = (values: AddHotelFormValues) => {
    mutateAsync(
      { formData: values },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["hotels"] });
          toast.success("Hotel added successfully!");
          setOpen(false);
        },
      }
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="text-sm font-medium rounded-xl transition-colors bg-primary text-white hover:bg-primary/90">
          <Plus size={16} />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="p-6 space-y-6 overflow-y-auto">
        <h2 className="text-xl font-semibold">Add New Hotel</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(addHotelSchema)}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hotel Name
                </label>
                <Field as={Input} name="hotelName" placeholder="Hotel name" />
                <ErrorMessage
                  name="hotelName"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <Field as={Input} name="location" placeholder="Location" />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Field
                  as={Input}
                  name="description"
                  placeholder="Description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hotel Type
                </label>
                <Field as={Input} name="hotelType" placeholder="Type" />
                <ErrorMessage
                  name="hotelType"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Star Rating
                </label>
                <Field
                  as={Input}
                  type="number"
                  name="starRating"
                  placeholder="Star Rating"
                />
                <ErrorMessage
                  name="starRating"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Latitude
                  </label>
                  <Field
                    as={Input}
                    type="number"
                    name="latitude"
                    placeholder="Latitude"
                  />
                  <ErrorMessage
                    name="latitude"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Longitude
                  </label>
                  <Field
                    as={Input}
                    type="number"
                    name="longitude"
                    placeholder="Longitude"
                  />
                  <ErrorMessage
                    name="longitude"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <Field as={Input} name="imageUrl" placeholder="Image URL" />
                <ErrorMessage
                  name="imageUrl"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Available Rooms
                  </label>
                  <Field
                    as={Input}
                    type="number"
                    name="availableRooms"
                    placeholder="Available Rooms"
                  />
                  <ErrorMessage
                    name="availableRooms"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City ID
                  </label>
                  <Field
                    as={Input}
                    type="number"
                    name="cityId"
                    placeholder="City ID"
                  />
                  <ErrorMessage
                    name="cityId"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary/90"
              >
                {isPending ? "Adding..." : "Add Hotel"}
              </Button>
            </Form>
          )}
        </Formik>
      </SheetContent>
    </Sheet>
  );
};

export default AddHotelSideSheet;
