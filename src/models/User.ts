import mongoose, { Document, Schema, model } from 'mongoose' 
// Document: el tipo base que le da a cada registro métodos como .save() y propiedades como ._id
// Schema: la herramienta para definir la estructura
import bcrypt from 'bcryptjs' // hashear contraseñas y encriptarlas 

export interface IUser extends Document {
    name: string,
    email: string,
    password: string, 
    role: 'admin' | 'member', // union type — solo puede ser literalmente 'admin' o 'member', nada más, y TypeScript te marca error si intentás asignar otra cosa
    organizationId: mongoose.Types.ObjectId, // es de tipo ObjectId porque guarda la referencia a la organización (la pieza clave del multi-tenant)
    createdAt: Date,
    updatedAt: Date, 
    comparePassword(candidatePassword: string): Promise <boolean>
}

const UserSchema = new Schema<IUser>({
    name:{ type: String, required: true, trim: true },
    // required: true, significa que no se puede guardar un usuario sin nombre
    // trim: true, recorta espacios al principio y al final automáticamente
    email:{ type: String, required: true, unique: true, lowercase: true, trim: true },
    // unique: true, impide que dos usuarios tengan el mismo email
    // lowercase: true, lo convierte todo a minúsculas antes de guardar
    password:{ type: String, required: true, minlength: 8 },
    // minlenght: 8,  valida que la contraseña tenga al menos 8 caracteres antes de aceptarla
    role:{ type: String, enum: ['admin','member'], default: 'member' },
    // enum: es el equivalente del union type pero a nivel base de datos
    // default: member, si no especificás rol, el usuario nace como member (el más restrictivo, que es lo seguro por defecto)
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
},
    {timestamps: true}
)

// hook de pre guardado
UserSchema.pre('save', async function () {
    if(!this.isModified('password')) return
    this.password = await bcrypt.hash(this.password,12)
})

// metodo para comparar contraseñas
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise <boolean> {
    return bcrypt.compare(candidatePassword, this.password)
}

export default model<IUser>('User', UserSchema)