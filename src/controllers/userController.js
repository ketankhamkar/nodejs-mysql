import connection from "../../db.js";
import { registerUser } from "../modules/userModule.js";
import strings from "../strings.js";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";
import serviceAccount from "../../fileforfirebase.json" with {type:"json"};

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

export const searchUser = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name || name.length < 2) {
      return res
        .status(400)
        .json({ message: "Name must be at least 2 characters long." });
    }
    console.log("name==", name);
    const sql = `select * from users where name like '%${name}%'`;
    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(400).json({ message: "User not found", error: err });
      } else {
        console.log("result==", result);
        if (result.length === 0) {
          return res.status(200).json({ message: "User not found", data: [] });
        }
        res.status(200).json({ message: "User found", data: result });
      }
    });
    // res.status(200).json({ message: "User found" });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const sendNotify = async (req, res) => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    const message = {
      notification: {
        title: "Hello! from new app",
        body: "This is a Firebase notification.",
        image: "https://www.w3schools.com/w3images/mountains.jpg",
      },
      data: {
        key1: "value1",
        key2: "value2",
        customInfo: "Any custom details you want",
      },
      android: {
        priority: "high",
        notification: {
          icon: "ic_launcher",
          color: "#f45342",
          sound: "default",
          clickAction: "OPEN_ACTIVITY",
        },
      },
      token:
        "cwqea8A3Te6zEIshJDFzjY:APA91bH4s_hP8UEbMl-1aAVrOWrxFJ-JQyoV5ArmaUH4IiCIIItzHGAaC6hW2sDt9vriHaMypWcD5H1Qmdur7-xlZWIeCbkErM1K5YYBbp2Z3xsyVBYmK68",
    };
    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log("Message sent successfully:", response);
        res.status(200).json({ message: "Notification sent successfully", response });
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
        return res.status(400).json({ message: "Error sending notification", error });
      });
  } catch (error) {
    res.status(400).send(error);
  }
};
