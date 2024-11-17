import fetch from 'node-fetch';

const testLogin = async () => {
  try {
    console.log("Enviando solicitud de inicio de sesión...");
    const response = await fetch('http://localhost:3005/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'prueba.usuario@example.com',   // Cambia a un correo de prueba registrado
        password: 'contraseña'                // Cambia a la contraseña correspondiente (si es relevante)
      })
    });

    console.log("Estado de la respuesta:", response.status, response.statusText);

    // Intentar capturar y analizar la respuesta JSON
    const responseText = await response.text();
    console.log("Respuesta del servidor (texto):", responseText);

    if (!response.ok) {
      try {
        const errorData = JSON.parse(responseText); // Intentar parsear el error si es JSON
        console.error('Error al iniciar sesión en el backend:', errorData);
      } catch (jsonError) {
        console.error('Error al analizar la respuesta:', jsonError);
      }
      return;
    }

    // Parsear la respuesta en caso de éxito
    const data = JSON.parse(responseText);
    console.log('Inicio de sesión exitoso. Token recibido:', data.token);
  } catch (error) {
    console.error("Error al conectar con el backend:", error);
  }
};

testLogin();
