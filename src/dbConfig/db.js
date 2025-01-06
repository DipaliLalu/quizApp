import mongoose from "mongoose";

export async function connect() {
  
  try {
    mongoose.connect(process.env.MONGO_URL)
    const connection=mongoose.connection
    connection.on('connected',()=>{
        console.log('MongoDB connected')
    })
    connection.on('error',(error)=>{
        console.log('MongoDB connection error, please make sure db is up and runnig'+error);
        
    })
  } catch (error) {
    console.log('something went wrong in connection to db.');
    console.log(error);
  }   
}