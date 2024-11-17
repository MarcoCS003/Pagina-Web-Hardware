import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Registro() {
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', telefono: '', usuario: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 12) {
      alert("La contraseña debe tener al menos 12 caracteres.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3005/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          telefono: form.telefono,
          password: form.password
        }),
      });


      if (response.ok) {
        alert('Registro exitoso');
        navigate('/iniciar-sesion');
      } else {
        const errorData = await response.json();
        alert(`Error al registrar: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error de conexión. Intenta de nuevo.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ padding: '40px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Registro</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="nombre" style={{ fontSize: '1.1em', marginBottom: '8px', display: 'block' }}>Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingrese su nombre"
              value={form.nombre}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1em',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="apellido" style={{ fontSize: '1.1em', marginBottom: '8px', display: 'block' }}>Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              placeholder="Ingrese su apellido"
              value={form.apellido}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1em',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ fontSize: '1.1em', marginBottom: '8px', display: 'block' }}>Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingrese su correo"
              value={form.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1em',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="telefono" style={{ fontSize: '1.1em', marginBottom: '8px', display: 'block' }}>Teléfono:</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              placeholder="Ingrese su teléfono"
              value={form.telefono}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1em',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ fontSize: '1.1em', marginBottom: '8px', display: 'block' }}>Contraseña (mínimo 12 caracteres):</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingrese su contraseña"
              value={form.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '1em',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.1em',
              cursor: 'pointer'
            }}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
