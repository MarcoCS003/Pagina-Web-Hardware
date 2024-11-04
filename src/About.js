import React from 'react';

function About() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>Acerca de Nosotros</h1>
      <p>Somos una tienda dedicada a ofrecer los mejores productos de hardware y tecnología.</p>
      
      <section style={{ marginTop: '40px' }}>
        <h2>Nuestra Misión</h2>
        <p>Brindar componentes de alta calidad y periféricos a los entusiastas de la tecnología, gamers, y profesionales que buscan construir y mejorar sus equipos.</p>
        
        <h2>Nuestro Compromiso</h2>
        <p>Nos comprometemos a ofrecer los mejores precios y soporte técnico para que nuestros clientes siempre obtengan lo mejor.</p>
      </section>
      
      <section style={{ marginTop: '40px' }}>
        <h2>¿Por qué Elegirnos?</h2>
        <ul>
          <li>Productos de las mejores marcas</li>
          <li>Envíos rápidos y seguros</li>
          <li>Soporte técnico especializado</li>
        </ul>
      </section>
    </main>
  );
}

export default About;