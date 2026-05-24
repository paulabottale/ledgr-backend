import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface DecodedToken {
    userId: string
    organizationId: string
    role: string
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({success: false, message: 'No token provided'})
            return
        }

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken

        req.user = {
            userId: decoded.userId,
            organizationId: decoded.organizationId,
            role: decoded.role,
        }

        next()

    } catch (error) {
        res.status(401).json({success: false, message: 'Invalid or expired token'})
    }
}