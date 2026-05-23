import { Document, Schema, model } from 'mongoose'

export interface IOrganization extends Document {
  name: string
  email: string
  plan: 'free' | 'pro'
  createdAt: Date
  updatedAt: Date
}

const OrganizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    plan: { type: String, enum: ['free', 'pro'], default: 'free' },
  },
  { timestamps: true }
)

export default model<IOrganization>('Organization', OrganizationSchema)