import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import notesRouter from "./routes/notes.js"
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())

app.use('/notes', notesRouter)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.listen(3000, () => console.log("Listening on port 3000"))