import dotenv from "dotenv"
dotenv.config();

export default {
    MONGO_URI:process.env.MONGO_URI,
    PORT:process.env.PORT,
    REDIS_PORT:process.env.REDIS_PORT,
    REDIS_HOST:process.env.REDIS_HOST,
    REDIS_PASSWORD:process.env.REDIS_PASSWORD,
    BREVO_API_KEY:process.env.BREVO_API_KEY,
    REFRESH_SECRET:process.env.REFRESH_SECRET,
    JWT_SECRET:process.env.JWT_SECRET,
    REFRESH_EXPIRES:process.env.REFRESH_EXPIRES
};