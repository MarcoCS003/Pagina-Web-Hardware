import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const DOLIBARR_API_URL = process.env.DOLIBARR_API_URL;
const DOLAPIKEY = process.env.DOLAPIKEY;

// Actualizar dirección de un tercero
router.put('/update-address', async (req, res) => {
  const { userId, address, zip, town, state_id, country_id } = req.body;

  if (!userId || !address || !zip || !town || !state_id || !country_id) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const requestBody = {
      address,
      zip,
      town,
      state_id,
      country_id,
    };

    const response = await fetch(`${DOLIBARR_API_URL}/thirdparties/${userId}`, {
      method: 'PUT',
      headers: {
        'DOLAPIKEY': DOLAPIKEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error al actualizar dirección:', error);
      return res.status(400).json({ message: 'Error al actualizar dirección', error });
    }

    const data = await response.json();
    res.status(200).json({ message: 'Dirección actualizada con éxito', data });
  } catch (error) {
    console.error('Error al conectar con Dolibarr:', error);
    res.status(500).json({ message: 'Error al conectar con Dolibarr', error });
  }
});

export default router;
