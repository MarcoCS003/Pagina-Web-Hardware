import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import carritoRoutes from './routes/carrito.js'; 
import bankAccountsRouter from './routes/bankAccounts.js';
import direccionesRoutes from './routes/direccion.js'; // Asegúrate de usar la ruta correcta
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes); // Autenticación
app.use('/api/user', userRoutes); // Usuario
app.use('/api/carrito', carritoRoutes); // Carrito de compras
app.use('/api', bankAccountsRouter); // Cuentas bancarias
app.use('/api', direccionesRoutes); // Direcciones


// Ruta raíz para pruebas
app.get('/', (req, res) => {
  res.send('El servidor está funcionando correctamente');
});

// Puerto del servidor
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
