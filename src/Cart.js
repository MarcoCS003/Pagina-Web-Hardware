import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate  } from 'react-router-dom';
function Cart() {
  const [productos, setProductos] = useState([]);

  // Configuración de la API de Dolibarr
  const DOLIBARR_API_URL = 'http://54.204.75.162/dolibarr/htdocs/api/index.php/products';
  const DOLAPIKEY = 'U4B1Chw019IdhOQxJPVs52Jn5Iju37mn';

  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate('/checkout');
  };
  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        // Obtener productos del backend
        const response = await fetch('http://localhost:3005/api/carrito/1', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los productos del carrito');
        }

        const data = await response.json(); // Datos del carrito (IDs y cantidades)

        // Obtener información de los productos desde Dolibarr
        const productosDetallados = await Promise.all(
          data.map(async (item) => {
            const productoResponse = await fetch(`${DOLIBARR_API_URL}/${item.productoId}`, {
              method: 'GET',
              headers: {
                'DOLAPIKEY': DOLAPIKEY,
                'Content-Type': 'application/json',
              },
            });

            if (!productoResponse.ok) {
              throw new Error(`Error al obtener el producto con ID ${item.productoId}`);
            }

            const productoData = await productoResponse.json();
            return { ...productoData, cantidad: item.cantidad }; // Añadimos la cantidad desde el carrito
          })
        );

        setProductos(productosDetallados);
      } catch (error) {
        console.error('Error cargando carrito:', error);
      }
    };

    fetchCarrito();
  }, []);

  const aumentarCantidad = (id) => {
    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === id ? { ...producto, cantidad: producto.cantidad + 1 } : producto
      )
    );
  };

  const eliminarProducto = async (productoId) => {
    try {
      const response = await fetch('http://localhost:3005/api/carrito/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // Cambia esto si usas un sistema dinámico de usuarios
          productoId,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto del carrito');
      }

      // Eliminar el producto del estado local después de eliminarlo del backend
      setProductos((prevProductos) =>
        prevProductos.filter((producto) => producto.id !== productoId)
      );

      console.log('Producto eliminado del carrito');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const disminuirCantidad = (id) => {
    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === id && producto.cantidad > 1
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto
      )
    );
  };

  const subtotal = productos.reduce(
    (acc, producto) => acc + (producto.price || 0) * producto.cantidad,
    0
  );

  const costoEnvio = 50;
  const totalGeneral = subtotal + costoEnvio;

  return (
    <div style={{ display: 'flex', padding: '20px', gap: '20px' }}>
      <div style={{ width: '60%' }}>
        <h2>Carrito de Compras</h2>
        {productos.map((producto) => (
          <div
            key={producto.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #ddd',
              padding: '10px 0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={`http://54.204.75.162/dolibarr/htdocs/document.php?modulepart=produit&entity=1&file=${producto.ref}%2F${producto.ref}1.png`}
                  alt={producto.label}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
              <div>
                <h3>{producto.ref || 'Producto sin nombre'}</h3>
                <p>Precio: ${parseFloat(producto.price).toFixed(2) || 'No disponible'}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaTrash
                  onClick={() => eliminarProducto(producto.id)}
                  style={{
                    cursor: 'pointer',
                    fontSize: '1em',
                  }}
                />
              <button onClick={() => disminuirCantidad(producto.id)}>-</button>
              <p>{producto.cantidad}</p>
              <button onClick={() => aumentarCantidad(producto.id)}>+</button>
            </div>
            
          </div>
        ))}
      </div>

      <div
        style={{
          width: '30%',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <h2>Resumen de Compra</h2>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Costo de Envío: ${costoEnvio.toFixed(2)}</p>
        <h3>Total: ${totalGeneral.toFixed(2)}</h3>
        <button onClick={handleCheckout}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Continuar con la Compra
        </button>
      </div>
    </div>
  );
}

export default Cart;
