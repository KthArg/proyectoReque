import { defineCollection, z } from "astro:content";

const materialsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    category: z.string(),
    // --- ESTA ES LA LÍNEA CORREGIDA ---
    pubDate: z.string().transform((str) => new Date(str)),
  }),
});

const centersCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    address: z.string(),
    phone: z.string().optional(),
    hours: z.string(),
    acceptedMaterials: z.array(z.string()),
  }),
});

export const collections = {
  materials: materialsCollection,
  centers: centersCollection,
};