import photoA from "@/assets/mqi-images/DSC02189.JPG";
import photoB from "@/assets/mqi-images/DSC02176.JPG";
import photoC from "@/assets/mqi-images/DSC02156.JPG";
import photoD from "@/assets/mqi-images/DSC01554.JPG";
import photoE from "@/assets/mqi-images/DSC00759.JPG";
import photoF from "@/assets/mqi-images/DSC02163.JPG";
import photoG from "@/assets/mqi-images/DSC02164.JPG";
import photoH from "@/assets/mqi-images/DSC02173.JPG";
import photoI from "@/assets/mqi-images/IMG_8904.jpeg";
import photoJ from "@/assets/mqi-images/IMG_8936.jpeg";
import photoK from "@/assets/mqi-images/IMG_8961.jpeg";
import photoL from "@/assets/mqi-images/IMG_8991.jpeg";
import photoM from "@/assets/mqi-images/IMG_8998.jpeg";

/** Primary hero — student photography */
export const heroImage = photoE;

/** Hero collage — four large portraits, integrated into hero atmosphere */
export const heroCollagePhotos = [photoE, photoC, photoF, photoB] as const;

/** Default editorial collage (About, Homepage about block) */
export const editorialPhotos = [photoA, photoB, photoC, photoD] as const;

/** CTA band / banner photography */
export const ctaBandPhoto = photoC;

/** Program card fallback images (`/src/assets/mqi-images`) */
export const programCardPhotos = [
  photoE,
  photoC,
  photoF,
  photoI,
  photoB,
  photoG,
  photoH,
  photoJ,
  photoK,
  photoL,
  photoM,
  photoA,
  photoD,
] as const;

/** Gallery and carousel fallbacks */
export const galleryPhotos = programCardPhotos;
