import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchIcon } from "lucide-react";

const AISearch = () => {
  return (
    <Dialog>
      <DialogTrigger className="ml-auto mr-4 flex items-center gap-1 bg-muted rounded-lg px-4 py-2 hover:bg-muted/80 transition-colors duration-300">
        <SearchIcon className="h-4 2-4" /> Search with AI
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AISearch;
