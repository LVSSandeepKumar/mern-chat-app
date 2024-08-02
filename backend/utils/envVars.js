import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
    PORT : process.env.PORT,
    MONGODB_URI : process.env.MONGODB_URI,
    NODE_ENV : process.env.NODE_ENV,
    JWT_SECRET : process.env.JWT_SECRET
}