"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useImages } from "@/store/image-store";

export const GenerateImage = () => {
  const { addImage } = useImages();

  return (
    <div>
      <h1 className="text-2xl font-bold">Generate Image</h1>
      <p className="text-muted-foreground">
        Use AI to generate an image of your dream car.
      </p>
      <form
        className="mt-4 flex flex-col gap-4"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2 ">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the car you want to generate..."
            rows={6}
            required
            // {...register("description")}
          />
          {/* {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )} */}
        </div>

        <div className="space-y-2 ">
          <Label htmlFor="file-name">File Name</Label>
          <Input
            id="file-name"
            placeholder="Enter a name for the generated image..."
            required
            // {...register("name")}
          />
          {/* {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )} */}
        </div>

        {/* <Button disabled={generatingLoader}>
          {generatingLoader ? "Generating..." : "Generate Image"}
        </Button */}
      </form>
    </div>
  );
};

export const AddCarForm = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Car</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Car Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter car name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Car Model</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter car model"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
