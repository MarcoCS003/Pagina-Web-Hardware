import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function IniciarSesion() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);  // Limpiar el mensaje de error previo

    try {
      const response = await fetch('http://localhost:3005/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'El correo o la contraseña es incorrecto');
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);  // Guardar el token en localStorage
      navigate('/datauser');  // Redirigir al usuario a la página principal o al dashboard
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error de conexión. Intenta de nuevo.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ padding: '40px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
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
            <label htmlFor="password" style={{ fontSize: '1.1em', marginBottom: '8px', display: 'block' }}>Contraseña:</label>
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
            {error && <p style={{ color: 'red', fontSize: '0.9em', marginTop: '5px' }}>{error}</p>}
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
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            Continuar
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.9em' }}>
          <p>¿No tienes cuenta? <Link to="/registro" style={{ color: '#007bff', textDecoration: 'none' }}>Regístrate aquí</Link></p>
        </div>
      </div>
    </div>
  );
}

export default IniciarSesion;
