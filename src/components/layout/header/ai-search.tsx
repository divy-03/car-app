"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { findCar } from "@/lib/actions/ai-action";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AISearch = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");

  // Shortcut handler for Ctrl + K
  useEffect(() => {
    const downHandler = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", downHandler);
    return () => window.removeEventListener("keydown", downHandler);
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description) return toast.error("Please enter some description first");

    setIsLoading(true);

    try {
      const result: string = await findCar(description);

      // If the AI says "No car found"
      if (result.trim() === "No car found") {
        toast.error("No car found. Try changing your prompt.");
        return;
      }

      // Try to extract the first valid car id (CUID) from the response
      const match = result.match(/\b(c[a-z0-9]{24,})\b/i);
      const carId = match ? match[1] : null;

      if (!carId) {
        throw new Error("Could not find the car. Try changing your prompt.");
      }

      router.replace(`/cars/${carId}`);
      toast.success(`Car found with ID: ${carId}`);
      setDescription("");
      setIsOpen(false);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger className="ml-auto mr-4 flex items-center gap-1 bg-muted rounded-lg px-4 py-2 hover:bg-muted">
        <SearchIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Search with AI</span>
        <Badge className="ml-1">Ctrl+K</Badge>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Define what type of car you like </DialogTitle>
          <DialogDescription>
            You can tell features like color, type, and model. For example: I
            like a red SUV with a sunroof.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <Textarea
            placeholder="Write about your dream car..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="max-h-[20rem]"
            style={{
              // @ts-expect-error: css not updated
              fieldSizing: "content",
            }}
          />

          <Button
            disabled={isLoading}
            className="flex items-center gap-1 cursor-pointer"
          >
            {isLoading ? "Searching..." : <>Find my dream car</>}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AISearch;
