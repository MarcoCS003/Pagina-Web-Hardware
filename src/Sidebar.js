import React from 'react';
import './Sidebar.css';

function Sidebar({ setCategoriaSeleccionada }) {
  return (
    <div className="sidebar">
      <h2>Filtrar por Categoría</h2>
      <ul>
        <li><button onClick={() => setCategoriaSeleccionada('Procesadores')}>Procesadores</button></li>
        <li><button onClick={() => setCategoriaSeleccionada('Memoria RAM')}>Memoria RAM</button></li>
        <li><button onClick={() => setCategoriaSeleccionada('Discos Duros')}>Discos Duros</button></li>
        <li><button onClick={() => setCategoriaSeleccionada('Tarjetas de Video')}>Tarjetas de Video</button></li>
        <li><button onClick={() => setCategoriaSeleccionada('Tarjetas Madre')}>Tarjetas Madre</button></li>
        <li><button onClick={() => setCategoriaSeleccionada('Fuentes de Poder')}>Fuentes de Poder</button></li>
        <li><button onClick={() => setCategoriaSeleccionada('Disipadores')}>Disipadores</button></li>
        <li><button onClick={() => setCategoriaSeleccionada('No breaks')}>No Breaks</button></li>
        <li><button onClick={() => setCategoriaSeleccionada('Monitores')}>Monitores</button></li>
        <li><button onClick={() => setCategoriaSeleccionada('Teclados')}>Teclados</button></li>
        <li><button onClick={() => setCategoriaSeleccionada('Ratones')}>Ratones</button></li>
        <li><button onClick={() => setCategoriaSeleccionada('Gabinetes')}>Gabinetes</button></li>
      </ul>
    </div>
  );
}

export default Sidebar;
