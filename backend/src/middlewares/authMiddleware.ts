import { Request, Response, NextFunction } from 'express';
import { getUserFromRequest } from '../utils/getUserFromRequest';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const authData = await getUserFromRequest(req);
  if (!authData) return res.status(401).json({ error: 'Unauthorized' });

  (req as any).user = authData.user;
  (req as any).supabase = authData.supabase;
  next();
};
