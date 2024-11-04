import React, { useState } from 'react';

function Cart() {
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: 'Intel Core i9-13900K',
      precio: 599.99,
      cantidad: 1
    },
    {
      id: 2,
      nombre: 'AMD Ryzen 9 7950X',
      precio: 699.99,
      cantidad: 1
    }
  ]);

  const costoEnvio = 50; // Costo fijo de envío

  const aumentarCantidad = (id) => {
    setProductos(prevProductos =>
      prevProductos.map(producto =>
        producto.id === id ? { ...producto, cantidad: producto.cantidad + 1 } : producto
      )
    );
  };

  const disminuirCantidad = (id) => {
    setProductos(prevProductos =>
      prevProductos.map(producto =>
        producto.id === id && producto.cantidad > 1
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto
      )
    );
  };

  const subtotal = productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
  const totalGeneral = subtotal + costoEnvio;

  return (
    <div style={{ display: 'flex', padding: '20px', gap: '20px' }}>
      <div style={{ width: '60%' }}>
        <h2>Carrito de Compras</h2>
        {productos.map(producto => (
          <div key={producto.id} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #ddd',
            padding: '10px 0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '100px',
                height: '100px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <p>Imagen</p>
              </div>
              <div>
                <h3>{producto.nombre}</h3>
                <p>Precio: ${producto.precio.toFixed(2)}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => disminuirCantidad(producto.id)}>-</button>
              <p>{producto.cantidad}</p>
              <button onClick={() => aumentarCantidad(producto.id)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        width: '30%',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        <h2>Resumen de Compra</h2>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Costo de Envío: ${costoEnvio.toFixed(2)}</p>
        <h3>Total: ${totalGeneral.toFixed(2)}</h3>
        <button style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}>
          Continuar con la Compra
        </button>
      </div>
    </div>
  );
}

export default Cart;
