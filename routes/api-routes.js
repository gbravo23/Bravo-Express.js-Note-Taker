const notes = require('../db/db.json');
var express = require('express');
const fs = require('fs');
const router = express.Router();


router.get('/notes', function (req, res) {
    res.json(notes)
});

router.post('/notes', function (req, res) {
    const newNote = req.body
    var id;
    if (notes.length === 0) {
        id = 1;
    }
    else {
        id = notes[notes.length - 1].id;
        id++;
    }
    newNote.id = id;

    notes.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(notes), function (err) {
        if (err) throw err;
        console.log('note has been saved');
    });

    res.status(200).json(newNote);
});


router.delete('/notes/:id', function (req, res) {
    const id = req.params.id;

    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id == id) {
            notes.splice(i, 1);
        }
    }
    fs.writeFile('./db/db.json', JSON.stringify(notes), function (err) {
        if (err) throw err;
    });
    res.status(200).json({ 'item deleted': id })
});

module.exports = router;