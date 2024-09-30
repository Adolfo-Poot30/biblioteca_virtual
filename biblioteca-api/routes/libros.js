// routes/libros.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET: Obtener todos los libros
router.get('/', (req, res) => {
    db.query('SELECT * FROM libros', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// POST: Crear un nuevo libro
router.post('/', (req, res) => {
    const { titulo, id_autor, id_categoria, fecha_publicacion, cantidad_disponible, descripcion } = req.body;
    db.query('INSERT INTO libros (titulo, id_autor, id_categoria, fecha_publicacion, cantidad_disponible, descripcion) VALUES (?, ?, ?, ?, ?, ?)', 
    [titulo, id_autor, id_categoria, fecha_publicacion, cantidad_disponible, descripcion], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id: results.insertId, ...req.body });
    });
});

// PUT: Actualizar un libro
router.put('/:id', (req, res) => {
    const { titulo, id_autor, id_categoria, fecha_publicacion, cantidad_disponible, descripcion } = req.body;
    const { id } = req.params;
    db.query('UPDATE libros SET titulo = ?, id_autor = ?, id_categoria = ?, fecha_publicacion = ?, cantidad_disponible = ?, descripcion = ? WHERE id = ?', 
    [titulo, id_autor, id_categoria, fecha_publicacion, cantidad_disponible, descripcion, id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id, ...req.body });
    });
});

// DELETE: Eliminar un libro
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM libros WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Libro eliminado' });
    });
});

module.exports = router;

