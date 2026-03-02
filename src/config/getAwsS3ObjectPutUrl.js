import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import config from "./environment.js"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME } = config;

export const s3 = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
})

export const putObjectS3 = async (req, res) => {
    try {
        const {contentType } = req.body;
        if (!contentType) {
            throw new Error("Please provide the fileName and contentType ");
        }

        const command = new PutObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: `resumes/${Date.now()}-jj`,
            ContentType: contentType
        })
        const url = await getSignedUrl(s3, command, { expiresIn: 60 });
        res.status(200).json(url)
    } catch (error) {
        res.status(500).json(error?.message);
        console.log(error);
    }
}