import { IUploadManyArgs } from "./file.service";
import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import FileService from "@/resources/file/file.service";
import upload from "@/libs/multer";
import multer from "multer";
import asyncHandler from "express-async-handler";
import authenticatedMiddleware from "@/middleware/authenticated.middleware";
import constants from "@/config/constants";
import { MediaTypes } from "@/entity/Media";
import { Any } from "typeorm";

const { ROOT_URL } = constants;

class FileController implements Controller {
  public path = "/file";
  public single = "/file/single";
  public multiple = "/file/multiple";
  public router = Router();
  private fileService = new FileService();
  private fileSingle = upload.single("file");
  private fileMultiple = upload.array("files");

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.get(`${this.path}`, this.get);
    this.router.post(
      `${this.single}`,
      // authenticatedMiddleware,
      asyncHandler(this.upload)
    );
    this.router.post(
      `${this.multiple}`,
      // authenticatedMiddleware,
      asyncHandler(this.uploadMany)
    );
  }

  private get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    res.status(201).json({ file: "file upload service" });
  };

  private upload = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { type } = req.body;

      this.fileSingle(req, res, async (err: any) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).send({ message: err.message });
        } else if (err instanceof Error) {
          return res.status(400).send({ message: err.message });
        } else if (req.file == undefined) {
          return res.status(400).send({ message: "File required" });
        }
        const userId = req.user?.id;
        const mediaURL = `${ROOT_URL}/${req.file?.mimetype.split("/")[0]}/${
          req.file?.filename
        }`;
        const mediaType = req.file?.mimetype
          .split("/")[0]
          .toUpperCase() as MediaTypes;

        if (!userId || !mediaType || !mediaURL)
          throw new HttpException(400, "bad request");

        await this.fileService.upload(userId!, mediaURL, mediaType);

        // switch (type) {
        //   case "PROFILE_IMG":
        //       await this.fileService.uploadProfileImage(userId!, mediaURL)
        //     break;
        //     case "POST_MEDIA":
        //       await this.fileService.uploadPostMedia(userId!, mediaURL)
        //     break;
        //   default:
        //     break;
        // }

        return res.status(200).send({
          message: `Image uploaded successfully`,
          url: `${ROOT_URL}/${req.file.mimetype.split("/")[0]}/${
            req.file.filename
          }`,
        });
      });
    }
  );
  private uploadMany = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?.id;

      if (!userId) throw new HttpException(400, "bad request");

      this.fileMultiple(req, res, async (err: any) => {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          return res.status(400).send({ message: err.message });
        } else if (err instanceof Error) {
          // An unknown error occurred when uploading.
          return res.status(400).send({ message: err.message });
        }

        const files: Express.Multer.File[] = req.files as Express.Multer.File[];

        let uploadManyArgs = files?.map(
          (file: Express.Multer.File): IUploadManyArgs => {
            const url = `${ROOT_URL}/${file.mimetype.split("/")[0]}/${
              file.filename
            }` as string;
            return {
              mediaURL: url,
              mediaType: file.mimetype
                .split("/")[0]
                .toUpperCase() as MediaTypes,
            };
          }
        );
        if (!uploadManyArgs.length) throw new HttpException(400, "bad request");

        await this.fileService.uploadMany(userId, uploadManyArgs);

        return res
          .status(200)
          .send({ message: "Images uploaded successfully" });
      });
    }
  );
}

const uploadSingle = async () => {};
const uploadMany = async () => {};

export default FileController;
