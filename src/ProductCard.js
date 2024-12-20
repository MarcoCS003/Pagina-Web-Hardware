import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ producto }) {
  // Construye la URL de la imagen utilizando el campo 'ref' del producto
  const imageUrl = producto.url;
  

  // Reemplazar los guiones bajos por espacios
  const formattedName = producto.ref.replace(/_/g, ' ');

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
          backgroundColor: 'white',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src={imageUrl} 
            style={{ maxHeight: '100%', maxWidth: '100%' }} 
            alt="Producto" 
          />
        </div>
        
        {/* Nombre y precio del producto */}
        <h3 style={{
          fontSize: '1em',
          margin: '10px 0',
          whiteSpace: 'nowrap', // Evitar que el texto se rompa
          overflow: 'hidden',  // Ocultar el texto que exceda
          textOverflow: 'ellipsis', // Mostrar "..." si el texto es demasiado largo
        }}>
          {formattedName}
        </h3>
        <p style={{ color: '#007bff', fontSize: '1.2em' }}>${Math.round(producto.price)}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
