import mongoose, { Document, Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
    name: string,
    email: string,
    password: string, 
    role: 'admin' | 'member',
    organizationId: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date, 
    comparePassword(candidatePassword: string): Promise <boolean>
}

const UserSchema = new Schema<IUser>({
    name:{ type: String, required: true, trim: true },
    email:{ type: String, required: true, unique: true, lowercase: true, trim: true },
    password:{ type: String, required: true, minlength: 8 },
    role:{ type: String, enum: ['admin','member'], default: 'member' },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
},
    {timestamps: true}
)


UserSchema.pre('save', async function () {
    if(!this.isModified('password')) return
    this.password = await bcrypt.hash(this.password,12)
})


UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise <boolean> {
    return bcrypt.compare(candidatePassword, this.password)
}

export default model<IUser>('User', UserSchema)