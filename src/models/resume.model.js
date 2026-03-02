import mongoose from "mongoose"

const resumeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,

    },
    fileName:{
        type: String,
        required:true
    },
    s3Key:{
        type : String,
        required:true
    },
    extractedText:{
        type: String
    },
},{timestamps:true});


export default mongoose.model("resume",resumeSchema);