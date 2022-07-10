import multer, { FileFilterCallback, StorageEngine } from "multer";
import { Request } from "express";
import { v4 } from "uuid";
import path, { normalize } from "path";
import HttpException from "@/utils/exceptions/http.exception";
import fs from "fs";

type DestinationCallback = (
  error: Error | HttpException | null,
  destination: string
) => void;
type FileNameCallback = (
  error: Error | HttpException | null,
  filename: string
) => void;

enum ImageMimeTypes {
  jpeg,
  jpg,
  png,
  gif,
  bmp,
  ico,
  webp,
  svg,
  tif,
  tiff,
}
enum VideoMimeTypes {
  ts,
  webm,
  ogv,
  mp4,
  mpeg,
  avi,
  wmv,
  mov,
}

const fileStorage: StorageEngine = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    console.log(file);
    const dir = "./uploads";
    const imagePath = "./uploads/image";
    const videoPath = "./uploads/video";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      fs.mkdirSync(imagePath);
      fs.mkdirSync(videoPath);
    }
    if (Object.values(ImageMimeTypes).includes(file.mimetype.split("/")[1])) {
      return callback(null, normalize("./uploads/image"));
    }
    if (Object.values(VideoMimeTypes).includes(file.mimetype.split("/")[1])) {
      fs.mkdirSync(path + `/video`, { recursive: true });
      return callback(null, normalize("./uploads/video"));
    } else {
      return callback(
        new HttpException(400, "Invalid mime type"),
        normalize("./uploads/image")
      );
    }
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    callback(null, v4() + path.extname(file.originalname));
  },
});

export const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  callback(null, true);
};
const upload: multer.Multer = multer({
  storage: fileStorage,
  limits: { fileSize: 100000000 },
  fileFilter: fileFilter,
});

export default upload;
