const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const libroRoutes = require('./routes/libroRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/libros', libroRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`servidor corriendo en puerto ${PORT}`));