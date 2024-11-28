const sqlite3 = require("sqlite3").verbose();

const path = require("path");

const dbPath = path.join(__dirname, "database.db"); // Change this path if necessary
const db = new sqlite3.Database(dbPath);

// Create the users table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);
  db.run(`CREATE TABLE IF NOT EXISTS records (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          nik TEXT,
          category TEXT,
          description TEXT,
          note TEXT
      )`);
});

// Create record table if it doesn't exist.
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS records (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          nik TEXT,
          category TEXT,
          description TEXT,
          note TEXT
      )`);
});

function insertRecordToDatabase(formData) {
  /*
    formData.fullname,
    formData.nik,
    formData.category,
    formData.description,
    formData.note,
  */

  const query = `
        INSERT INTO records (name, nik, category, description, note)
        VALUES (?, ?, ?, ?, ?)
    `;

  // TODO: Error Handling
  db.run(query, [
    formData.fullname,
    formData.nik,
    formData.category,
    formData.description,
    formData.note,
  ]);
}

// Function to authenticate user
function authenticateUser(username, password) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM users WHERE username = ? AND password = ?`,
      [username, password],
      (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row !== undefined);
      }
    );
  });
}

module.exports = {
  authenticateUser,
  insertRecordToDatabase,
};
