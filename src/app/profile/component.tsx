"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/lib/actions/user-action";
import { UserSchema } from "@/lib/zod";
import { Edit } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export function EditForm({ user }: { user: UserSchema | null }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [isOpen, setIsOpen] = useState(false);

  const handleEditProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Updating Profile...");
    try {
      setLoading(true);
      if (!email) throw new Error("Email is required");

      if (!user?.email) return toast.error("User email is missing!");
      const data = await updateProfile(user.email, name, email);

      // if (!data) throw new Error("Falied to update");
      console.log(data);
      toast.success("Profile Updated", { id: toastId });
      setIsOpen(false);
    } catch (error) {
      toast.error(`Error updating profile ${error}`, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>User not found</div>;

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Edit <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleEditProfile}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{loading ? "Loading.." : "Save"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
