import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: Number,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});
export default mongoose.model("Student", studentSchema);