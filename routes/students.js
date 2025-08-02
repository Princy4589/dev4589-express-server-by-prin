import express from "express";
import Student from "../models/Student.js";

const router = express.Router();


// Get all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        console.log('students', students);
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('error', error);
    }
});
export default router;