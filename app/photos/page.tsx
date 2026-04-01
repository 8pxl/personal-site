import PhotosParallaxGrid from "@/components/photos/PhotosParallaxGrid";
import { photos } from "@/components/photos/photosManifest";

export default function Photos() {
  return <PhotosParallaxGrid photos={photos} />;
}
