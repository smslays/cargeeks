const {
  userLogin,
  validateAccessToken,
  sendPasswordResetlink,
  refreshToken,
} = require("../controllers/auth.controller");

const router = require("express").Router();
const authorize = require("../helpers/middlewares/authorization");

router.post("/user-login", userLogin);
router.post("/validate-token", validateAccessToken);
router.post("/refresh-token", refreshToken);
router.post("/password-reset-link", sendPasswordResetlink);
module.exports = router;
