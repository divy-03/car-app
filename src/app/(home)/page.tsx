import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CarIcon, Plus } from "lucide-react";
import { Image } from "@imagekit/next";
import Link from "next/link";
import { Suspense } from "react";
import { Filters } from "./filters";
import { getCars } from "@/lib/actions/cars-action";
import SearchBar from "./component";

type Car = {
  id: string;
  name: string;
  brand: string;
  year: number;
  mileage: number;
  price: number;
  images: string[];
};

export default async function Home(props: {
  searchParams: Promise<{ type?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <main className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/car.jpg"
            alt="Hero car"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center  px-4">
          <h1 className="text-5xl font-bold mb-6 text-white">
            Find Your Perfect Car
          </h1>
          <p className="text-xl mb-8 text-white">
            Browse through thousands of quality vehicles
          </p>

          {/* Search Bar */}
          <SearchBar />
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2 justify-between items-center">
            <h2 className="text-3xl font-bold">Featured Cars</h2>
            <Link href={"/cars"} className="mt-2 hover:underline">View All</Link>
          </div>
          <div className="flex gap-2">
            <Filters />

            <Button asChild>
              <Link href="/cars/add">
                <Plus className="mr-2 h-4 w-4" /> Add Listing
              </Link>
            </Button>
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
            <FeaturedCars searchParams={searchParams} />
          </Suspense>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-neutral-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map(
              (feature: { title: string; description: string }, index) => (
                <div key={index} className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CarIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

const FeaturedCars = async ({
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

const features = [
  {
    title: "Verified Dealers",
    description:
      "All our dealers are thoroughly vetted and verified to ensure quality service",
  },
  {
    title: "Secure Transactions",
    description: "Your purchases are protected with our secure payment system",
  },
  {
    title: "Quality Guarantee",
    description: "Every vehicle undergoes a rigorous inspection process",
  },
];
