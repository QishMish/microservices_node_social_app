// import HttpException from '@/utils/exceptions/http.exception';
// import { Request, Response, NextFunction } from 'express';

// function fileValidateMiddleware(
//   req: Request,
//   res: Response,
//   _next: NextFunction
// ): void {
//   console.log(req);
//   if (!req.files) {
//     return _next(new HttpException(400, 'File required'));
//   }
//   _next();
// }

// export default fileValidateMiddleware;
