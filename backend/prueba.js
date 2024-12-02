const API_URL = 'http://54.204.75.162/dolibarr/api/index.php';
const TOKEN = 'U4B1Chw019IdhOQxJPVs52Jn5Iju37mn'; // Obtén este token en el paso de autenticación.

async function getProductDocuments(productId) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}/documents`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Documentos:', data);
  } catch (error) {
    console.error('Error al obtener documentos:', error.message);
  }
}

getProductDocuments(19); // Cambia 1 por el ID del producto.
