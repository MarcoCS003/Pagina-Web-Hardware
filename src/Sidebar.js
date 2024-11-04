import React from 'react';
import './Sidebar.css';

function Sidebar({ setCategoriaSeleccionada }) {
  const seleccionarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria); // Actualiza la categoría seleccionada
  };

  return (
    <div className="sidebar">
      <h2>Filtrar por Categoría</h2>
      <ul>
        <li><button onClick={() => seleccionarCategoria('Procesadores')}>Procesadores</button></li>
        <li><button onClick={() => seleccionarCategoria('Memoria RAM')}>Memoria RAM</button></li>
        <li><button onClick={() => seleccionarCategoria('Discos Duros')}>Discos Duros</button></li>
        <li><button onClick={() => seleccionarCategoria('Tarjetas de Video')}>Tarjetas de Video</button></li>
        <li><button onClick={() => seleccionarCategoria('Tarjetas Madre')}>Tarjetas Madre</button></li>
        <li><button onClick={() => seleccionarCategoria('Fuentes de Poder')}>Fuentes de Poder</button></li>
        <li><button onClick={() => seleccionarCategoria('Disipadores')}>Disipadores</button></li>
        <li><button onClick={() => seleccionarCategoria('No Breaks')}>No Breaks</button></li>
        <li><button onClick={() => seleccionarCategoria('Monitores')}>Monitores</button></li>
        <li><button onClick={() => seleccionarCategoria('Teclados')}>Teclados</button></li>
        <li><button onClick={() => seleccionarCategoria('Ratones')}>Ratones</button></li>
        <li><button onClick={() => seleccionarCategoria('Impresoras')}>Impresoras</button></li>
      </ul>
    </div>
  );
}

export default Sidebar;
