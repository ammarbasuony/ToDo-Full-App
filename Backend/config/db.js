import mongoose from "mongoose";
import { config } from "dotenv";
config();

mongoose.set("strictQuery", false);
const connection = mongoose.connect(process.env.DB_URL);

export default connection;
