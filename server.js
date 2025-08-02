import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import studentsRoutes from "./routes/students.js";
import Student from "./models/Student.js";
import dotenv from "dotenv";

dotenv.config();

console.clear();
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/universite";
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log("Connected to MongoDB");
    console.log(mongoURI);
    try {
      const students = await Student.find();
      console.log("=== LISTE DES ÉTUDIANTS ===");
      if (students.length === 0) {
          console.log("Aucun étudiant trouvé");
      } else {
          students.forEach((student, index) => {
              console.log(`${index + 1}. ${student.nom} - ${student.mail || student.email}`);
          });
      }
      console.log("============================");
  } catch (err) {
      console.log("Erreur lors de l'affichage des étudiants:", err);
  }
})
.catch((err) => {
    console.log(err);
    process.exit(1);
});

app.use("/", studentsRoutes);
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`🚀 Serveur Express actif`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`📊 Environnement: ${process.env.NODE_ENV}`);
});