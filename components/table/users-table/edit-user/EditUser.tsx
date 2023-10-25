import { IUser } from "@/types/IUser";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditUserForm from "@/components/form/EditUserForm";
import { useState } from "react";

interface EditUserProps {
  data: IUser;
}

const EditUser = ({ data }: EditUserProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          title={"Edit user"}
          onClick={() => setOpen(true)}
        >
          ✎
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to user profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditUserForm data={data} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
