import fetch from 'node-fetch';

const apiURL = 'http://54.204.75.162/dolibarr/htdocs/api/index.php/thirdparties';
const apiToken = 'HvO38xV831Fm1Ie3MZ3gm4cLwktA9OVa';

async function crearUsuario() {
  const usuarioDefinido = {
    name: 'Juan Perez',  // Nombre completo para el tercero
    email: 'juan.perez@example.com',
    phone: '5551234567',
    address: 'Avenida Siempre Viva 123',
    zip: '12345',
    town: 'Springfield',
    country_id: 154,  // Código del país según la configuración de Dolibarr
    state_id: 1528,   // Código del estado/provincia en Dolibarr
    status: 1,        // 1 = Activo
    client: 1,        // 1 = Definir como cliente
  };

  try {
    // Crear usuario
    const crearResponse = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'DOLAPIKEY': apiToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuarioDefinido)
    });

    if (!crearResponse.ok) {
      const errorData = await crearResponse.json();
      console.error('Error al crear el usuario:', errorData);
      return;
    }
    
    const nuevoUsuario = await crearResponse.json();
    console.log('Respuesta completa de la creación del usuario:', nuevoUsuario);

  } catch (error) {
    console.error('Error al conectar con Dolibarr:', error);
  }
}

crearUsuario();
