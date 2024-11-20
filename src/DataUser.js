import React, { useEffect, useState } from 'react';
import UserDashboard from './UserDashboard';

function DataUser() {
  const [token, setToken] = useState('');

  useEffect(() => {
    // Obtenemos el token del localStorage
    const userToken = localStorage.getItem('token');
    setToken(userToken);
  }, []);

  return (
    <div style={{ height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <UserDashboard />
    </div>
  );
}

export default DataUser;
