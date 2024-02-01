import { config } from "dotenv";

config();

export default {
    DB_URI: process.env.DB_URI,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_kEY || "secrett",
    EXPIRATION_TIME: process.env.EXPIRATION_TIME
}