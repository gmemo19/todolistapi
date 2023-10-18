const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root123",
  database: "todolist",
});

module.exports = {
  startDbConnection: function () {
    connection.connect((err) => {
      if (err) {
        console.error("Veritabanına bağlanırken hata oluştu: " + err.stack);
        return;
      }

      console.log(
        "Veritabanına başarıyla bağlandı. Bağlantı kimliği: " +
          connection.threadId
      );
    });
  },
  getItems: async function (query) {
    return new Promise((resolve, reject) => {
      connection.query(query, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  },

  createItem: async function (title, description, status) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO todo (title,description,status) VALUES (?,?,?)";
      connection.query(query, [title, description, status], (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  },
  updateItem: async function (id, yeniVeri, yeniStatus) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE todo SET description = ? , status = ? WHERE id = ?";
      connection.query(query, [yeniVeri, yeniStatus, id], (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  },
  deleteItem: async function (id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM todo WHERE id = ?";
      connection.query(query, [id], (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  },
  deleteAllItems: async function () {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM todo";
      connection.query(query, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  },
  deleteDoneItems: async function () {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM todo WHERE status = 1";
      connection.query(query, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  },

  dbConnection: connection,
};

//TODO: Create item,Updata item,Delete item fonksiyonları yazmak gerekli
