const express = require('express');
const app = express();
const librosRoutes = require('./routes/libros');
require('dotenv').config();

app.use(express.json());
app.use('/api/libros', librosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});