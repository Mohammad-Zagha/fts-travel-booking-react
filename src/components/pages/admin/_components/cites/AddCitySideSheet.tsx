import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../../../../shadcn/Sheet";
import { Button } from "../../../../ui/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Input } from "../../../../ui/Input";
import { addCitySchema } from "../../../../../lib/zod/Schemas";
import type { AddCityFormValues } from "../../../../../types/inferdTypes";
import { useAddCity } from "../../../../../hooks/admin/cities/useAddCities";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";

const AddCitySideSheet = () => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useAddCity();
  const queryClient = useQueryClient();
  const initialValues: AddCityFormValues = {
    name: "",
    description: "",
  };

  const handleSubmit = (values: AddCityFormValues) => {
    mutateAsync(
      {
        formData: values,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["cities"],
          });
          toast.success("City added successfully!");
        },
      }
    );
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className=" text-sm font-medium rounded-xl transition-colors bg-primary text-white hover:bg-primary/90 ">
          <Plus size={16} className="" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="p-6 space-y-6 overflow-y-auto">
        <h2 className="text-xl font-semibold">Add New City</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(addCitySchema)}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Field
                  as={Input}
                  name="name"
                  placeholder="City name"
                  className="mt-1"
                />
                <ErrorMessage
                  name="name"
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
                  placeholder="description"
                  className="mt-1"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary/90"
              >
                {isPending ? "Adding..." : "Add City"}
              </Button>
            </Form>
          )}
        </Formik>
      </SheetContent>
    </Sheet>
  );
};

export default AddCitySideSheet;
