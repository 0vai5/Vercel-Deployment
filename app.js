import express from "express";
import dotenv from "dotenv";
import upload from "./middlewares/upload.js"
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json({ message: "File uploaded successfully!", data: result });
  } catch (error) {
    res.status(500).json({ message: "File upload failed!", error });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
