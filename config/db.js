import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://abhishek:353535@cluster0.c5so3ov.mongodb.net/e-commerce").then(()=>console.log("DB Connected"))
}