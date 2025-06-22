// routes/libros.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - Obtener todos los libros
router.get('/', (req, res) => {
  db.query('SELECT * FROM libros', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST - Crear un nuevo libro
router.post('/', (req, res) => {
  const { titulo, autor, anio_publicacion, disponible } = req.body;
  const query = 'INSERT INTO libros (titulo, autor, anio_publicacion, disponible) VALUES (?, ?, ?, ?)';
  db.query(query, [titulo, autor, anio_publicacion, disponible], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Libro creado', id: result.insertId });
  });
});

// PUT - Editar un libro existente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, autor, anio_publicacion, disponible } = req.body;

  const query = `
    UPDATE libros 
    SET titulo = ?, autor = ?, anio_publicacion = ?, disponible = ? 
    WHERE id = ?
  `;

  db.query(query, [titulo, autor, anio_publicacion, disponible, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json({ message: 'Libro actualizado' });
  });
});

// DELETE - Eliminar un libro
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM libros WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json({ message: 'Libro eliminado' });
  });
});



module.exports = router;
