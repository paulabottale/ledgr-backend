import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

interface TokenPayload {
    userId: mongoose.Types.ObjectId
    organizationId: mongoose.Types.ObjectId
    role: string
}

export const generateToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: '1d'})
}

