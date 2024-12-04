import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});
db.connect((err) => {
  if (err) {
    console.log("Erreur de connexion à la base de données :", err.message);
    process.exit(1); // Arrête l'application si la connexion échoue
  }
  console.log("Connexion réussie à la base de données");
});
app.get("/", (req, res) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Erreur de connexion" });
    return res.json(result);
  });
});
app.post("/students", (req, res) => {
  const sql = "INSERT INTO STUDENTS (`name`,`mail`) VALUES (?)";
  const values = [req.body.name, req.body.mail];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.get("/read/:id", (req, res) => {
  const sql = "SELECT * FROM students where id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Erreur de connexion" });
    return res.json(result);
  });
});
app.put("/update/:id", (req, res) => {
  const sql = "UPDATE STUDENTS SET `name`=?, `mail`=? where id=?";
  const id = req.params.id;
  db.query(sql, [req.body.name, req.body.mail, id], (err, result) => {
    if (err) return res.json({ Message: "Erreur de connexion" });
    return res.json(result);
  });
});
app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE from STUDENTS where id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Erreur de connexion" });
    return res.json(result);
  });
});
app.listen(8082, () => {
  console.log("Hello");
});
