import mongoose from "mongoose"

const connectDB = async (): Promise<void> => { // ts : Promise<void> promise porque es async y void porque no retorna ningun valor
    try {
        const mongoURI = process.env.MONGODB_URI

        if(!mongoURI){
            throw new Error('MONGODB_URI is not defined in enviroment variables')
        }

        await mongoose.connect(mongoURI)
        console.log('MongoDB connected successfuly')

    } catch (error) {
        console.error('MongoDB connection error:', error)
        process.exit(1) // si la base de datos no conecta, el servidor se apaga 
    }
}

export default connectDB
