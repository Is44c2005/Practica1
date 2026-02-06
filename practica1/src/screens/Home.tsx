import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Home.css"; 

function Home() {
  // 1. Estado para el contador de likes
  const [count, setCount] = useState(0);

  // 2. Estado para la Excusa Random
  const [excusa, setExcusa] = useState("¡Compila y cruza los dedos!");
  
  // 3. Estado para la Energía (Café)
  const [energia, setEnergia] = useState(30);

  useEffect(() => {
    document.body.classList.add("page-home");
    return () => {
      document.body.classList.remove("page-home");
    };
  }, []);

  // --- LÓGICA DE LAS EXCUSAS ---
  const generarExcusa = () => {
    const listaExcusas = [
      "En mi máquina funcionaba 🤷‍♂️",
      "Eso no es un bug, es una feature ✨",
      "Alguien borró esa línea, no fui yo...",
      "Es problema del caché, refresca",
      "Lo arreglaré en el próximo commit",
      "¡Falta un punto y coma!",
      "Es culpa del servidor, seguro."
    ];
    // Elegir una al azar
    const random = Math.floor(Math.random() * listaExcusas.length);
    setExcusa(listaExcusas[random]);
  };

  // --- LÓGICA DEL CAFÉ ---
  const tomarCafe = () => {
    if (energia < 100) {
      setEnergia(energia + 20);
    } else {
      setEnergia(10); // Si te pasas, te da un "bajón" de cafeína
      alert("¡Demasiada cafeína! 😵‍💫 Tienes que dormir.");
    }
  };

  // Calculamos el color de la barra según la energía
  const getColorBarra = () => {
    if (energia < 30) return "#ff4b2b"; // Rojo (Peligro)
    if (energia < 70) return "#ffcc00"; // Amarillo (Medio)
    return "#00ff88"; // Verde (A tope)
  };

  return (
    <div className="home-container">
      
      {/* Header Principal */}
      <header className="main-header">
        <h1>Zaky Devs</h1>
        <p className="subtitle">Selecciona un perfil para ver los detalles</p>
      </header>

      {/* Grid de Navegación (Tarjetas) */}
      <div className="team-grid">
        <Link to="/isaac" className="profile-card">
          <span className="avatar-placeholder">👨‍💻</span>
          <span className="profile-name">Isaac</span>
          <span className="profile-role">IA Enthusiast</span>
        </Link>

        <Link to="/mateo" className="profile-card">
          <span className="avatar-placeholder">🎨⚙️</span>
          <span className="profile-name">Mateo</span>
          <span className="profile-role">FullStack Developer</span>
        </Link>

        <Link to="/agujin" className="profile-card">
          <span className="avatar-placeholder">🛡️</span>
          <span className="profile-name">Agujin</span>
          <span className="profile-role">Cybersec</span>
        </Link>
      </div>

      {/* ZONA DE WIDGETS INTERACTIVOS */}
      <div className="widgets-container">
        
        {/* Widget 1: Contador */}
        <section className="interactive-card">
          <h3>⚡ Popularidad</h3>
          <p>Danos amor:</p>
          <button onClick={() => setCount(count + 1)} className="action-btn like-btn">
             {count} ❤️ Likes
          </button>
        </section>

        {/* Widget 2: Generador de Excusas (NUEVO) */}
        <section className="interactive-card">
          <h3>🎲 Excusa Dev</h3>
          <p className="excuse-text">"{excusa}"</p>
          <button onClick={generarExcusa} className="action-btn excuse-btn">
            Nueva Excusa
          </button>
        </section>

        {/* Widget 3: Nivel de Cafeína (NUEVO) */}
        <section className="interactive-card">
          <h3>☕ Nivel de Cafeína</h3>
          <div className="progress-bar-container">
            <div 
              className="progress-fill" 
              style={{ width: `${energia}%`, backgroundColor: getColorBarra() }}
            ></div>
          </div>
          <p>{energia}% Cargado</p>
          <button onClick={tomarCafe} className="action-btn coffee-btn">
            Beber Café
          </button>
        </section>

      </div>

    </div>
  );
}

export default Home;