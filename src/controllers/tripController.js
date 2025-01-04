import connection from "../../db.js";

export const createTrip = (req, res) => {
  const { tripName, fromTrip, toTrip, userId } = req.body;
  console.log(req.body);
  if (!tripName || !fromTrip || !toTrip || !userId) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const sql = `INSERT INTO trips (tripName, fromTrip, toTrip, userId) VALUES ('${tripName}', '${fromTrip}', '${toTrip}', ${userId})`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("error=", error);
      return res.status(500).json({ message: "Internal server error", error });
    } else {
      console.log(result);
      return res
        .status(201)
        .json({ message: "Trip created successfully", data: result });
    }
  });
};
