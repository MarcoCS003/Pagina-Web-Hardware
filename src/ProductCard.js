import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ producto }) {
  // Construye la URL de la imagen utilizando el campo 'ref' del producto
  const imageUrl = 'http://54.204.75.162/dolibarr/htdocs/document.php?modulepart=produit&entity=1&file=Cooler_Master_Hyper_212%2FCooler_Master_Hyper_2121.png';


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
          <img 
            src={imageUrl} 
            style={{ maxHeight: '100%', maxWidth: '100%' }} 
            alt="Producto" 
          />
        </div>
        
        {/* Nombre y precio del producto */}
        <h3 style={{ fontSize: '1.1em', margin: '10px 0' }}>{producto.ref}</h3>
        <p style={{ color: '#007bff', fontSize: '1.2em' }}>${Math.round(producto.price)}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
