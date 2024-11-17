import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; // Importa CORS

const app = express();
const PORT = 3005;
const apiURL = 'http://54.204.75.162/dolibarr/htdocs/api/index.php/products';
const apiToken = 'HvO38xV831Fm1Ie3MZ3gm4cLwktA9OVa';

app.use(cors());

app.get('/productos', async (req, res) => {
  try {
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'DOLAPIKEY': apiToken,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    res.json(data); // Envía el JSON completo al cliente
  } catch (error) {
    console.error('Error en la conexión con Dolibarr:', error);
    res.status(500).json({ error: 'Error al conectar con Dolibarr' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});