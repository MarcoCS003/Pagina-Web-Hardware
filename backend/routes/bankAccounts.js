import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const DOLIBARR_API_URL = process.env.DOLIBARR_API_URL;
const DOLAPIKEY = process.env.DOLAPIKEY;


router.post('/add-bank-account', async (req, res) => {
  const { userId, bank, iban, label, number } = req.body;

  if (!userId || !bank || !iban || !label || !number) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Construimos el JSON según el formato esperado por Dolibarr
    const requestBody = {
      bank: bank,
      iban: iban,
      label: label,
      number: number,
    };

    // Enviamos la solicitud a la API de Dolibarr
    const response = await fetch(`${DOLIBARR_API_URL}/thirdparties/${userId}/bankaccounts`, {
      method: 'POST',
      headers: {
        'DOLAPIKEY': DOLAPIKEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error al agregar la cuenta bancaria:', error);
      return res.status(400).json({ message: 'Error al agregar la cuenta bancaria', error });
    }

    const data = await response.json();
    res.status(201).json({ message: 'Cuenta bancaria añadida con éxito', cuenta: data });
  } catch (error) {
    console.error('Error al conectar con la API de Dolibarr:', error);
    res.status(500).json({ message: 'Error al conectar con la API de Dolibarr', error });
  }
});

// Ruta para obtener las cuentas bancarias de un usuario (tercero)
router.get('/:userId/bankaccounts', async (req, res) => {
  const { userId } = req.params;

  try {
    // Realiza la solicitud a la API de Dolibarr
    const response = await fetch(`${DOLIBARR_API_URL}/thirdparties/${userId}/bankaccounts`, {
      method: 'GET',
      headers: {
        'DOLAPIKEY': DOLAPIKEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error al obtener cuentas bancarias:', error);
      return res.status(400).json({ message: 'Error al obtener cuentas bancarias', error });
    }

    const data = await response.json();
    res.json(data); // Envía las cuentas bancarias al cliente
  } catch (error) {
    console.error('Error al conectar con la API de Dolibarr:', error);
    res.status(500).json({ message: 'Error al conectar con la API de Dolibarr', error });
  }
});

export default router;
