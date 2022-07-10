import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import FileService from "@/resources/file/file.service";
import upload from "@/libs/multer";
import multer from "multer";
import asyncHandler from "express-async-handler";
import authenticatedMiddleware from "@/middleware/authenticated.middleware";

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
      console.log(req.body)
      this.fileSingle(req, res, (err: any) => {
        const { ROOT_URL } = process.env;

        if (err instanceof multer.MulterError) {
          return res.status(400).send({ message: err.message });
        } else if (err instanceof Error) {
          return res.status(400).send({ message: err.message });
        } else if (req.file == undefined) {
          return res.status(400).send({ message: "File required" });
        }
        return res.status(200).send({
          message: `Image uploaded successfully`,
          url:`${ROOT_URL}/${
            req.file.mimetype.split("/")[0]
          }/${req.file.filename}`
        });
      });
    }
  );
  private uploadMany = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      this.fileMultiple(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          return res.status(400).send({ message: err.message });
        } else if (err instanceof Error) {
          // An unknown error occurred when uploading.
          return res.status(400).send({ message: err.message });
        }
        return res.status(200).send({ message: "Image uploaded successfully" });
      });
    }
  );
}

export default FileController;
