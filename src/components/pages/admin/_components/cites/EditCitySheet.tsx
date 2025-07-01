import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../../../../shadcn/Sheet";
import { Button } from "../../../../ui/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Input } from "../../../../ui/Input";
import { addCitySchema } from "../../../../../lib/zod/Schemas";
import type { AddCityFormValues } from "../../../../../types/inferdTypes";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import type { City } from "../../../../../types";
import { useEditCity } from "../../../../../hooks/admin/cities/useEditCity";
import { Edit2 } from "lucide-react";

const EditCitySheet = ({ city }: { city: City }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useEditCity();
  const queryClient = useQueryClient();
  const initialValues: AddCityFormValues = {
    name: city.name,
    description: city.description,
  };

  const handleSubmit = (values: AddCityFormValues) => {
    mutateAsync(
      {
        id: city.id,
        formData: values,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["cities"],
          });
          toast.success("City Edited successfully!");
        },
      }
    );
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
          <Edit2 size={16} />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="p-6 space-y-6 overflow-y-auto">
        <h2 className="text-xl font-semibold">Edit City</h2>

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
                {isPending ? "Editing..." : "Edit City"}
              </Button>
            </Form>
          )}
        </Formik>
      </SheetContent>
    </Sheet>
  );
};

export default EditCitySheet;
