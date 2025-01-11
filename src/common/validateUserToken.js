import jwt from "jsonwebtoken";
import strings from "../strings.js";

const validateUserToken = (token) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, strings.JWT_SECRET);
    return { valid: true, user: decoded };
  } catch (error) {
    // Handle specific token errors
    if (error.name === "TokenExpiredError") {
      return { valid: false, error: "Token has expired" };
    } else if (error.name === "JsonWebTokenError") {
      return { valid: false, error: "Invalid token" };
    } else {
      return { valid: false, error: "Unable to validate token" };
    }
  }
};

export default validateUserToken;
