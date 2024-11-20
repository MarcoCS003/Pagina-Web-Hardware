import fetch from 'node-fetch';

const DOLIBARR_API_URL = 'http://54.204.75.162/dolibarr/htdocs/api/index.php';
const DOLAPIKEY = 'U4B1Chw019IdhOQxJPVs52Jn5Iju37mn'; // Reemplaza con tu clave de API

const createOrderWithProducts = async () => {
  const userId = 1; // ID del usuario (tercero) para la orden
  const products = [
    { fk_product: 19, qty: 2 }, // Producto 1
    { fk_product: 66, qty: 1 }, // Producto 2
    { fk_product: 62, qty: 3 }, // Producto 3
  ];

  try {
    // Crear la orden con los productos incluidos
    const orderResponse = await fetch(`${DOLIBARR_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'DOLAPIKEY': DOLAPIKEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        socid: userId, // ID del tercero (usuario)
        date: Math.floor(new Date().getTime() / 1000), // Fecha en formato timestamp
        type: 0, // Tipo de pedido (0 para estándar)
        lines: products, // Productos agregados directamente en la creación
        mode_reglement_id: 6, // Método de pago
        cond_reglement_id: 6, // Condición de pago
        fk_multicurrency: 0, // Moneda predeterminada
      }),
    });

    // Validar respuesta del servidor
    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
      console.error('Error al crear la orden:', orderData);
      return;
    }

    const orderId = orderData.id;

    if (!orderId) {
      console.error('El ID de la orden no fue devuelto:', orderData);
      return;
    }

    console.log(`Orden creada exitosamente con ID: ${orderId}`);

    // Confirmar en el log que la orden se encuentra en Dolibarr
    console.log(`Revisa en Dolibarr el pedido con ID: ${orderId}`);

  } catch (error) {
    console.error('Error al conectar con la API de Dolibarr:', error);
  }
};

createOrderWithProducts();
