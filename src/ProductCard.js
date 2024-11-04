import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ producto }) {
  return (
    <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        width: '200px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        margin: '10px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer'
      }}>
        {/* Imagen del producto */}
        <div style={{
          width: '100%',
          height: '150px',
          backgroundColor: '#f0f0f0',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <p>Imagen</p>
        </div>
        
        {/* Nombre y precio del producto */}
        <h3 style={{ fontSize: '1.1em', margin: '10px 0' }}>{producto.nombre}</h3>
        <p style={{ color: '#007bff', fontSize: '1.2em' }}>${producto.precio}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
