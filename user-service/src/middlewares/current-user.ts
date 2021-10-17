import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {UserEntity} from "../models/user";

declare module 'express-session' {
    interface SessionData {
        jwt?: string
    }
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserEntity;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(
            req.session.jwt,
            process.env.JWT_KEY!
        ) as UserEntity;
        req.currentUser = payload;
    } catch (err) {
    }

    next();
};
