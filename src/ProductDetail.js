import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams(); // Obtenemos el ID del producto desde la URL
  const [producto, setProducto] = useState(null);

  // Cargar detalles del producto desde el JSON
  useEffect(() => {
    fetch('/productos.json') // Asegúrate de que el archivo esté en la carpeta 'public'
      .then(response => response.json())
      .then(data => {
        const foundProduct = data.productos.find(p => p.id === parseInt(id));
        setProducto(foundProduct); // Establecemos el producto encontrado
      })
      .catch(error => console.error("Error cargando producto:", error));
  }, [id]);

  if (!producto) {
    return <p>Cargando...</p>;
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center', // Centra el contenedor principal horizontalmente
      alignItems: 'center',     // Centra el contenedor principal verticalmente
      minHeight: '10vh',       // Ocupa toda la altura de la pantalla
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        maxWidth: '900px',       // Limita el ancho máximo del contenedor
        width: '100%',
        gap: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff'
      }}>
        {/* Imagen del producto */}
        <div style={{
          width: '50%',
          height: '400px',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px'
        }}>
          <p>Imagen del Producto</p>
        </div>

        {/* Detalles del producto */}
        <div style={{ width: '50%' }}>
          <h1>{producto.nombre}</h1>
          <p>{producto.descripcion}</p>
          <p style={{ fontSize: '1.5em', color: '#007bff' }}>${producto.precio}</p>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button style={{
              padding: '10px 20px',
              fontSize: '1em',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Comprar Ahora
            </button>
            <button style={{
              padding: '10px 20px',
              fontSize: '1em',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Añadir a Carrito
            </button>
          </div>

          {/* Detalles adicionales */}
          <div style={{ marginTop: '20px' }}>
            <p><strong>Marca:</strong> {producto.marca}</p>
            <p><strong>Stock:</strong> {producto.stock} disponibles</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
