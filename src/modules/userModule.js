import connection from "../../db.js";

export const registerUser = async (userData, callback) => {
  const { name, email, password } = userData;
  const sql = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
