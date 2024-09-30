// routes/autores.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM autores', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { nombre, biografia } = req.body;
    db.query('INSERT INTO autores (nombre, biografia) VALUES (?, ?)', [nombre, biografia], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id: results.insertId, ...req.body });
    });
});

router.put('/:id', (req, res) => {
    const { nombre, biografia } = req.body;
    const { id } = req.params;
    db.query('UPDATE autores SET nombre = ?, biografia = ? WHERE id = ?', [nombre, biografia, id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id, ...req.body });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM autores WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Autor eliminado' });
    });
});

module.exports = router;

