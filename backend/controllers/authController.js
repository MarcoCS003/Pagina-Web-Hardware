import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const DOLIBARR_API_URL = process.env.DOLIBARR_API_URL;
const DOLAPIKEY = process.env.DOLAPIKEY;
const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  const { email } = req.body;

  console.log("Datos recibidos en el login:", { email }); // Log inicial

  if (!email) {
    console.log("Correo faltante en la solicitud");
    return res.status(400).json({ message: 'Por favor, ingresa el correo' });
  }

  try {
    console.log("Realizando solicitud a Dolibarr para obtener terceros...");
    const response = await fetch(`${DOLIBARR_API_URL}/thirdparties`, {
      method: 'GET',
      headers: {
        'DOLAPIKEY': DOLAPIKEY,
        'Content-Type': 'application/json'
      }
    });

    console.log("Estado de respuesta de Dolibarr:", response.status, response.statusText);

    const responseText = await response.text();
    console.log("Respuesta de Dolibarr (texto):", responseText);

    if (!response.ok) {
      console.error("Error al obtener los terceros de Dolibarr:", responseText);
      return res.status(400).json({ message: 'Error al obtener los terceros de Dolibarr', error: responseText });
    }

    const thirdParties = JSON.parse(responseText); // Intentar analizar el JSON
    console.log("Terceros obtenidos:", thirdParties);

    const user = thirdParties.find(thirdParty => thirdParty.email === email);
    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    console.log("Usuario encontrado:", user);

    // Generar el token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    console.log("Token generado:", token);

    res.json({ token, message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error("Error inesperado en el inicio de sesión:", error.stack || error.message || error);
    res.status(500).json({ message: 'Error en el inicio de sesión', error: error.stack || error.message || error });
  }
};



// Registro de usuario
export const register = async (req, res) => {
  const { nombre, apellido, email, telefono, password, address, zip, town, country_id, state_id } = req.body;

  if (!nombre || !apellido || !email || !password) {
    return res.status(400).json({ message: 'Por favor, completa todos los campos requeridos' });
  }

  try {
    // Encriptar la contraseña antes de guardarla en tu sistema (no en Dolibarr)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Realizamos la solicitud de creación del usuario en Dolibarr
    const response = await fetch(`${DOLIBARR_API_URL}/thirdparties`, {
      method: 'POST',
      headers: {
        'DOLAPIKEY': DOLAPIKEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${nombre} ${apellido}`,  // Nombre completo
        email: email,
        phone: telefono,
        client: 1,
        status: 1,
        address: address,
        zip: zip,
        town: town,
        country_id: country_id,
        state_id: state_id
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error al registrar usuario en Dolibarr:', errorData);
      return res.status(400).json({ message: 'Error al registrar usuario en Dolibarr', error: errorData });
    }

    const dolibarrUser = await response.json();

    // Guardar hashedPassword en tu sistema en lugar de Dolibarr
    const token = jwt.sign({ id: dolibarrUser.id }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    console.error("Error en la conexión con Dolibarr:", error);
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};