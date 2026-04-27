import express from "express";
import Note from "../models/Note.js"

const router = express.Router();

router.get('/', async(req, res) => {
    const notes = await Note.find();
    res.json(notes);
})

router.get('/:id', async(req, res) => {
    const notes = await Note.findById(req.params.id);
    res.json(notes);
})

router.post('/', async(req, res) => {
    const notes = await Note.create(req.body);
    res.json(notes);
})

router.delete('/:id', async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ success: true });
})

router.patch('/:id', async(req, res) => {
    const update = await Note.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
    res.json(update);
})

export default router;