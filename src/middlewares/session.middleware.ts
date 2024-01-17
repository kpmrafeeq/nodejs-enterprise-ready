import { Request, Response, NextFunction } from 'express';

export function SessionManager(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req.customData = { user: '', username: '' };
  res.on('finish', () => {
    console.log('finished request : ', req.customData.user);
  });
  next();
}
