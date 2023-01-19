const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");
const { verifyToken } = require("../token");

const authorize = (roles = []) => {
  // roles=["admin","superAdmin"]
  return (req, res, next) => {
    //     console.log("Token", req.headers);
    // const token = req.headers["Authorization"];
    const token = req.headers.authorization;
    console.log("Token", token);

    const sendErrorResponse = (statusCode, message, error) => {
      res.status(statusCode).send({ error, message });
    };

    if (token) {
      //if token is available then verify it
      let payload;
      try {
        payload = verifyToken(token);
        console.log("payload", payload);
      } catch (err) {
        console.log("token expired...", err);
        if (err instanceof TokenExpiredError) {
          //token expired error
          return sendErrorResponse(406, "token expired", null);
        } else if (err instanceof JsonWebTokenError) {
          //fake token
          console.log("fake token ...");
          return sendErrorResponse(
            403,
            "Login first to access the source",
            null
          );
        }
      }

      if (!payload?.id) {
      } else if (roles.includes(payload.role)) {
        // if current user role is available in the allowed role then allow further access
        return next();
      } else {
        return res
          .status(401)
          .send({ error: null, message: "You do not have permissions" });
      }
    } else {
      // if there is no token then send forbidden response
      return res
        .status(403)
        .send({ error: null, message: "Login first to access the resource" });
    }
    next();
  };
};

module.exports = authorize;
