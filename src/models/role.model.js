import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ["admin","user"],
    lowercase: true,
    trim: true,
  },
  description:{
    type:String,
    required:true,
    trim:true
  }
});
