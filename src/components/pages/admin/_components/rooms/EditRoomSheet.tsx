import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../../../../shadcn/Sheet";
import { Button } from "../../../../ui/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Input } from "../../../../ui/Input";
import { addRoomSchema } from "../../../../../lib/zod/Schemas"; // your room schema
import type { AddRoomFormValues } from "../../../../../types/inferdTypes";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import type { Room } from "../../../../../types"; // adjust if needed
import { useEditRoom } from "../../../../../hooks/admin/rooms/useEditRoom";
import { Edit2 } from "lucide-react";

const EditRoomSheet = ({ room }: { room: Room }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useEditRoom();
  const queryClient = useQueryClient();

  const initialValues: AddRoomFormValues = {
    roomId: room.roomId,
    roomNumber: room.roomNumber,
    roomPhotoUrl: room.roomPhotoUrl,
    roomType: room.roomType,
    capacityOfAdults: room.capacityOfAdults,
    capacityOfChildren: room.capacityOfChildren,
    amenities: room.amenities || [],
    price: room.price,
    availability: room.availability,
  };

  const handleSubmit = (values: AddRoomFormValues) => {
    mutateAsync(
      {
        id: room.roomId,
        formData: values,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["rooms"] });
          toast.success("Room edited successfully!");
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to edit room.");
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
        <h2 className="text-xl font-semibold">Edit Room</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(addRoomSchema)}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              {[
                { name: "roomNumber", label: "Room Number", type: "number" },
                { name: "roomPhotoUrl", label: "Room Photo URL", type: "text" },
                { name: "roomType", label: "Room Type", type: "text" },
                {
                  name: "capacityOfAdults",
                  label: "Capacity of Adults",
                  type: "number",
                },
                {
                  name: "capacityOfChildren",
                  label: "Capacity of Children",
                  type: "number",
                },
                { name: "price", label: "Price", type: "number" },
                {
                  name: "availability",
                  label: "Availability",
                  type: "checkbox",
                },
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <Field
                    as={type === "checkbox" ? "input" : Input}
                    name={name}
                    type={type}
                    className={type === "checkbox" ? "mt-2" : "mt-1"}
                  />
                  <ErrorMessage
                    name={name}
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
                {isPending ? "Editing..." : "Edit Room"}
              </Button>
            </Form>
          )}
        </Formik>
      </SheetContent>
    </Sheet>
  );
};

export default EditRoomSheet;
