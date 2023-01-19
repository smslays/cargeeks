const router = require("express").Router();
const multer = require("multer");
const { extname } = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/user-profiles");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const {
  createUser,
  deleteUser,
  updateUser,
  getAllUser,
  getOneUser,
} = require("../controllers/user.controller");

const authorize = require("../helpers/middlewares/authorization");

router.post("/", upload.single("avatar"), createUser);
router.put("/:id", upload.single("avatar"), updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", authorize(["admin", "superadmin","customer"]), getOneUser);
router.get("/", authorize(["admin", "superadmin"]), getAllUser);

module.exports = router;
