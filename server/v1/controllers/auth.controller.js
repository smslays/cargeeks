const { compare } = require("bcryptjs");
const sendEmail = require("../helpers/email");

const { generateToken, verifyToken } = require("../helpers/token");
const { pickUser } = require("../helpers/user-utilities");
const UserModel = require("../models/user.model");
const _ = require("lodash");
const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");
class AuthCtrl {
  static userLogin(req, res) {
    //get email and password
    const { email, password } = req.body;
    UserModel.findOne({ status: "active", email })
      .then((result) => {
        console.log("Result: ", result);
        if (!result?._id)
          res.status(404).send({
            error: null,
            message: "Invalid email or user is inactive",
          });
        else if (compare(password, result?.password)) {
          //email and password are correct
          // generate a token
          const accessToken = generateToken(
            {
              role: result?.role,
              id: result?._id,
              email: result?.email,
            },
            15 * 60
          );
          const refreshToken = generateToken(
            {
              role: result?.role,
              id: result?._id,
              email: result?.email,
            },
            60 * 60
          );
          //send success response
          res.set("x-accessToken", accessToken);
          res.set("x-refreshToken", refreshToken);
          res
            .status(201)
            .send({ data: pickUser(result), message: "Login Successful" });
        } else {
          res.status(404).send({ message: "Invalid password", error: null });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  static validateAccessToken(req, res) {
    let token = req?.headers?.authorization
      ? req?.headers?.authorization
      : req?.body?.token;
    const sendErrorResponse = (statusCode, message, error) => {
      res.status(statusCode).send({ error, message });
    };
    let payload;

    try {
      payload = token && verifyToken(token);
      if (payload) {
        res
          .status(200)
          .send({ message: "Token is valid", data: { id: payload?.id } });
      } else {
        sendErrorResponse(403, "Invalid Token", null);
      }
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        //token expired error
        console.log("token expired...");
        sendErrorResponse(406, "token expired", null);
      } else if (err instanceof JsonWebTokenError) {
        //fake token
        console.log("fake token ...");
        sendErrorResponse(403, "Login first to access the source", null);
      }
    }
  }
  //validateAccessToken

  static sendPasswordResetlink(req, res) {
    const { email } = req.body;

    UserModel.findOne({ email })
      .then((result) => {
        if (!result) throw new Error("Invalid email");

        // create a token
        const token = generateToken({
          id: result?._id,
          role: result?.role,
          email,
        });
        // generate a  link
        const link = `${req?.headers?.origin}/reset-password/${token}`;

        const textbody = `To change the password copy the below link and paste in address bar ${link}
        The link is valid only for 10 minutes
        `;
        const htmlbody = `<p>To change the password copy the below link and paste in address bar or click on the link</p>
        <a href="${link}" target="_blank">Click here</a>
        <p>The link is valid only for 10 minutes</p>
        `;
        // send the link through email
        sendEmail(
          email,
          "shubhammulay99@gmail.com",
          "Password Reset Link",
          textbody,
          htmlbody
        )
          .then((data) => {
            console.log(data);
            res.status(200).send({ message: "Email sent", data: null });
          })
          .catch((err) => {
            console.log(err);
            res
              .status(404)
              .send({ error: err, message: "Could not send Email" });
          });
      })
      .catch((err) => {
        res.status(404).send({ error: err, message: "Invalid email address" });
      });
  }

  static refreshToken(req, res) {
    const { refreshToken } = req.body;
    const handleErrorResponse = (
      status = 500,
      message = "Could not perform operation",
      error
    ) => {
      res.status(status).send({ message, error });
    };
    let payload;
    try {
      payload = verifyToken(refreshToken);
      const newPayload = _.pick(payload, ["role", "id", "email"]);
      if (payload) {
        // if payload is valid then generate both token and send success
        const accessToken = generateToken(newPayload, 15 * 60);
        const refreshToken = generateToken(newPayload, 60 * 60);
        res.status(200).send({
          message: "Token generated",
          data: { accessToken, refreshToken },
        });
      } else {
        handleErrorResponse(500, "Refresh token expired", null);
      }
    } catch (e) {
      console.log(e);
      handleErrorResponse(500, "Could not verify token", null);
    }
  }
}
module.exports = AuthCtrl;
