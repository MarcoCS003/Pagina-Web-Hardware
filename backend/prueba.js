import fetch from 'node-fetch';

const testCreateOrder = async () => {
  try {
    // Datos de prueba
    const userId = 2; // ID del usuario de prueba
    const apiUrl = 'http://localhost:3005/api/create-order'; // Endpoint del backend

    // Enviar solicitud al backend
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }), // Enviar el userId en el cuerpo de la solicitud
    });

    // Parsear respuesta
    const data = await response.json();

    // Validar respuesta
    if (!response.ok) {
      console.error('Error al crear la orden:', data);
    } else {
      console.log('Orden creada con éxito:', data);
    }
  } catch (error) {
    console.error('Error al conectar con el backend:', error);
  }
};

// Ejecutar prueba
testCreateOrder();


