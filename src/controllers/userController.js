import connection from "../../db.js";
import { registerUser } from "../modules/userModule.js";
import strings from "../strings.js";
import jwt from "jsonwebtoken";

export const registerUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const result = await new Promise((resolve, reject) => {
      registerUser({ name, email, password }, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });

    console.log({
      message: "User registered successfully",
      data: result,
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", data: result });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let sql = `SELECT * FROM users WHERE email='${email}' `;
    connection.query(sql, async (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (result.length === 0) {
          return res.status(400).json({ message: "User not found" });
        }
        console.log("resurt=", result);
        if (result[0].password !== password) {
          return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
          { email: result[0].email, userId: result[0].userId },
          strings.JWT_SECRET,
          { expiresIn: "30d" }
        );
        res.status(200).json({
          message: "User logged in successfully",
          token: token,
          userId: result[0].userId,
          email: result[0].email,
        });
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
