import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: "ugswy94e",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Helper: Get document by slug
export async function getDocumentBySlug(type, slug) {
  return client.fetch(`*[_type == "${type}" && slug.current == "${slug}"][0]`);
}

// Helper: Get document by _id
export async function getDocumentById(type, id) {
  return client.fetch(`*[_type == "${type}" && _id == "${id}"][0]`);
}
