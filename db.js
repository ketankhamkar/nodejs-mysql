import mysql from "mysql2";
// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost", // Replace with your database host
  user: "ketan", // Replace with your database username
  password: "123", // Replace with your database password
  database: "db1", // Replace with your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the MySQL database!");
});

export default connection;
