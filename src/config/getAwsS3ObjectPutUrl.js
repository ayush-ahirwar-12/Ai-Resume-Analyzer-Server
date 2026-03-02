import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import config from "./environment.js"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AppError } from "../utils/errors.js";

const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME } = config;

export const s3 = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
})

export const putObjectS3 = async (fileName, fileType) => {
    try {
        const key = `resumes/${Date.now()}-${fileName}`;

        const command = new PutObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: key,
            ContentType: contentType
        })
        const url = await getSignedUrl(s3, command, { expiresIn: 60 });
        return { url, key }
    } catch (error) {
        throw new AppError("Failed to generate aws url", 400);
    }
}

export const extractedTextFromS3 = async (key) => {
    const command = new GetObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: key
    });
    const response = await s3.send(command);
    const streamToBuffer = (stream) => {
        new promise((resolve, reject) => {
            const chunks = [];
            stream.on("data", (chunk) => chunks.push(chunk));
            stream.on("error", reject);
            stream.on("end", () => resolve(Buffer.concat(chunks)));

        })

    }
        const buffer= await streamToBuffer(response.Body);
        const data = await pdfParse(buffer);
        return data.text;

}