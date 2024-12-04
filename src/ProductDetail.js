import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [mainImage, setMainImage] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  // Configuración de la API de Dolibarr
  const DOLIBARR_API_URL = 'http://13.59.29.166/dolibarr/htdocs/api/index.php/products';
  const DOLAPIKEY = 'ict3vf9SK8sN46Mz5wJqUG0UIi23dE8R';
  const añadirAlCarrito = async (productoId, cantidad) => {
    try {
      const response = await fetch('http://localhost:3005/api/carrito/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1, productoId, cantidad }),
      });
  
      if (!response.ok) {
        throw new Error('Error al añadir al carrito');
      }
  
      const data = await response.json();
      console.log('Carrito actualizado:', data.carrito);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Error al añadir producto al carrito:', error);
    }
  };

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        // Obtener datos del producto desde Dolibarr
        const responseProducto = await fetch(`${DOLIBARR_API_URL}/${id}`, {
          method: 'GET',
          headers: {
            'DOLAPIKEY': DOLAPIKEY,
            'Content-Type': 'application/json',
          },
        });
  
        if (!responseProducto.ok) {
          throw new Error('Error al cargar el producto desde Dolibarr');
        }
  
        const dataProducto = await responseProducto.json();
        setProducto(dataProducto); // Guardamos los datos del producto
  
        // Obtener documentos relacionados con el producto (imágenes)
        const responseDocuments = await fetch(`http://13.59.29.166/dolibarr/htdocs/api/index.php/documents?modulepart=product&id=${id}&sortfield=fullname&sortorder=acs`, {
          method: 'GET',
          headers: {
            'DOLAPIKEY': DOLAPIKEY,
            'Content-Type': 'application/json',
          },
        });
  
        if (!responseDocuments.ok) {
          throw new Error('Error al cargar los documentos desde Dolibarr');
        }
  
        const dataDocuments = await responseDocuments.json();
        const imageUrls = dataDocuments.map(doc => `http://13.59.29.166/dolibarr/htdocs/document.php?hashp=${doc.share}`);
        setImageUrls(imageUrls); // Guardamos las URLs de las imágenes
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    };
  
    fetchProducto();
  }, [id]);

  
  if (!producto) {
    return <p>Cargando...</p>;
  }

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
            <img src={imageUrls[mainImage - 1]} alt={producto.ref} style={{ maxWidth: '100%', maxHeight: '100%' }} />
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
              <button
                onClick={() => añadirAlCarrito(producto.id, 1)}
                style={{
                  padding: '10px 20px',
                  fontSize: '1em',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
              }}
              >
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
          {/* Animación lateral */}
          {showToast && (
  <div
    style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#ffffff',
      color: '#333',
      padding: '15px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      animation: 'slideIn 0.5s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      borderLeft: '5px solid #28a745',
    }}
  >
    <img
      src={producto.url}
      style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        border: '1px solid #ddd',
        objectFit: 'cover',
      }}
      alt="Descripción de la imagen"
    />
    <div>
      <p style={{ fontSize: '0.9em', margin: '0', color: '#555' }}>¡Añadido al carrito!</p>
      <strong style={{ fontSize: '1em', color: '#333' }}>{producto.ref}</strong>
      <p style={{ fontSize: '1em', margin: '0', color: '#28a745', fontWeight: 'bold' }}>
        ${Math.round(producto.price)}
      </p>
    </div>
  </div>
)}
      
    </div>

  );
}

export default ProductDetail;