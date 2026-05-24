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

export const login = async (
    req: Request,
    res: Response, 
    next: NextFunction,
): Promise<void> => {
    try {
    
    const {email, password} = req.body

    if (!email || !password) {
        res.status(400).json({success: false, message:'Email and Password are required'})
        return
    }

    const user = await User.findOne({email})
    if (!user) {
        res.status(401).json({success: false, message: 'Invalid credentials'})
        return
    }        

    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid) {
        res.status(401).json({success: false, message: 'Invalid credentials'})
        return
    }

    const token = generateToken({
        userId: user._id,
        organizationId: user.organizationId,
        role: user.role
    })

    res.status(200).json({
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

export const getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const user = await User.findById(req.user?.userId).select('-password')

        if(!user) {
            res.status(401).json({success: false, message:'User not found'})
            return
        }

        res.status(200).json({success: true, user})

    } catch (error) {
    next(error)
    }
}