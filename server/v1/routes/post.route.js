const router = require("express").Router();
const multer = require("multer");
const { extname } = require("path");
const {
  createPost,
  updatePost,
  deletePost,
  getAllPost,
  getOnePost,
  getFilterDetails,
} = require("../controllers/post.controller");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/cars");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
router.post(
  "/",
  upload.fields([
    { name: "interiorImages", maxCount: 10 },
    { name: "exteriorImages", maxCount: 10 },
  ]),
  createPost
);
router.put(
  "/:id",
  upload.fields([
    { name: "interiorImages", maxCount: 10 },
    { name: "exteriorImages", maxCount: 10 },
  ]),
  updatePost
);
router.delete("/:id", deletePost);
router.get("/filter-details", getFilterDetails);
router.get("/:id", getOnePost);
router.get("/", getAllPost);
module.exports = router;
