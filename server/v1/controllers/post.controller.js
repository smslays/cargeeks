const PostModel = require("../models/post.model");
class PostCtrl {
  static createPost(req, res) {
    const post = req.body;

    if (req?.files?.interiorImages) {
      post.interiorImages = req?.files?.interiorImages?.map(
        (file) => `cars/${file.filename}`
      );
    }
    if (req?.files?.exteriorImages) {
      post.exteriorImages = req?.files?.exteriorImages?.map(
        (file) => `cars/${file.filename}`
      );
    }

    const postDoc = new PostModel(post);

    postDoc
      .save()
      .then((result) => {
        res.status(201).send({ data: result, message: "Post Created" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Could Not Create Post", error: err });
      });
  }

  static updatePost(req, res) {
    const { id } = req.params;
    const post = req.body;
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
    PostModel.findOneAndUpdate({ _id: id }, post, { new: true })
      .then((result) => {
        res.status(200).send({ data: result, message: "Post Updated" });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "Could Not Update Post", error: err });
      });
  }

  static deletePost(req, res) {
    const { id } = req.params;
    PostModel.findOneAndDelete({ _id: id })
      .then((result) => {
        res.status(200).send({ data: result, message: "Post Deleted" });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "Could Not Delete Post", error: err });
      });
  }

  static getOnePost(req, res) {
    const { id } = req.params;
    PostModel.findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ data: result, message: "Post Details" });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "Post not available", error: err });
      });
  }

  static getAllPost(req, res) {
    PostModel.find()
      .then((result) => {
        res.status(200).send({ data: result, message: "Post List" });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "Posts not available", error: err });
      });
  }

  static getFilterDetails(req, res) {
    PostModel.find({}, "brand fuelType")
      .then((result) => {
        const brandArr = Array.from(
          new Set(result?.map((doc) => doc.brand))
        ).filter((brand) => brand);

        const fuelTypeArr = Array.from(
          new Set(result?.map((doc) => doc.fuelType))
        ).filter((fuelType) => fuelType);

        res.status(200).send({
          data: { brand: brandArr, fuelType: fuelTypeArr },
          message: "Filter Data",
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ err: err, message: "Filter Data Not Found" });
      });
  }
}
module.exports = PostCtrl;
