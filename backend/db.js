import  dotenv  from "dotenv";
import  mongoose  from "mongoose";
dotenv.config(
    {
        path:'.env'
    }
)

// const mongoURI = 'mongodb://localhost:27017/';
const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.mongoURI);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export {connectToMongo};