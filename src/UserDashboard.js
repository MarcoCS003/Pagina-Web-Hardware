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
  const [bankAccounts, setBankAccounts] = useState([]);

  // Función para obtener los datos del usuario desde el backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3005/api/user/datos', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }

        const data = await response.json();
        setUserData(data);

        if (data?.id) {
          fetchBankAccounts(data.id);
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    const fetchBankAccounts = async (userId) => {
      try {
        const response = await fetch(`http://localhost:3005/api/${userId}/bankaccounts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener cuentas bancarias');
        }

        const accounts = await response.json();
        setBankAccounts(accounts);
      } catch (error) {
        console.error('Error al obtener cuentas bancarias:', error);
      }
    };

    fetchUserData();
  }, []);

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
              src={userData.url}
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
        return (
          <div style={{ padding: '20px' }}>
           
            {bankAccounts.length > 0 ? (
              <div style={{ marginTop: '20px' }}>
                <h3>Cuentas Bancarias</h3>
                {bankAccounts.map((account) => (
                  <div key={account.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                    <p><strong>Banco:</strong> {account.bank || 'No especificado'}</p>
                    <p><strong>Nombre de la Tarjeta:</strong> {account.label   || 'No disponible'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No se encontraron cuentas bancarias registradas.</p>
            )}
            <button
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={() => alert('Función para agregar nueva cuenta en desarrollo')}
            >
              Agregar Nueva Cuenta
            </button>
          </div>
        );
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
