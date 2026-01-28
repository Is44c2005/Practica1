import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/Isaac.css";

function Isaac() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (!showScroll && window.pageYOffset > 400) setShowScroll(true);
      else if (showScroll && window.pageYOffset <= 400) setShowScroll(false);
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, [showScroll]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="portfolio-container">
      {/* Hero Section */}
      <header className="hero">
        <h1 className="highlight">Hola, soy Isaac 🚀</h1>
        <p className="hero-subtitle">
          Estudiante de Software | Entusiasta de la Inteligencia Artificial
        </p>
      </header>

      {/* Sobre Mí */}
      <section className="section about">
        <h2>Sobre mí</h2>
        <p>
          Soy un estudiante apasionado por la tecnología y la innovación. 
          Me defino por mi <strong>disciplina</strong> y curiosidad constante. 
          Mi objetivo principal es dominar el mundo de la <strong>Inteligencia Artificial</strong>, 
          mientras construyo bases sólidas en desarrollo de software.
        </p>
      </section>

      {/* Grid de Habilidades */}
      <div className="skills-grid">
        <section className="section tech-skills">
          <h3>💻 Stack Tecnológico</h3>
          <ul className="skill-list">
            <li><strong>Python</strong> (IA & Scripting)</li>
            <li><strong>Java</strong> (Backend & POO)</li>
            <li><strong>C</strong> (Bajo nivel)</li>
            <li><strong>React</strong> (Frontend)</li>
          </ul>
        </section>

        <section className="section soft-skills">
          <h3>🧠 Habilidades & Idiomas</h3>
          <ul className="skill-list">
            <li>🇺🇸 Inglés B2</li>
            <li>🤝 Trabajo en equipo</li>
            <li>🗣️ Comunicación asertiva</li>
            <li>💡 Pensamiento crítico</li>
          </ul>
        </section>
      </div>

      {/* Intereses Personales */}
      <section className="section hobbies">
        <h3>🎵 Fuera del código</h3>
        <p>
          Creo en el equilibrio vida-trabajo. Cuando no estoy programando, 
          disfruto mucho de la <strong>música</strong> y el <strong>deporte</strong>, 
          actividades que mantienen mi mente despejada y lista para nuevos retos.
        </p>
      </section>

      {/* Botón Scroll Top */}
      {showScroll && (
        <button onClick={scrollTop} className="back-to-top">
          ↑ Subir
        </button>
      )}

      {/* Footer */}
      <footer className="nav-footer">
        <Link to="/" className="btn-back">← Volver al Home</Link>
        <div className="footer-links">
          <span>Ver otros perfiles: </span>
          <Link to="/mateo">Mateo</Link> | <Link to="/agujin">Agujin</Link>
        </div>
      </footer>
    </div>
  );
}

export default Isaac;
