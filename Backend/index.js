import express from "express";
import cors from "cors";
import { config } from "dotenv";

// Database Config
import db from "./config/db.js";

// Import Routes
import routes from "./routes/index.js";

// Configuration
config();
const app = express();
const port = process.env.PORT || 2020;
app.use(express.json());
app.use(cors());

// DB Connection
db.then(() => {
  return console.log("Connected To The Database");
}).catch((e) => console.log(e));

// Routes
app.use("/api", routes);

// Handle 404
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: "Requested resource not found" });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port} 🔥`);
});
