import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const DOLIBARR_API_URL = process.env.DOLIBARR_API_URL;
const DOLAPIKEY = process.env.DOLAPIKEY;

// Función para obtener los datos del usuario desde Dolibarr
export const getUserData = async (req, res) => {
  const userId = req.user.id;  // ID del usuario obtenido del token JWT

  try {
    const response = await fetch(`${DOLIBARR_API_URL}/thirdparties/${userId}`, {
      method: 'GET',
      headers: {
        'DOLAPIKEY': DOLAPIKEY,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(400).json({ message: 'Error al obtener datos de usuario', error: data });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error al conectar con Dolibarr', error });
  }
};

// Función para obtener los pedidos del usuario desde Dolibarr
export const getUserOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const response = await fetch(`${DOLIBARR_API_URL}/orders?thirdparty_ids=${userId}`, {
      method: 'GET',
      headers: {
        'DOLAPIKEY': DOLAPIKEY,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(400).json({ message: 'Error al obtener pedidos del usuario', error: data });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error al conectar con Dolibarr', error });
  }
};
