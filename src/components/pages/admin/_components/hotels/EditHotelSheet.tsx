import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../../../../shadcn/Sheet";
import { Button } from "../../../../ui/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Input } from "../../../../ui/Input";
import { addHotelSchema } from "../../../../../lib/zod/Schemas";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import type { Hotel } from "../../../../../types/hotel_types";
import { Edit2 } from "lucide-react";
import { useEditHotel } from "../../../../../hooks/admin/hotels/useEditHotel";

const EditHotelSheet = ({ hotel }: { hotel: Hotel }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useEditHotel();
  const queryClient = useQueryClient();

  const initialValues = {
    hotelName: hotel.hotelName,
    location: hotel.location,
    description: hotel.description,
    hotelType: hotel.hotelType,
    starRating: hotel.starRating,
    latitude: hotel.latitude,
    longitude: hotel.longitude,
    imageUrl: hotel.imageUrl || "",
    availableRooms: hotel.availableRooms || 0,
    cityId: hotel.cityId,
    rooms: hotel.rooms || [],
    amenities: hotel.amenities || [],
  };

  const handleSubmit = (values: typeof initialValues) => {
    mutateAsync(
      {
        id: hotel.id,
        formData: values,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["hotels"] });
          toast.success("Hotel edited successfully!");
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to edit hotel.");
        },
      }
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
          <Edit2 size={16} />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="p-6 space-y-6 overflow-y-auto">
        <h2 className="text-xl font-semibold">Edit Hotel</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(addHotelSchema)}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              {[
                { name: "hotelName", label: "Hotel Name", type: "text" },
                { name: "location", label: "Location", type: "text" },
                { name: "description", label: "Description", type: "text" },
                { name: "hotelType", label: "Type", type: "text" },
                { name: "starRating", label: "Star Rating", type: "number" },
                { name: "latitude", label: "Latitude", type: "number" },
                { name: "longitude", label: "Longitude", type: "number" },
                { name: "imageUrl", label: "Image URL", type: "text" },
                {
                  name: "availableRooms",
                  label: "Available Rooms",
                  type: "number",
                },
                { name: "cityId", label: "City ID", type: "number" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <Field
                    as={Input}
                    name={field.name}
                    type={field.type}
                    placeholder={field.label}
                    className="mt-1"
                  />
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              ))}

              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary/90"
              >
                {isPending ? "Editing..." : "Edit Hotel"}
              </Button>
            </Form>
          )}
        </Formik>
      </SheetContent>
    </Sheet>
  );
};

export default EditHotelSheet;
