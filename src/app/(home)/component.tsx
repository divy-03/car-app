"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { findCar } from "@/lib/actions/ai-action";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const SearchBar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const description =
      desc + (priceRange ? ` with Price between: ${priceRange} $` : "");
    if (!description) return toast.error("Please enter some description first");

    console.log("Searching for car with description:", description);
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
      setDesc("");
      setPriceRange("");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white dark:bg-zinc-950 rounded-lg p-4 max-w-4xl mx-auto shadow-lg">
      <form
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        onSubmit={submitHandler}
      >
        <Input
          placeholder="Search by make, model..."
          className="md:col-span-2"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          disabled={isLoading}
        />
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-10000">$0 - $10,000</SelectItem>
            <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
            <SelectItem value="20000-30000">$20,000 - $30,000</SelectItem>
            <SelectItem value="30000+">$30,000+</SelectItem>
          </SelectContent>
        </Select>
        <Button
          className="w-full flex items-center cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            "Searching..."
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" /> Search
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
