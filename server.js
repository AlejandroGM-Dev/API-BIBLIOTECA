const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const libroRoutes = require('./routes/libroRoutes');
const userRoutes = require('./routes/userRoutes');

//<--------------------------------------------

//Conexion base de datos y configuracion de variables de entorno
dotenv.config();
connectDB();

//Levantamiento de la app
const app = express();
app.use(cors());
app.use(express.json());

//Rutas
app.use('/api/libros', libroRoutes);
app.use('/api/usuarios', userRoutes);

//Ruta raiz
app.get('/', (req, res) => res.send('API Biblioteca funcionando'));

//Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`servidor corriendo en puerto ${PORT}`));