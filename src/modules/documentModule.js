import connection from "../../db.js";

export const createDocument = async (documentData, callback) => {
  const { name, url, userId } = documentData;
  const sql = `insert into documents (name,url,userId) values ('${name}','${url}','${userId}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
