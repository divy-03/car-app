"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useImages } from "@/store/image-store";
import { useState } from "react";
import NextImage from "next/image";
import { Progress } from "@/components/ui/progress";
import { useForm } from "react-hook-form";
import { generateImageSchema, GenerateImageSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const GenerateImage = () => {
  const { addImage } = useImages();

  const [image, setImage] = useState<{ base64Data: string; name: string }>();
  const [uploadLoader, setUploadLoader] = useState(false);
  const [generatingLoader, setGeneratingLoader] = useState(false);
  const [progress, setProgress] = useState(0);

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<GenerateImageSchema>({
    defaultValues: {
      description: "",
      name: "",
    },
    resolver: zodResolver(generateImageSchema),
  });

  const handleUpload = async () => {};

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
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
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

        <Button disabled={generatingLoader}>
          {generatingLoader ? "Generating..." : "Generate Image"}
        </Button>
      </form>

      {image && (
        <>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Generated Image</h2>
            {generatingLoader ? (
              <Skeleton className="w-full h-96  rounded-lg flex items-center justify-center" />
            ) : (
              <>
                <NextImage
                  width={1000}
                  height={1000}
                  src={image.base64Data}
                  alt="Generated Car"
                  className="w-full h-[25rem] object-cover rounded-lg"
                />
              </>
            )}
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() =>
                setImage({
                  base64Data: "",
                  name: "",
                })
              }
            >
              Cancel
            </Button>
            <Button disabled={uploadLoader} onClick={handleUpload}>
              {uploadLoader ? "Uploading..." : "Upload Image"}
            </Button>
          </div>
        </>
      )}

      {progress > 0 && (
        <div className="mt-4 w-full">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-1">
            Uploading... {Math.round(progress)}%
          </p>
        </div>
      )}
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
