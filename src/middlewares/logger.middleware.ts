import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request...' + req);
  res.on('finish', () => {
    console.log('finished request');
  });
  next();
}
