import { Router, Request, Response, NextFunction } from 'express';
import { DatabaseError } from 'pg';
import { ValidateError } from 'tsoa';

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export function HandleErrors(app: Router) {
  app.use(function notFoundHandler(_req, res: Response) {
    res.status(404).send({
      message: 'Not Found',
    });
  });

  app.use(function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    if (err instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(422).json({
        message: 'Validation Failed',
        details: err?.fields,
      });
    }
    if (err instanceof NotFoundError) {
      console.warn(`Caught Not Found Error for ${req.path}`);
      return res.status(404).json({
        message: 'Not Found',
      });
    }
    if (err instanceof DatabaseError) {
      console.warn(`Caught Database Error:`, err);
      return res.status(400).json({
        message: `Database Error: ${err.message}`,
      });
    }
    if (err instanceof Error) {
      console.warn(err);
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }

    next();
  });
}
