const fs = require("fs");
var express = require("express");
const router = express.Router();
const notes = require("../db/db.json");


router.get("/notes", function (req, res) {
    res.json(notes)
});

router.post("/notes", function (req, res) {
    const newNote = req.body
    var id;
    if (notes.length === 0) {
        id = 1;
    }
    else {
        id = notes[notes.length - 1].id;
        id++;
    }
    newNote.id = id

    notes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
        if (err) throw err;
        console.log("note has been saved")
    });

    res.status(200).json(newNote);
});

