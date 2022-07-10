import { body } from "express-validator";

class AuthValidator {
  validateRegisterBody() {
    return [
      body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .normalizeEmail()
        .withMessage("You should provide valid email"),
      body("username")
        .notEmpty()
        .withMessage("Username required")
        .trim()
        .isLength({ min: 4 })
        .withMessage("Username must be at least 4 characters length"),
      body("password")
        .notEmpty()
        .withMessage("Password required")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters length"),
    ];
  }
  validateLoginBody() {
    return [
      body("username")
        .notEmpty()
        .withMessage("Username required")
        .trim()
        .isLength({ min: 4 })
        .withMessage("Username must be at least 4 characters length"),
      body("password")
        .notEmpty()
        .withMessage("Password required")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters length"),
    ];
  }
}

export default new AuthValidator();
