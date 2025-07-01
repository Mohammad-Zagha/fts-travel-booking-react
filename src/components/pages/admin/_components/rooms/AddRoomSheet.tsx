import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../../../../shadcn/Sheet";
import { Button } from "../../../../ui/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Input } from "../../../../ui/Input";
import { addRoomSchema } from "../../../../../lib/zod/Schemas"; // your Zod schema for rooms
import type { AddRoomFormValues } from "../../../../../types/inferdTypes";
import { useAddRoom } from "../../../../../hooks/admin/rooms/useAddRoom"; // your add room hook
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";

const AddRoomSideSheet = () => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useAddRoom();
  const queryClient = useQueryClient();

  const initialValues: AddRoomFormValues = {
    roomId: 0,
    roomNumber: 0,
    roomPhotoUrl: "",
    roomType: "",
    capacityOfAdults: 0,
    capacityOfChildren: 0,
    amenities: [],
    price: 0,
    availability: true,
  };

  const handleSubmit = (values: AddRoomFormValues) => {
    mutateAsync(
      {
        ...values,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["rooms"] });
          toast.success("Room added successfully!");
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to add room.");
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
        <h2 className="text-xl font-semibold">Add New Room</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(addRoomSchema)}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              {[
                { name: "roomId", label: "Room ID", type: "number" },
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

              {/* For amenities, you might want to create a separate dynamic input or multi-select, 
                  for now, we omit amenities editing in this sheet for simplicity */}

              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary/90"
              >
                {isPending ? "Adding..." : "Add Room"}
              </Button>
            </Form>
          )}
        </Formik>
      </SheetContent>
    </Sheet>
  );
};

export default AddRoomSideSheet;
