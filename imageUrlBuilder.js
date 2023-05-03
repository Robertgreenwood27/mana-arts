import imageUrlBuilder from "@sanity/image-url";
import client from "./sanity.config";

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
