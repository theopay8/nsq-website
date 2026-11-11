import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url"; // ← Ganti import ini

export const client = createClient({
  projectId: "ugswy94e",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // ← UBAH JADI FALSE (PENTING BUAT LOCALHOST)
});

const builder = createImageUrlBuilder(client); // ← Ganti jadi createImageUrlBuilder

export function urlFor(source) {
  return builder.image(source);
}
