// routes/usuarios.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET: Obtener todos los usuarios
router.get('/', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// POST: Crear un nuevo usuario
router.post('/', (req, res) => {
    const { nombre, correo, contraseña, rol } = req.body;
    db.query('INSERT INTO usuarios (nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)', [nombre, correo, contraseña, rol], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id: results.insertId, ...req.body });
    });
});

// PUT: Actualizar un usuario
router.put('/:id', (req, res) => {
    const { nombre, correo, contraseña, rol } = req.body;
    const { id } = req.params;
    db.query('UPDATE usuarios SET nombre = ?, correo = ?, contraseña = ?, rol = ? WHERE id = ?', [nombre, correo, contraseña, rol, id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id, ...req.body });
    });
});

// DELETE: Eliminar un usuario
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Usuario eliminado' });
    });
});

module.exports = router;
