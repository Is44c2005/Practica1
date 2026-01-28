import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white', borderRadius: '8px' }}>
        <h1>🚀 ¡Proyecto Funcionando!</h1>
        <p>Estás en el componente <strong>Home.tsx</strong></p>
      </header>

      <section style={{ margin: '20px 0' }}>
        <h3>Probando Hooks:</h3>
        <p>Si haces clic y el número aumenta, React está operando bien:</p>
        <button 
          onClick={() => setCount(count + 1)}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          Contador: {count}
        </button>
      </section>

      <hr />

      <nav>
        <h3>Navegación de Rutas:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '10px 0' }}>
            <Link to="/isaac" style={{ color: '#61dafb', textDecoration: 'none', fontWeight: 'bold' }}>
              👉 Ir a Perfil de Isaac
            </Link>
          </li>
          <li style={{ margin: '10px 0' }}>
            <Link to="/mateo" style={{ color: '#61dafb', textDecoration: 'none', fontWeight: 'bold' }}>
              👉 Ir a Perfil de Mateo
            </Link>
          </li>
          <li style={{ margin: '10px 0' }}>
            <Link to="/agujin" style={{ color: '#61dafb', textDecoration: 'none', fontWeight: 'bold' }}>
              👉 Ir a Perfil de Agujin
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;