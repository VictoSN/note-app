import express from "express";
import Note from "../models/Note.js"

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (e) {
        console.log(e);
    }
})

router.get('/:id', async(req, res) => {
    try {
        const notes = await Note.findById(req.params.id);
        res.json(notes);
    } catch (e) {
        console.log(e);
    }
})

router.post('/', async(req, res) => {
    try {
        const notes = await Note.create(req.body);
        res.json(notes);
    } catch (e) {
        console.log(e);
    }
})

router.delete('/:id', async(req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (e) {
        console.log(e);
    }
})

router.patch('/:id', async(req, res) => {
    try {
        const update = await Note.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
        res.json(update);
    } catch (e) {
        console.log(e);
    }
})

export default router;