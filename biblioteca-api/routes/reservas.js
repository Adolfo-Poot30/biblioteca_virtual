// routes/reservas.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET: Obtener todas las reservas
router.get('/', (req, res) => {
    db.query('SELECT * FROM reservas', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// POST: Crear una nueva reserva
router.post('/', (req, res) => {
    const { id_usuario, id_libro, fecha_reserva, estado } = req.body;
    db.query('INSERT INTO reservas (id_usuario, id_libro, fecha_reserva, estado) VALUES (?, ?, ?, ?)', 
    [id_usuario, id_libro, fecha_reserva, estado], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id: results.insertId, ...req.body });
    });
});

// PUT: Actualizar una reserva
router.put('/:id', (req, res) => {
    const { id_usuario, id_libro, fecha_reserva, estado } = req.body;
    const { id } = req.params;
    db.query('UPDATE reservas SET id_usuario = ?, id_libro = ?, fecha_reserva = ?, estado = ? WHERE id = ?', 
    [id_usuario, id_libro, fecha_reserva, estado, id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id, ...req.body });
    });
});

// DELETE: Eliminar una reserva
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM reservas WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Reserva eliminada' });
    });
});

module.exports = router;

