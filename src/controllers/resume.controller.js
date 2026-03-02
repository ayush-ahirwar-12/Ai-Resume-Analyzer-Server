import { putObjectS3 } from "../config/getAwsS3ObjectPutUrl";
import { AppError } from "../utils/errors";

class resumeController {
    getUploadUrl = async (req, res) => {
        try {
            const { fileName, fileType } = req.body;
            if (!fileName || !fileType) {
                return res.status(400).json({ message: "Missing file info" });
            }
            const { url, key } = await putObjectS3(fileName, fileType);

            res.status(200).json({
                success: true,
                url,
                key,
            });
        } catch (error) {
            throw new AppError("Failed to generate upload url", 500)
        }
    }
}