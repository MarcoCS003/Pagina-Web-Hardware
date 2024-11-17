import React from 'react';
import './App.css';
import About from './About'; 
import Sidebar from './Sidebar'; // Importamos la barra lateral
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import IniciarSesion from './Iniciar-sesion'
import Registro from './Registro';
import DataUser from './DataUser';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul className="menu">
              <li style={{ color:"white" , margin: '0', fontSize: '1.8em', fontWeight: 'bold', flex: '1' }}>
                <a href="/" style={{ color: 'white', textDecoration: 'none' }}>TechHardware Pro</a>
              </li>
              <li><a href="/">Inicio</a></li>
              <li><a href="/productos">Productos</a></li>
              <li><a href="/contacto">Contacto</a></li>
              <li><a href="/aviso-privacidad">Aviso de Privacidad</a></li>
              <li><a href="/politica-garantia">Política de Garantía</a></li>
              <li><a href="/Iniciar-sesion">Iniciar Sesión</a></li>
              <li className="carrito">
                <a href="/carrito">Carrito</a>
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/acerca-de" element={<About />} />
          <Route path="/aviso-privacidad" element={<AvisoPrivacidad />} />
          <Route path="/politica-garantia" element={<PoliticaGarantia />} />
          <Route path="/Iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/carrito" element={<Cart />} /> {/* Ruta para el carrito */}
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/datauser" element={<DataUser />}/>

        </Routes>
      </div>
    </Router>
  );
}


// Componente para la página de Inicio
function Home() {
  return (
    <main style={{ padding: '40px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ color: '#333', fontSize: '2.5em', marginBottom: '20px', textAlign: 'center' }}>
        Bienvenido a TechHardware Pro
      </h1>
      
      <p style={{ color: '#555', fontSize: '1.2em', maxWidth: '800px', margin: '0 auto', textAlign: 'justify' }}>
        En <strong>TechHardware Pro</strong>, somos tu tienda de confianza para componentes de hardware y periféricos de última generación. 
        Nuestro objetivo es ofrecerte lo mejor del mercado tecnológico para que puedas construir, actualizar o personalizar tu computadora 
        de acuerdo con tus necesidades, ya seas un profesional en tecnología, un gamer apasionado o simplemente alguien que busca 
        maximizar el rendimiento de su equipo.
        <br /><br />
        Desde procesadores de alta velocidad y tarjetas gráficas de vanguardia, hasta discos duros, memorias RAM, SSD y no breaks, 
        ofrecemos una amplia gama de productos de las marcas más reconocidas y confiables. También contamos con una gran variedad de 
        periféricos, como monitores de alta resolución, teclados mecánicos, ratones ergonómicos y mucho más, diseñados para brindarte 
        la mejor experiencia de uso tanto en tu trabajo diario como en tus sesiones de juego.
      </p>

      <section style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
        <div style={{ width: '30%', padding: '30px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
          <h3 style={{ color: '#333', fontSize: '1.5em', marginBottom: '10px' }}>Componentes</h3>
          <p style={{ color: '#777', fontSize: '1em', marginBottom: '20px' }}>
            Desde procesadores hasta tarjetas gráficas, encuentra todo lo que necesitas para armar tu computadora ideal.
          </p>
          <a href="/productos" style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold' }}>Explorar Componentes</a>
        </div>

        <div style={{ width: '30%', padding: '30px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
          <h3 style={{ color: '#333', fontSize: '1.5em', marginBottom: '10px' }}>Periféricos</h3>
          <p style={{ color: '#777', fontSize: '1em', marginBottom: '20px' }}>
            Monitores, teclados, ratones y más para completar tu estación de trabajo o gaming.
          </p>
          <a href="/productos" style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold' }}>Ver Periféricos</a>
        </div>

        <div style={{ width: '30%', padding: '30px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
          <h3 style={{ color: '#333', fontSize: '1.5em', marginBottom: '10px' }}>Promociones</h3>
          <p style={{ color: '#777', fontSize: '1em', marginBottom: '20px' }}>
            Descubre las ofertas especiales y descuentos en productos seleccionados.
          </p>
          <a href="/productos" style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold' }}>Ver Promociones</a>
        </div>
      </section>
    </main>
  );
}
function ProductsPage() {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3005/productos')
      .then(response => response.json())
      .then(data => setProductos(data)) 
      .catch(error => console.error("Error cargando productos:", error));
  }, []);

  useEffect(() => {
    setProductosFiltrados(
      productos.filter(producto => producto.label === categoriaSeleccionada)
    );
  }, [categoriaSeleccionada, productos]);

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar con ancho fijo */}
      <Sidebar setCategoriaSeleccionada={setCategoriaSeleccionada} />

      <main style={{
        flexGrow: 1, // Ocupa el espacio restante al lado del sidebar
        marginLeft: '50px',
        marginTop: '5px',
        padding: '20px'
      }}>
        <h1>Productos - {categoriaSeleccionada || "Todas las categorías"}</h1>
        <p>Aquí puedes encontrar diferentes componentes para computadoras.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {(productosFiltrados.length > 0 ? productosFiltrados : productos).map(producto => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </main>
    </div>
  );
}




function Contacto() {
  return (
    <div>
      {/* Sección superior con imagen de fondo */}
      <div style={{
        height: '325px',  
        backgroundImage: 'url(/images/tienda-transformed.jpeg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        {/* Aquí puedes poner algo si deseas superponer algún contenido sobre la imagen */}
      </div>

      {/* Sección de contenido debajo de la imagen */}
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '20px' }}>Contáctanos</h1>
        
        <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
          Estamos ubicados en <strong>Camino Real a Cholula #894, Puebla, México</strong>. Si tienes alguna duda o consulta, no dudes en contactarnos.
        </p>

        <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
          <strong>Correo electrónico:</strong> contacto@techhardwarepro.com
        </p>
        
        <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
          <strong>Teléfono:</strong> +52 222 123 4567
        </p>

        {/* Redes sociales con iconos */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <FaFacebook size={40} />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <FaTwitter size={40} />
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
    <FaInstagram size={40} />
  </a>
</div>
      </div>
    </div>
  );
}

function AvisoPrivacidad() {
  return (
    <div style={{ padding: '50px', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ fontSize: '2.5em', marginBottom: '20px', textAlign: 'center' }}>Aviso de Privacidad</h1>

      <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
        En <strong>TechHardware Pro</strong>, valoramos tu privacidad y estamos comprometidos con la protección de tus datos personales. Esta política de privacidad describe cómo recopilamos, usamos y compartimos la información que obtenemos de ti a través de nuestro sitio web.
      </p>

      <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>Información que Recopilamos</h2>
      <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
        Recopilamos varios tipos de información, que incluyen:
      </p>
      <ul style={{ fontSize: '1.2em', marginBottom: '20px', lineHeight: '1.8em' }}>
        <li>Datos personales como nombre, dirección de correo electrónico, y número de teléfono cuando te registras o realizas una compra.</li>
        <li>Información relacionada con tus compras, como productos adquiridos y métodos de pago utilizados.</li>
        <li>Datos de navegación y cookies que recopilan información sobre tu comportamiento en el sitio.</li>
      </ul>

      <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>Uso de la Información</h2>
      <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
        La información que recopilamos es utilizada para los siguientes fines:
      </p>
      <ul style={{ fontSize: '1.2em', marginBottom: '20px', lineHeight: '1.8em' }}>
        <li>Procesar tus compras y brindarte el soporte necesario.</li>
        <li>Enviar actualizaciones sobre productos, ofertas especiales y promociones.</li>
        <li>Mejorar nuestra plataforma, asegurando que ofrecemos una experiencia personalizada y segura.</li>
      </ul>

      <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>Protección de los Datos</h2>
      <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
        En TechHardware Pro, implementamos medidas de seguridad apropiadas para proteger tu información personal contra el acceso no autorizado, alteración o divulgación.
      </p>

      <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>Tus Derechos</h2>
      <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
        Tienes derecho a acceder, rectificar o eliminar tus datos personales, así como a limitar su uso o solicitar su portabilidad. Si deseas ejercer cualquiera de estos derechos, contáctanos a través de nuestro correo electrónico: <strong>privacidad@techhardwarepro.com</strong>.
      </p>

      <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>Contacto</h2>
      <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
        Si tienes alguna pregunta o inquietud sobre este Aviso de Privacidad, por favor contáctanos en <strong>privacidad@techhardwarepro.com</strong> o llama al +52 222 123 4567.
      </p>

      <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
        Última actualización: <strong>28 de octubre de 2024</strong>.
      </p>
    </div>
  );
}

function PoliticaGarantia() {
  return (
    <div style={{ padding: '50px', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ fontSize: '2.5em', marginBottom: '20px', textAlign: 'center' }}>Política de Garantía</h1>

      <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
        En <strong>TechHardware Pro</strong>, nos esforzamos por ofrecer productos de alta calidad y confiabilidad. Entendemos la importancia de la seguridad de tu compra, por lo que ofrecemos garantías en todos nuestros productos. A continuación, encontrarás la información sobre las condiciones y procedimientos de garantía.
      </p>

      <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>Duración de la Garantía</h2>
      <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
        La mayoría de los productos que ofrecemos en TechHardware Pro cuentan con una garantía de entre <strong>6 a 24 meses</strong>, dependiendo del fabricante. En caso de que un producto específico tenga una garantía diferente, esta será detallada en la descripción del producto al momento de la compra.
      </p>

      <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>Condiciones de Garantía</h2>
      <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
        Para que la garantía sea válida, deben cumplirse las siguientes condiciones:
      </p>
      <ul style={{ fontSize: '1.2em', marginBottom: '20px', lineHeight: '1.8em' }}>
        <li>El producto no debe presentar daños físicos o alteraciones que no sean atribuibles al uso normal.</li>
        <li>Debe conservarse el comprobante de compra original.</li>
        <li>La garantía no cubre daños causados por accidentes, mal uso o modificaciones no autorizadas.</li>
      </ul>

      <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>Procedimiento para Solicitar Garantía</h2>
      <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
        Si necesitas hacer uso de la garantía de alguno de nuestros productos, sigue los siguientes pasos:
      </p>
      <ol style={{ fontSize: '1.2em', marginBottom: '20px', lineHeight: '1.8em' }}>
        <li>Contacta a nuestro equipo de soporte a través del correo <strong>soporte@techhardwarepro.com</strong> o al teléfono +52 222 123 4567.</li>
        <li>Proporciona la información del producto, el número de orden, y describe el problema que has experimentado.</li>
        <li>Te daremos instrucciones para el envío o revisión del producto y determinaremos si el problema está cubierto por la garantía.</li>
        <li>Si el producto cumple con las condiciones de garantía, procederemos con la reparación, sustitución o reembolso, según el caso.</li>
      </ol>

      <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>Exclusiones de Garantía</h2>
      <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
        Las siguientes situaciones no están cubiertas por la garantía:
      </p>
      <ul style={{ fontSize: '1.2em', marginBottom: '20px', lineHeight: '1.8em' }}>
        <li>Daños causados por instalación incorrecta o uso inapropiado del producto.</li>
        <li>Desgaste normal debido al uso.</li>
        <li>Modificaciones o reparaciones realizadas por terceros no autorizados.</li>
        <li>Daños por accidentes, incendios, inundaciones o desastres naturales.</li>
      </ul>

      <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>Contacto</h2>
      <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
        Para más información sobre nuestra política de garantía o si tienes alguna duda, puedes contactarnos en <strong>soporte@techhardwarepro.com</strong> o llamarnos al +52 222 123 4567.
      </p>

      <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
        Última actualización: <strong>28 de octubre de 2024</strong>.
      </p>
    </div>
  );
}


export default App;

