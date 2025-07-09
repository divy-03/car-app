import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCars } from "@/lib/actions/cars-action";
import { Image } from "@imagekit/next";
import Link from "next/link";
import { Suspense } from "react";
import { Filters } from "../(home)/filters";

type Car = {
  id: string;
  name: string;
  brand: string;
  year: number;
  mileage: number;
  price: number;
  images: string[];
};

const CarsPage = async (props: {
  searchParams: Promise<{ type?: string; page?: string }>;
}) => {
  const searchParams = await props.searchParams;

  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">All Cars</h2>

        <div className="flex gap-2">
          <Filters />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense
          fallback={
            <div className="w-full h-[360px] bg-[#1a1a1a] p-4 rounded-xl shadow-md animate-pulse flex flex-col justify-between">
              <div className="h-48 bg-gray-700 rounded mb-4" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-gray-700 rounded" />
                <div className="h-4 w-1/2 bg-gray-700 rounded" />
                <div className="h-4 w-1/3 bg-gray-700 rounded" />
              </div>
            </div>
          }
        >
          <Cars searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
};

const Cars = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const type = searchParams?.type || "all";
  const page = Number(searchParams?.page || "1");

  // Explicitly type cars as Car[]
  const cars: Car[] = await getCars({ page, type });

  if (!cars || cars.length === 0) {
    return (
      <div className="col-span-3 text-center p-8 rounded-lg shadow-md">
        <p>Oops no cars found.</p>
        <p>Try tweaking filters</p>
      </div>
    );
  }

  return cars.map((car: Car) => (
    <Card key={car.id} className="overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={car.images[0]}
          alt={car.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:-translate-1"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-semibold">{car.name}</h3>
            <p className="text-sm text-gray-500">
              {car.year} • {car.mileage} miles
            </p>
          </div>
          <p className="text-xl font-bold text-primary">
            ${car.price.toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          <Button className="flex-1" asChild>
            <Link href={`/cars/${car.id}`}>View Details</Link>
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link href={`/contact/${car.id}`}>Contact Seller</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  ));
};

export default CarsPage;
