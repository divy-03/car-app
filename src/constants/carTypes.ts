export const carTypes = [
  "SEDAN",
  "SUV",
  "TRUCK",
  "COUPE",
  "CONVERTIBLE",
  "HATCHBACK",
  "MINIVAN",
  "WAGON",
  "SPORTS",
] as const;

export const carFuelTypes = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID"] as const;

export type CarType = (typeof carTypes)[number];
export type CarFuelType = (typeof carFuelTypes)[number];
