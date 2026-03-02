import express from "express"
import { putObjectS3 } from "../config/getAwsS3ObjectPutUrl.js";

const router = express.Router();

router.post("/presignedurl-s3",putObjectS3);

export default router;