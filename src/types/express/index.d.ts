export {};

declare global {
  namespace Express {
    interface Request {
      customData: SessionData;
    }

    interface SessionData {
      user: string;
      username: string;
    }
  }
}
