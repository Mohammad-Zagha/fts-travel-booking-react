import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../shadcn/Dialog";
import { Button } from "../../../ui/Button";
import { useState } from "react";

const DeleteButtonDialog = ({
  onConfirm,
  pending,
}: {
  onConfirm: () => void;
  pending?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
          <Trash2 size={16} />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-white rounded-xl p-6 max-w-sm !border-none">
        <DialogHeader>
          <DialogTitle className="text-red-600">Delete Item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            disabled={pending}
            variant="filled-primary"
            className="px-4 py-2 rounded-lg"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            {pending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButtonDialog;
