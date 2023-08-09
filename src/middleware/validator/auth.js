import { body } from "express-validator";
import User from "../../database/model/User";

export const registerValidator = [
  body("username").custom(async (value) => {
    const user = await User.findOne({
      where: {
        username: value,
      },
    });
    if (user) {
      throw new Error("Username already in use");
    }
  }),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password should be more than 6 characters"),
];

export const loginValidator = [
  // check email format
  body("email")
    .isEmail()
    .withMessage("Woi salah laa.")
    .custom(async function (value) {
      const user = await User.findOne({
        attributes: ["email"],
        where: {
          email: value,
        },
      });
      if (!user) {
        throw new Error("Email does not exist");
      }
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password should be more than 6 characters"),
];
