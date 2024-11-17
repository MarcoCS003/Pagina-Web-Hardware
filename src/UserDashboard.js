import React, { useState } from 'react';
import { FaUser, FaMapMarkerAlt, FaShoppingBag, FaUndo, FaCreditCard } from 'react-icons/fa';

function UserDashboard() {
  const [activeSection, setActiveSection] = useState('Usuario');

  const renderContent = () => {
    switch (activeSection) {
      case 'Usuario':
        return <p>Información del usuario: aquí verás tus datos personales.</p>;
      case 'Direcciones':
        return <p>Direcciones: aquí puedes administrar tus direcciones de envío.</p>;
      case 'Pedidos':
        return <p>Pedidos: aquí se mostrarán tus pedidos anteriores.</p>;
      case 'Devoluciones':
        return <p>Devoluciones: aquí puedes gestionar tus solicitudes de devolución.</p>;
      case 'Métodos de Pago':
        return <p>Métodos de Pago: aquí puedes administrar tus tarjetas y métodos de pago.</p>;
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
          <li style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setActiveSection('Direcciones')}>
            <FaMapMarkerAlt style={{ marginRight: '10px' }} /> Direcciones
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
