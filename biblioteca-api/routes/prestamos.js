// routes/prestamos.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET: Obtener todos los préstamos
router.get('/', (req, res) => {
    db.query('SELECT * FROM prestamos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// POST: Crear un nuevo préstamo
router.post('/', (req, res) => {
    const { id_usuario, id_libro, fecha_prestamo, fecha_devolucion, estado } = req.body;
    db.query('INSERT INTO prestamos (id_usuario, id_libro, fecha_prestamo, fecha_devolucion, estado) VALUES (?, ?, ?, ?, ?)', 
    [id_usuario, id_libro, fecha_prestamo, fecha_devolucion, estado], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id: results.insertId, ...req.body });
    });
});

// PUT: Actualizar un préstamo
router.put('/:id', (req, res) => {
    const { id_usuario, id_libro, fecha_prestamo, fecha_devolucion, estado } = req.body;
    const { id } = req.params;
    db.query('UPDATE prestamos SET id_usuario = ?, id_libro = ?, fecha_prestamo = ?, fecha_devolucion = ?, estado = ? WHERE id = ?', 
    [id_usuario, id_libro, fecha_prestamo, fecha_devolucion, estado, id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id, ...req.body });
    });
});

// DELETE: Eliminar un préstamo
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM prestamos WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Préstamo eliminado' });
    });
});

module.exports = router;

