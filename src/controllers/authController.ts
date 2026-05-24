import { Request, Response, NextFunction } from 'express'
import Organization from '../models/Organization'
import User from '../models/User'
import { generateToken } from '../config/jwt'

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<void> => {

    try {

        const {name, email, password, organizationName} = req.body

        if (!name || !email || !password || !organizationName) {
            res.status(400).json({success:false, message:'All fields are required'})
            return
        }
        
        const existigUser = await User.findOne({email})
        if(existigUser) {
            res.status(409).json({success:false, message: 'Email already registered'})
            return
        }

        const organization = await Organization.create({
            name: organizationName,
            email,
        })

        const user = await User.create({
            name,
            email,
            password,
            role: 'admin',
            organizationId: organization._id,
        })

        const token = generateToken({
            userId: user._id,
            organizationId: organization._id,
            role: user.role,
        })

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                organizationId: user.organizationId,
            },
        })

    } catch (error) {
    next(error)
    }
}