// app.js
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// Importar rutas
const usuariosRoutes = require('./routes/usuarios');
const autoresRoutes = require('./routes/autores');
const categoriasRoutes = require('./routes/categorias');
const librosRoutes = require('./routes/libros');
const prestamosRoutes = require('./routes/prestamos');
const reservasRoutes = require('./routes/reservas');

// Usar las rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/autores', autoresRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/libros', librosRoutes);
app.use('/api/prestamos', prestamosRoutes);
app.use('/api/reservas', reservasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

