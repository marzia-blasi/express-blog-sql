// estraiamo mysql2

const mysql = require("mysql2");

// creaimo la connessione con il db

const credentials = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "db_blog",
};

const connection = mysql.createConnection(credentials);

console.log(connection);

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.info("✅ Connection works");
});

module.exports = connection;
