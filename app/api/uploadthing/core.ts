import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { jwtVerify } from "jose";

const f = createUploadthing();

// Pastikan SECRET_KEY tidak undefined
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in environment variables");
}

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      try {
        const token = req.cookies.get("token")?.value;

        if (!token) {
          throw new UploadThingError("Unauthorized: Token not found");
        }

        // Verifikasi token
        const { payload } = await jwtVerify(token, SECRET_KEY);
        console.log("Token valid", payload);

        return { userId: payload.sub }; // `sub` biasanya userId di JWT
      } catch (error) {
        console.error("JWT Verification Failed:", error);
        throw new UploadThingError("Unauthorized: Invalid token");
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(`Upload complete for userId: ${metadata.userId}`);
      console.log(`File URL: ${file.ufsUrl}`);

      return {
        uploadedBy: metadata.userId,
        fileUrl: file.ufsUrl, 
      };
    }),
    avatarAndBanner: f({
      image: {
        maxFileSize: "4MB",
        maxFileCount: 1,
      },
    })
      .middleware(async ({ req }) => {
        try {
          const token = req.cookies.get("token")?.value;
  
          if (!token) {
            throw new UploadThingError("Unauthorized: Token not found");
          }
  
          // Verifikasi token
          const { payload } = await jwtVerify(token, SECRET_KEY);
          console.log("Token valid", payload);
  
          return { userId: payload.sub }; // `sub` biasanya userId di JWT
        } catch (error) {
          console.error("JWT Verification Failed:", error);
          throw new UploadThingError("Unauthorized: Invalid token");
        }
      })
      .onUploadComplete(async ({ metadata, file }) => {
        console.log(`Upload complete for userId: ${metadata.userId}`);
        console.log(`File URL: ${file.ufsUrl}`);
  
        return {
          uploadedBy: metadata.userId,
          fileUrl: file.ufsUrl, 
        };
      }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
