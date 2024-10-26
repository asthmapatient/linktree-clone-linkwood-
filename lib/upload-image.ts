// import { resolve } from "path";
// import cloudinary from "./cloudinary";
// import { error } from "console";
// export async function uploadImage(file: File) {
//   try {
//     const buffer = await file.arrayBuffer();
//     const byte = Buffer.from(buffer);
//     // const result = new Promise(async (resolve, reject) => {
//     //   await cloudinary.uploader.upload_stream({
//     //     resource_type: "auto",
//     //     folder: "linkwood",
//     //   });

//     // });

//     // const result = await new Promise((resolve, reject) => {
//     //   cloudinary.uploader.upload_stream(
//     //     {
//     //       resource_type: "auto",
//     //       folder: "linkwood",
//     //     },
//     //     (error, result) => {
//     //       if (error) {
//     //         return reject(error);
//     //       }
//     //       // Resolve the promise with the result
//     //       resolve(result);
//     //     }
//     //   );
//     // });
//     const result = await cloudinary.uploader.upload(
//       `data:image/jpeg;base64,${byte.toString("base64")}`,
//       {
//         resource_type: "auto",
//         folder: "linkwood",
//       }
//     );
//     return result;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// }
import cloudinary from "./cloudinary";
import crypto from "crypto";

// Function to generate SHA-256 hash of the file content
async function generateFileHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hash = crypto
    .createHash("sha256")
    .update(Buffer.from(buffer))
    .digest("hex");
  return hash;
}

// Function to check if image with a specific hash exists in Cloudinary
async function checkIfImageExists(hash: string) {
  try {
    // Search for the image in Cloudinary using the hash (stored as context metadata)
    const result = await cloudinary.api.resources_by_context("hash", hash, {
      resource_type: "image",
      context: true,
    });

    // If the image exists, return its URL
    if (result.resources && result.resources.length > 0) {
      return result.resources[0].secure_url;
    }
    return null; // File not found
  } catch (error: any) {
    throw new Error(`Error checking for existing image: ${error.message}`);
  }
}

// Main function to upload image or return existing one
export async function uploadImage(file: File) {
  try {
    // Step 1: Generate a unique hash for the file
    const hash = await generateFileHash(file);

    // Step 2: Check if the file already exists in Cloudinary
    const existingUrl = await checkIfImageExists(hash);
    if (existingUrl) {
      // If file exists, return the existing URL
      return existingUrl;
    }

    // Step 3: If file doesn't exist, convert it to base64
    const buffer = await file.arrayBuffer();
    const byte = Buffer.from(buffer);
    const base64Image = `data:image/jpeg;base64,${byte.toString("base64")}`;

    // Step 4: Upload the base64-encoded image to Cloudinary
    const result = await cloudinary.uploader.upload(base64Image, {
      resource_type: "auto",
      folder: "linkwood",
      context: `hash=${hash}`, // Store the hash in context metadata for future checks
    });

    // Step 5: Return the newly uploaded image's URL
    return result.secure_url
  } catch (error: any) {
    throw new Error(`Error uploading or checking image: ${error.message}`);
  }
}

