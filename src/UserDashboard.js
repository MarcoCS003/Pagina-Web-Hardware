import React, { useState, useEffect } from 'react';
import { FaUser, FaShoppingBag, FaUndo, FaCreditCard, FaFileInvoice,FaUserCircle  } from 'react-icons/fa';

const countries = {
  "154": { name: "México", code: "MX" },
  // Agrega otros países si es necesario
};

const states = {
  "1528": "Puebla",
  // Agrega otros estados si es necesario
};

function UserDashboard() {
  const [activeSection, setActiveSection] = useState('Usuario');
  const [userData, setUserData] = useState(null);

  // Función para obtener los datos del usuario desde el backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Recuperar el token del almacenamiento local
        const response = await fetch('http://localhost:3005/api/user/datos', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }

        const data = await response.json();
        setUserData(data); // Guardar los datos del usuario en el estado
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []); // Ejecutar solo una vez al cargar el componente

  const renderContent = () => {
    switch (activeSection) {
      case 'Usuario':
        return userData ? (
          <div style={{ display: 'flex', height: '100vh', padding: '20px', boxSizing: 'border-box', gap: '20px' }}>
      {/* Área izquierda: Datos generales */}
      <div
        style={{
          flex: '1',
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          {/* Imagen del usuario o ícono */}
          {userData ? (
            <img
              src={`http://54.204.75.162/dolibarr/htdocs/document.php?modulepart=societe&entity=1&file=1%2F${userData.name}.png`}
              alt="Usuario"
              onError={(e) => (e.target.src = '')} // Borra la imagen si no se encuentra
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '20px',
              }}
            />
          ) : (
            <FaUserCircle size={150} color="#ccc" />
          )}

          <h2 style={{ marginTop: '10px', marginBottom: '20px' }}>{userData?.name || 'Nombre no disponible'}</h2>
        </div>

        {/* Datos generales */}
        <div>
          <p><strong>Correo Electrónico:</strong> {userData?.email || 'No disponible'}</p>
          <p><strong>RFC:</strong> {userData?.rfc || 'No registrado'}</p>
          <p><strong>Telefono:</strong> {userData?.phone	 || 'No registrado'}</p>
          <button
            style={{
              marginTop: '300px',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
            }}
            onClick={() => alert('Función para modificar datos en desarrollo')}
          >
            Modificar Datos
          </button>
        </div>
      </div>

      {/* Área derecha: Dirección */}
      <div
        style={{
          flex: '1',
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2>Dirección</h2>
        {userData ? (
          <div>
            <p><strong>Dirección:</strong> {userData.address || 'No registrada'}</p>
            <p><strong>Código Postal:</strong> {userData.zip || 'No registrado'}</p>
            <p><strong>Ciudad:</strong> {userData.town || 'No registrada'}</p>
            <p><strong>Estado:</strong> {states[userData.state_id] || 'No registrado'}</p>
            <p><strong>País:</strong> {countries[userData.country_id]?.name || 'No registrado'}</p>
          </div>
        ) : (
          <p>Cargando información de la dirección...</p>
        )}
        <button
          style={{
            marginTop: '240px',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
          }}
          onClick={() => alert('Función para modificar dirección en desarrollo')}
        >
          Modificar Dirección
        </button>
      </div>
    </div>
        ) : (
          <p>Cargando información del usuario...</p>
        );
      case 'Pedidos':
        return <p>Pedidos: aquí se mostrarán tus pedidos anteriores.</p>;
      case 'Devoluciones':
        return <p>Devoluciones: aquí puedes gestionar tus solicitudes de devolución.</p>;
      case 'Métodos de Pago':
        return <p>Métodos de Pago: aquí puedes administrar tus tarjetas y métodos de pago.</p>;
      case 'Facturas':
        return <p>Facturas: aquí puedes consultar y descargar tus facturas.</p>;
      default:
        return <p>Selecciona una opción del menú.</p>;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Barra lateral */}
      <div style={{ width: '250px', backgroundColor: '#f5f5f5', padding: '20px', boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ marginBottom: '20px' }}>Mi Cuenta</h2>
        <ul style={{ listStyle: 'none', padding: '0', lineHeight: '2.5em' }}>
          <li style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setActiveSection('Usuario')}>
            <FaUser style={{ marginRight: '10px' }} /> Usuario
          </li>
          <li style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setActiveSection('Pedidos')}>
            <FaShoppingBag style={{ marginRight: '10px' }} /> Pedidos
          </li>
          <li style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setActiveSection('Devoluciones')}>
            <FaUndo style={{ marginRight: '10px' }} /> Devoluciones
          </li>
          <li style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setActiveSection('Métodos de Pago')}>
            <FaCreditCard style={{ marginRight: '10px' }} /> Métodos de Pago
          </li>
          <li style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setActiveSection('Facturas')}>
            <FaFileInvoice style={{ marginRight: '10px' }} /> Facturas
          </li>
        </ul>
      </div>

      {/* Área de contenido */}
      <div style={{ flex: '1', padding: '20px', backgroundColor: '#ffffff' }}>
        <h1>{activeSection}</h1>
        {renderContent()}
      </div>
    </div>
  );
}

export default UserDashboard;
