import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Mapeo de estados y países
const estados ={
  "1528": "Aguascalientes",
  "1529": "Baja California",
  "1530": "Baja California Sur",
  "1531": "Campeche",
  "1532": "Chiapas",
  "1533": "Chihuahua",
  "1534": "Ciudad de México",
  "1535": "Coahuila",
  "1536": "Colima",
  "1537": "Durango",
  "1538": "Guanajuato",
  "1539": "Guerrero",
  "1540": "Hidalgo",
  "1541": "Jalisco",
  "1542": "Estado de México",
  "1543": "Michoacán",
  "1544": "Morelos",
  "1545": "Nayarit",
  "1546": "Nuevo León",
  "1547": "Oaxaca",
  "1548": "Puebla",
  "1549": "Querétaro",
  "1550": "Quintana Roo",
  "1551": "San Luis Potosí",
  "1552": "Sinaloa",
  "1553": "Sonora",
  "1554": "Tabasco",
  "1555": "Tamaulipas",
  "1556": "Tlaxcala",
  "1557": "Veracruz",
  "1558": "Yucatán",
  "1559": "Zacatecas"
}

const paises = {
  "154": "México",
  "155": "Estados Unidos",
  "156": "Canadá",
  // Agrega más países según tus necesidades
};

function ConfirmarDireccion() {
  const [direccionActual, setDireccionActual] = useState(null);
  const [nuevaDireccion, setNuevaDireccion] = useState({
    address: '',
    zip: '',
    town: '',
    state_id: '',
    country_id: '',
  });
  const [userId, setUserId] = useState(null); // Para almacenar el userId
  const [seleccion, setSeleccion] = useState('actual'); // 'actual' o 'nueva'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDireccion = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/user/datos', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al cargar la dirección');
        }

        const data = await response.json();
        setDireccionActual(data); // Guardar la dirección actual
        setUserId(data.id); // Extraer y guardar el userId
      } catch (error) {
        console.error('Error al cargar la dirección:', error);
      }
    };

    fetchDireccion();
  }, []);

  const handleNuevaDireccionChange = (e) => {
    setNuevaDireccion({ ...nuevaDireccion, [e.target.name]: e.target.value });
  };
  const handleContinuar = async () => {
    try {
      if (seleccion === 'nueva') {
        const response = await fetch('http://localhost:3005/api/update-address', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, ...nuevaDireccion }),
        });
  
        const data = await response.json();
        console.log('Respuesta del backend:', response.status, data);
  
        if (!response.ok) {
          throw new Error(data.message || 'Error al guardar la nueva dirección');
        }
      }
      navigate('/continuarPago');
    } catch (error) {
      console.error('Error al continuar con la nueva dirección:', error);
    }
  };
  

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Confirmar Dirección</h1>
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
      {/* Dirección actual */}
      {direccionActual && (
        <div
          onClick={() => setSeleccion('actual')}
          style={{
            width: '300px',
            border: seleccion === 'actual' ? '2px solid #007bff' : '1px solid #ddd',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3>Dirección Actual</h3>
          <p><strong>Calle:</strong> {direccionActual.address}</p>
          <p><strong>Código Postal:</strong> {direccionActual.zip}</p>
          <p><strong>Ciudad:</strong> {direccionActual.town}</p>
          <p><strong>Estado:</strong> {estados[direccionActual.state_id] || direccionActual.state_id}</p>
          <p><strong>País:</strong> {paises[direccionActual.country_id] || direccionActual.country_id}</p>
        </div>
      )}

      {/* Nueva dirección */}
      <div
        onClick={() => setSeleccion('nueva')}
        style={{
          width: '300px',
          border: seleccion === 'nueva' ? '2px solid #007bff' : '1px solid #ddd',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3>Nueva Dirección</h3>
        {seleccion === 'nueva' && (
          <div>
            <div>
              <label>Calle y Número:</label>
              <input
                type="text"
                name="address"
                value={nuevaDireccion.address}
                onChange={handleNuevaDireccionChange}
                style={{
                  width: '95%',
                  marginBottom: '10px',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div>
              <label>Código Postal:</label>
              <input
                type="text"
                name="zip"
                value={nuevaDireccion.zip}
                onChange={handleNuevaDireccionChange}
                style={{
                  width: '95%',
                  marginBottom: '10px',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div>
              <label>Ciudad:</label>
              <input
                type="text"
                name="town"
                value={nuevaDireccion.town}
                onChange={handleNuevaDireccionChange}
                style={{
                  width: '95%',
                  marginBottom: '10px',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div>
              <label>Estado/Provincia:</label>
              <select
                name="state_id"
                value={nuevaDireccion.state_id}
                onChange={handleNuevaDireccionChange}
                style={{
                  width: '95%',
                  marginBottom: '10px',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              >
                <option value="">Seleccionar estado</option>
                {Object.entries(estados).map(([id, nombre]) => (
                  <option key={id} value={id}>{nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label>País:</label>
              <select
                name="country_id"
                value={nuevaDireccion.country_id}
                onChange={handleNuevaDireccionChange}
                style={{
                  width: '95%',
                  marginBottom: '10px',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              >
                <option value="">Seleccionar país</option>
                {Object.entries(paises).map(([id, nombre]) => (
                  <option key={id} value={id}>{nombre}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Botón Continuar */}
    <div style={{ textAlign: 'right', marginTop: '30px' }}>
      <button
        onClick={handleContinuar}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        disabled={seleccion === 'nueva' && (!nuevaDireccion.address || !nuevaDireccion.zip || !nuevaDireccion.town || !nuevaDireccion.state_id || !nuevaDireccion.country_id)}
      >
        Continuar
      </button>
    </div>
  </div>
  );
}

export default ConfirmarDireccion;
