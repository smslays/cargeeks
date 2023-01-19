const VehicleModel = require("../models/vehicle.model");
class VehicleCtrl {
  static createVehicle(req, res) {
    const vehicle = req.body;
    if (req?.files?.interiorImages) {
      vehicle.interiorImages = req?.files?.interiorImages?.map(
        (file) => `cars/${file.filename}`
      );
    }
    if (req?.files?.exteriorImages) {
      vehicle.exteriorImages = req?.files?.exteriorImages?.map(
        (file) => `cars/${file.filename}`
      );
    }

    const vehicleDoc = new VehicleModel(vehicle);
    vehicleDoc
      .save()
      .then((result) => {
        res.status(201).send({ data: result, message: "Vehicle Created" });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .send({ message: "Could Not Create Vehicle", error: err });
      });
  }

  static updateVehicle(req, res) {
    const { id } = req.params;
    VehicleModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
      .then((result) => {
        res.status(200).send({ data: result, message: "Vehicle Updated" });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "Could Not Update Vehicle", error: err });
      });
  }

  static deleteVehicle(req, res) {
    const { id } = req.params;
    VehicleModel.findOneAndDelete({ _id: id })
      .then((result) => {
        res.status(200).send({ data: result, message: "Vehicle Deleted" });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "Could Not Delete Vehicle", error: err });
      });
  }

  static getOneVehicle(req, res) {
    const { id } = req.params;
    VehicleModel.findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ data: result, message: "Vehicle Details" });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "Vehicle not available", error: err });
      });
  }

  static getAllVehicle(req, res) {
    VehicleModel.find()
      .then((result) => {
        res.status(200).send({ data: result, message: "Vehicle List" });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "Vehicles not available", error: err });
      });
  }
}
module.exports = VehicleCtrl;
