import { Request, Response, NextFunction } from 'express'
import Transaction from '../models/Transaction'

export const createTransaction = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try{
        const{ amount, type, category, description, date } = req.body

        if(!amount || !type || !category) {
            res.status(401).json({
                success: false,
                message: 'Amount, type and category are required'
            })
            return
        }

        const transaction = await Transaction.create({
            amount,
            type,
            category,
            description,
            date: date || new Date(),
            organizationId: req.user!.organizationId,
            createdBy: req.user!.userId,
        })

        res.status(201).json({success: true, transaction})
    } catch (error) {
        next(error)
    }
}

export const getTransactions = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { type, category } = req.query

        const filter: Record<string, unknown> = {
            organizationId: req.user!.organizationId
        }

        if(type) filter.type = type
        if(category) filter.category = category

        const transactions = await Transaction.find(filter).sort({date:-1})

        res.status(201).json({
            success: true,
            count: transactions.length,
            transactions,
        })

    } catch (error) {
        next(error)
    }
}

export const getTransactionById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
    try {
        const {id} = req.params

        const transaction = await Transaction.findOne({
            _id: id,
            organizationId: req.user!.organizationId,
        })


        if(!transaction) {
            res.status(404).json({success: false, message: 'Transaction not found'})
            return
        }

        res.status(200).json({success: true, transaction})

    } catch (error) {
        next(error)
    }
}

export const updateTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    const { amount, type, category, description, date } = req.body

    const updates: Record<string, unknown> = {}
    if (amount !== undefined) updates.amount = amount
    if (type !== undefined) updates.type = type
    if (category !== undefined) updates.category = category
    if (description !== undefined) updates.description = description
    if (date !== undefined) updates.date = date

    if (Object.keys(updates).length === 0) {
      res.status(400).json({
        success: false,
        message: 'No fields to update',
      })
      return
    }

    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, organizationId: req.user!.organizationId },
      updates,
      { returnDocument: 'after', runValidators: true }
    )

    if (!transaction) {
      res.status(404).json({ success: false, message: 'Transaction not found' })
      return
    }

    res.status(200).json({ success: true, transaction })
  } catch (error) {
    next(error)
  }
}

export const deleteTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const {id} = req.params

        const transaction = await Transaction.findOneAndDelete({
            _id: id,
            organizationId: req.user!.organizationId,
        })

        if(!transaction) {
            res.status(404).json({success: false, message: 'Transaction not found'})
            return
        }

        res.status(200).json({success: true, message: 'Transaction deleted successfully'})

    } catch (error) {
        next(error)
    }
}