import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: String,
    favorite: { type: Boolean, default: false },
    category: String,
    content: String,
});

export default mongoose.model("Note", noteSchema);