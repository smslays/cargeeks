const router = require("express").Router();
const multer = require("multer");
const { extname } = require("path");
const {
  createVehicle,
  deleteVehicle,
  getAllVehicle,
  getOneVehicle,
  updateVehicle,
} = require("../controllers/vehicle.controller");

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
  createVehicle
);
router.put(
  "/:id",
  upload.fields([
    { name: "interiorImages", maxCount: 10 },
    { name: "exteriorImages", maxCount: 10 },
  ]),
  updateVehicle
);
router.delete("/:id", deleteVehicle);
router.get("/:id", getOneVehicle);
router.get("/", getAllVehicle);

module.exports = router;
