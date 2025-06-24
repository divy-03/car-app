"use client";

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
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

const AISearch = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const isLoading = false; // Placeholder for loading state

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
    // Your logic here
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger className="ml-auto mr-4 flex items-center gap-1 bg-muted rounded-lg px-4 py-2 hover:bg-muted/80 transition-colors duration-300">
        <SearchIcon className="h-4 w-4" /> Search with AI &quot;CTRL+K&quot;
        
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Define what type of car you like</DialogTitle>
          <DialogDescription>
            You can tell features like color, type, and mode. For example, &quot;I like red sports cars with a convertible roof.&quot;
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <Textarea
            placeholder="Write about your car preferences"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-32 p-2 border border-gray-300 rounded-lg"
            rows={5}
          />

          <Button disabled={isLoading} className="flex items-center gap-1">
            {isLoading ? "Searching..." : "Search"}
            <SearchIcon className="h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AISearch;
