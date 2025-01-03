import { createDocument } from "../modules/documentModule.js";

export const insertDocument = async (req, res) => {
  try {
    console.log(req.body);
    const { name, url, userId } = req.body;
    if (!name || !url || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const result = new Promise((resolve, reject) => {
      createDocument({ name, url, userId }, (err, result) => {
        if (err) {
          reject(err);
          res.status(400).send(err);
        } else {
          resolve(result);
          console.log({
            message: "document registered successfully",
            data: result,
          });
          res
            .status(201)
            .json({
              message: "document registered successfully",
              data: result,
            });
        }
      });
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
