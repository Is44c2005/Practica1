import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Asegúrate de importar el CSS nuevo
import "./css/Home.css"; 

function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.body.classList.add("page-home");
    return () => {
      document.body.classList.remove("page-home");
    };
  }, []);

  return (
    <div className="home-container">
      
      {/* Header Principal */}
      <header className="main-header">
        <h1>Zaky Devs</h1>
        <p className="subtitle">Selecciona un perfil para ver los detalles</p>
      </header>

      {/* Grid de Navegación (Tarjetas) */}
      <div className="team-grid">
        
        {/* Tarjeta 1: Isaac */}
        <Link to="/isaac" className="profile-card">
          <span className="avatar-placeholder">👨‍💻</span>
          <span className="profile-name">Isaac</span>
          <span className="profile-role">IA Enthusiast</span>
        </Link>

        {/* Tarjeta 2: Mateo */}
        <Link to="/mateo" className="profile-card">
          <span className="avatar-placeholder">🎨⚙️</span>
          <span className="profile-name">Mateo</span>
          <span className="profile-role">FullStack Developer</span>
        </Link>

        {/* Tarjeta 3: Agujin */}
        <Link to="/agujin" className="profile-card">
          <span className="avatar-placeholder">🛡️</span>
          <span className="profile-name">Agujin</span>
          <span className="profile-role">Cybersec</span>
        </Link>

      </div>

      {/* Zona Interactiva */}
      <section className="interactive-zone">
        <h3>⚡ Contador de likes</h3>
        <p>Deja tu like:</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="counter-btn"
        >
          Likes recibidos: {count} ❤️
        </button>
      </section>

    </div>
  );
}

export default Home;
