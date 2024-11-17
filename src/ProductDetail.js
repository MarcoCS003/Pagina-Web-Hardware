import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [mainImage, setMainImage] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3005/productos`)
      .then(response => response.json())
      .then(data => {
        const foundProduct = data.find(p => p.id === id);
        setProducto(foundProduct);
      })
      .catch(error => console.error("Error cargando producto:", error));
  }, [id]);

  if (!producto) {
    return <p>Cargando...</p>;
  }

  const imageUrls = Array.from({ length: 5 }, (_, i) => 
    `http://localhost/dolibar/dolibarr-20.0.1/dolibarr-20.0.1/htdocs/document.php?modulepart=produit&entity=1&file=${producto.ref}%2F${producto.ref}${i + 1}.png`
  );

  // Calcular costo de envío
  const envio = producto.price > 1000 ? 'Envío gratis' : '$90 de envío';

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',   
      minHeight: '10vh',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '900px', 
        width: '100%',
        gap: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff'
      }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Imagen principal del producto */}
          <div style={{
            width: '50%',
            height: '400px',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px'
          }}>
            <img src={imageUrls[mainImage - 1]} alt={producto.nombre} style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>

          {/* Información del producto */}
          <div style={{ width: '50%' }}>
            <h1>{producto.ref}</h1>
            <p style={{ fontSize: '1.5em', color: '#007bff' }}>${Math.round(producto.price)}</p>
            <p><strong>Stock:</strong> {producto.stock_reel} disponibles</p>
            <p><strong>Costo de envío:</strong> {envio}</p>
            
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
          </div>
        </div>

        {/* Miniaturas de imágenes */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
          {imageUrls.map((url, index) => (
            <img 
              key={index} 
              src={url} 
              alt={`Miniatura ${index + 1}`} 
              style={{
                width: '60px',
                height: '60px',
                cursor: 'pointer',
                border: mainImage === index + 1 ? '2px solid #007bff' : '1px solid #ccc',
                borderRadius: '5px'
              }}
              onClick={() => setMainImage(index + 1)}
            />
          ))}
        </div>

        {/* Características del producto (Descripción) */}
        <div style={{ marginTop: '20px', fontSize: '0.9em' }}>
          <h2>Características del producto</h2>
          <div dangerouslySetInnerHTML={{ __html: producto.description }} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
