import { Router } from "express";
import uploadImage, { uploadError } from "../middleware/upload/image";

const uploadRoutes = Router();

uploadRoutes.post(
  "/profile-picture",
  uploadImage.single("profile-picture"),
  uploadError
);
uploadRoutes.post("/resume", function (req, res) {
  res.status(200).json({ file: "resume" });
});

export default uploadRoutes;
