import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ConfirmarMetodoPago() {
  const [userId, setUserId] = useState(null); // Guardar el userId extraído
  const [metodosPago, setMetodosPago] = useState([]);
  const [nuevoMetodoPago, setNuevoMetodoPago] = useState({
    bank: '',
    iban: 'ES91 2100 0418 4502 0005 1332',
    label: '',
    number: '',
  });
  const [seleccion, setSeleccion] = useState(null); // Método seleccionado
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)

  const DOLAPIKEY = 'U4B1Chw019IdhOQxJPVs52Jn5Iju37mn';

const crearOrden = async () => {
  setLoading(true); // Mostrar indicador de carga
  try {

    // Obtener el contenido del carrito
    const carritoResponse = await fetch(`http://localhost:3005/api/carrito/1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!carritoResponse.ok) {
      throw new Error('Error al obtener el carrito del usuario');
    }

    const carrito = await carritoResponse.json();

    if (!carrito || carrito.length === 0) {
      throw new Error('El carrito está vacío');
    }

    // Transformar los datos del carrito al formato esperado por Dolibarr
    const orderLines = carrito.map((item) => ({
      fk_product: item.productoId,
      qty: item.cantidad,
    }));

    // Construir el cuerpo de la orden
    const orderBody = {
      socid: userId, // ID del usuario en Dolibarr
      date: Math.floor(Date.now() / 1000), // Fecha actual en formato Unix
      type: 0, // Tipo de orden (cambiar según necesidades)
      lines: orderLines, // Productos y cantidades
    };

    // Enviar la solicitud para crear la orden en Dolibarr
    const orderResponse = await fetch('http://54.204.75.162/dolibarr/htdocs/api/index.php/orders', {
      method: 'POST',
      headers: {
        'DOLAPIKEY': DOLAPIKEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderBody),
    });

    if (!orderResponse.ok) {
      const error = await orderResponse.json();
      throw new Error(error.message || 'Error al crear la orden en Dolibarr');
    }

    const orderData = await orderResponse.json();
    console.log('Orden creada con éxito:', orderData);
    alert('Orden creada con éxito');
    setShowToast(true);
  } catch (error) {
    console.error('Error al crear la orden:', error);
    alert(`Error al crear la orden: ${error.message}`);
  } finally {
    setLoading(false); // Ocultar indicador de carga
  }
};
  

  // Cargar el userId al montar el componente
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/user/datos', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener el ID de usuario');
        }

        const data = await response.json();
        setUserId(data.id); // Extraer y guardar el userId
      } catch (error) {
        console.error('Error al obtener el ID de usuario:', error);
      }
    };

    fetchUserId();
  }, []);

  // Cargar los métodos de pago cuando se obtenga el userId
  useEffect(() => {
    if (userId) {
      const fetchMetodosPago = async () => {
        try {
          const response = await fetch(`http://localhost:3005/api/${userId}/bankaccounts`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Error al cargar los métodos de pago');
          }

          const data = await response.json();
          setMetodosPago(data);
        } catch (error) {
          console.error('Error al cargar los métodos de pago:', error);
        }
      };

      fetchMetodosPago();
    }
  }, [userId]); // Se ejecuta cuando se establece el userId

  const handleNuevoMetodoChange = (e) => {
    setNuevoMetodoPago({ ...nuevoMetodoPago, [e.target.name]: e.target.value });
  };

  const handleAgregarMetodoPago = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/add-bank-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, ...nuevoMetodoPago }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al agregar método de pago');
      }

      setMetodosPago([...metodosPago, data.cuenta]);
      setNuevoMetodoPago({ bank: '', iban: '', label: '', number: '' });
      setMostrarFormulario(false);
    } catch (error) {
      console.error('Error al agregar método de pago:', error);
    }
  };

  const handleContinuar = () => {
    if (!seleccion) {
      alert('Por favor selecciona un método de pago');
      return;
    }
    crearOrden()
    navigate('/datauser');
  };

  const [showToast, setShowToast] = useState(false);
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Confirmar Método de Pago</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {/* Métodos de pago existentes */}
        {metodosPago.map((metodo, index) => (
          <div
            key={index}
            onClick={() => {
              setSeleccion(metodo);
              setMostrarFormulario(false);
            }}
            style={{
              width: '300px',
              border: seleccion === metodo ? '2px solid #007bff' : '1px solid #ddd',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3>{metodo.label}</h3>
            <p><strong>Banco:</strong> {metodo.bank}</p>
          </div>
        ))}

        {/* Opciones adicionales */}
        <div
          onClick={() => {
            setSeleccion('paypal');
            setMostrarFormulario(false);
          }}
          style={{
            width: '300px',
            border: seleccion === 'paypal' ? '2px solid #007bff' : '1px solid #ddd',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3>PayPal</h3>
        </div>

        <div
          onClick={() => {
            setSeleccion('nuevo');
            setMostrarFormulario(true);
          }}
          style={{
            width: '300px',
            border: seleccion === 'nuevo' ? '2px solid #007bff' : '1px solid #ddd',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3>Agregar Nueva Tarjeta</h3>
        </div>
      </div>

      {/* Formulario para agregar nuevo método */}
      {mostrarFormulario && (
        <div style={{ marginTop: '20px', width: '300px', margin: '0 auto' }}>
          <h3>Agregar Método de Pago</h3>
          <input
            type="text"
            name="bank"
            placeholder="Banco"
            value={nuevoMetodoPago.bank}
            onChange={handleNuevoMetodoChange}
            style={{
              width: '100%',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="text"
            name="label"
            placeholder="Nombre de la Tarjeta"
            value={nuevoMetodoPago.label}
            onChange={handleNuevoMetodoChange}
            style={{
              width: '100%',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="text"
            name="number"
            placeholder="Número de Cuenta"
            value={nuevoMetodoPago.number}
            onChange={handleNuevoMetodoChange}
            style={{
              width: '100%',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <button
            onClick={handleAgregarMetodoPago}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Guardar Método
          </button>
        </div>
      )}

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
          disabled={!seleccion}
        >
          Continuar
        </button>
      </div>
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
    <div>
      <p style={{ fontSize: '1em', margin: '0', color: '#555' }}>
        <strong style={{ color: '#28a745' }}>¡Orden creada exitosamente!</strong>
      </p>
      <p style={{ fontSize: '0.9em', margin: '0', color: '#555' }}>
        Tu orden ha sido procesada correctamente.
      </p>
    </div>
  </div>
)}
    </div>
    
  );
}

export default ConfirmarMetodoPago;
