import express from "express";
import dotenv from "dotenv";
import upload from "./middlewares/upload.js"
import uploadFile from "./utils/uploader.js";
import cron from "node-cron";
import sendEmail from "./utils/nodemailer.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


console.log(Buffer.from("hello world"))


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {

    console.log(req.file);

    const result = await uploadFile(req.file.buffer);
    console.log(result);


    res.json({ message: "File uploaded successfully!", data: result });
  } catch (error) {
    res.status(500).json({ message: "File upload failed!", error });
  }
});

// Schedule a cron job to run every second
cron.schedule("* * * * * ", async () => {
  try {
    const email = await sendEmail("smit@mailinator.com");
    console.log("Cron job executed successfully:", email);
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
