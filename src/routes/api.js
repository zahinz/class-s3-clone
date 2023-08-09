import { Router } from "express";
import User from "../database/model/User";
import uploadImage, {
  storeImage,
  uploadError,
} from "../middleware/upload/image";

const apiRoutes = Router();

apiRoutes.post(
  "/user",
  uploadImage.single("profile-picture"),
  uploadError,
  storeImage,
  async function (req, res) {
    const body = req.body;
    const protocol = req.protocol;
    const domain = req.get("host");
    try {
      const user = await User.create({
        ...body,
        profilePictureUrl: req.file.path,
      });
      res.status(200).json({
        message: "A user created",
        user: {
          ...user.dataValues,
          profilePictureUrl: `${protocol}://${domain}/${user.profilePictureUrl}`,
        },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export default apiRoutes;
