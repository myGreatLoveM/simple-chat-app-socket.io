import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log('Database connection established')
    } catch (error) {
        console.log('Coudnt connect to database', error.message)
        console.log(error)  
        process.exit(1)
    }
}

export default connectDB
