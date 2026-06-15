import { Document, Schema, Types, model } from 'mongoose'

export interface ITransaction extends Document {
  amount: number,
  type: 'income' | 'expense',
  category: string, 
  description?: string,
  date: Date,
  organizationId: Types.ObjectId,
  createdBy: Types.ObjectId,   
  createdAt: Date,
  updatedAt: Date
}

const TransactionSchema = new Schema<ITransaction>(
  {
    amount: { type: Number, required: true, min: [0.01, 'Amount must be greater than zero'] },
    category: { type: String, required: true, trim: true },
    type: { type: String, enum: ['income','expense'], required: true },
    description: { type: String, trim: true },
    date: { type: Date, required: true, default: Date.now },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

TransactionSchema.index({organizationId: 1, date: -1})

export default model<ITransaction>('Transaction', TransactionSchema)