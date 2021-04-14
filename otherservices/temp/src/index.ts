import express from "express";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import fs from "fs";
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

cloudinary.v2.config({
  cloud_name: "daers",
  api_key: "699873113773439",
  api_secret: "remNMRZNIirzsLNu6Tibe7O65Cg",
});
// cloudinary.v2.uploader.upload(
//   "https://res.cloudinary.com/demo/image/upload/sample.jpg",
//   function (error, result) {
//     console.log(result, error);
//   }
// );
declare global {
  namespace Express {
    interface Request {
      file?: any;
    }
  }
}
app.post("/photo", (req, res) => {
  const { file } = req.body;
  console.log(req.file);
  res.send({ message: file });
});
app.get("/photo", (req, res) => {
  res.send({ message: "found" });
});
app.listen(6000, () => {
  console.log("listening to 6000");
});
