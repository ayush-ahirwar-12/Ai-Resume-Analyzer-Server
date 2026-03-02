import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import config from "./environment.js"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const {AWS_ACCESS_KEY,AWS_SECRET_KEY,AWS_BUCKET_NAME} =config;

export const s3= new S3Client({
    region:"ap-south-1",
    credentials:{
        accessKeyId:AWS_ACCESS_KEY,
        secretAccessKey:AWS_SECRET_KEY
    }
})

export const putObject= async (fileName,fileType)=>{
    const command = new PutObjectCommand({
        Bucket:AWS_BUCKET_NAME,
        Key:`resumes/${Date.now()}-${fileName}`,
        ContentType:fileType
    })
    return await getSignedUrl(s3,command,{expiresIn:60});
}