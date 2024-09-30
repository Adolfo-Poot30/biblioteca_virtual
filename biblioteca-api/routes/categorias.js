// routes/categorias.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM categorias', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { nombre } = req.body;
    db.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id: results.insertId, nombre });
    });
});

router.put('/:id', (req, res) => {
    const { nombre } = req.body;
    const { id } = req.params;
    db.query('UPDATE categorias SET nombre = ? WHERE id = ?', [nombre, id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id, nombre });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM categorias WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Categoría eliminada' });
    });
});

module.exports = router;

