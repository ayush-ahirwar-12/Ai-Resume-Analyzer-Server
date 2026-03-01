import { S3Client } from "@aws-sdk/client-s3";
import config from "./environment.js"

const {AWS_ACCESS_KEY,AWS_SECRET_KEY} =config;

export const s3= new S3Client({
    region:"ap-south-1",
    credentials:{
        accessKeyId:AWS_ACCESS_KEY,
        secretAccessKey:AWS_SECRET_KEY
    }
})