require('dotenv').config();
const express = require('express');
const cors = require("cors");
const connectDB = require('./config/db');
const registerRoutes = require('./routes/registerRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes')

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/users", registerRoutes);
app.use("/api/users", userRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse via: http://localhost:${PORT}`);
});
