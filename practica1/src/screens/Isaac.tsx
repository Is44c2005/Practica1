import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/Isaac.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";


const MOVIE_ID = "157336"; 
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDIwMjAyNGIyMTA0Yzc5NmJlMjJkZTU1OTJiMTkzNyIsIm5iZiI6MTc3MDA3OTE4OC4xNjIsInN1YiI6IjY5ODE0M2Q0ZjEzZTU3NmM4MDQxOGZhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TGFd2-EaVUf2MKRmqmNEBI9_vURiac-XP0C1tyJSMq4";

function Isaac() {
  const [showScroll, setShowScroll] = useState(false);
  const [perfil, setPerfil] = useState<any>(null);
  const [peli, setPeli] = useState<any>(null);
  const [cargando, setCargando] = useState(true); // Nuevo estado para controlar la carga

  useEffect(() => {
    document.body.classList.add("page-isaac");
    return () => {
      document.body.classList.remove("page-isaac");
    };
  }, []);

  useEffect(() => {
    const cargarTodo = async () => {
      setCargando(true); // Empezamos a cargar

      // 1. Intentar cargar Firebase
      try {
        const docRef = doc(db, "Isaac", "AOBXEbRYURq5sMvWh8X8");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPerfil(docSnap.data());
        } else {
          console.log("⚠️ No se encontró en Firebase (Usando datos de prueba)");
          // Datos de relleno por si falla Firebase, para que NO se rompa la página
          setPerfil({
            Nombre: "Isaac (Modo Prueba)",
            Edad: 20,
            Imagen: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          });
        }
      } catch (error) {
        console.error("Error Firebase:", error);
        // Si falla la conexión, usamos datos de relleno también
        setPerfil({ Nombre: "Isaac (Offline)", Edad: "?", Imagen: "" });
      }

      // 2. Cargar API TMDB
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_TOKEN}` 
          }
        };

        const response = await fetch(`https://api.themoviedb.org/3/movie/${MOVIE_ID}?language=es-MX`, options);
        
        if (response.ok) {
            const data = await response.json();
            setPeli(data);
        } else {
            console.error("Error API Películas:", response.status);
        }
      } catch (err) {
        console.error("Error cargando película:", err);
      } finally {
        // Termine bien o mal, quitamos la pantalla de carga
        setCargando(false);
      }
    };

    cargarTodo();
  }, []);

  // Lógica del scroll
  useEffect(() => {
    const checkScroll = () => {
      if (!showScroll && window.pageYOffset > 400) setShowScroll(true);
      else if (showScroll && window.pageYOffset <= 400) setShowScroll(false);
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, [showScroll]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // PANTALLA DE CARGA MEJORADA
  if (cargando) {
    return <div className="portfolio-container-isaac"><h2>Cargando datos... ⏳</h2></div>;
  }

  // Si después de cargar, perfil sigue siendo null (muy raro con el fix), mostramos error
  if (!perfil) return <div className="portfolio-container"><h2>Error al cargar el perfil ❌</h2></div>;

  return (
    <div className="portfolio-container-isaac">
      <header className="hero">
        {perfil.Imagen && (
          <img src={perfil.Imagen} alt="Isaac" className="profile-pic" />
        )}
        <h1 className="highlight">Hola, soy {perfil.Nombre} 🚀</h1>
        <p className="hero-subtitle">
          Estudiante de Software | {perfil.Edad} años | Entusiasta de la IA
        </p>
      </header>

      <section className="section about">
        <h2>Sobre mí</h2>
        <p>
          Soy un estudiante apasionado por la tecnología. Tengo <strong>{perfil.Edad} años</strong>.
          Me defino por mi <strong>disciplina</strong> y curiosidad constante. 
          Mi objetivo principal es dominar el mundo de la <strong>Inteligencia Artificial</strong>.
        </p>
      </section>

      {/* --- SECCIÓN DE LA PELÍCULA --- */}
      {peli ? (
        <section className="section movie-section">
          <h3>🎬 Mi Película Favorita</h3>
          <div className="movie-card">
            <div className="movie-poster-container">
               {/* Verificamos que exista poster_path antes de mostrarlo */}
               {peli.poster_path ? (
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${peli.poster_path}`} 
                    alt={peli.title} 
                    className="movie-poster" 
                  />
               ) : <div className="no-poster">Sin Imagen</div>}
            </div>
            <div className="movie-info">
              <h4>{peli.title}</h4>
              <span className="movie-tagline">"{peli.tagline}"</span>
              <p className="movie-overview">{peli.overview ? peli.overview.substring(0, 150) + "..." : "Sin descripción."}</p>
              <div className="movie-meta">
                <span className="rating">⭐ {peli.vote_average?.toFixed(1)}</span>
                <span className="date">📅 {peli.release_date?.split("-")[0]}</span>
              </div>
              <a href={`https://www.themoviedb.org/movie/${peli.id}`} target="_blank" rel="noreferrer" className="btn-movie">
                Ver detalles
              </a>
            </div>
          </div>
        </section>
      ) : (
        // Si falla la API de películas, mostramos esto
        <section className="section">
            <p>⚠️ No se pudo cargar la película. Revisa tu Token de API.</p>
        </section>
      )}

      {/* ... STACK TECNOLÓGICO Y SKILLS ... */}
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
            <li>Inglés B2</li>
            <li>🤝 Trabajo en equipo</li>
            <li>🗣️ Comunicación asertiva</li>
            <li>💡 Pensamiento crítico</li>
          </ul>
        </section>
      </div>

       {/* ... VIDEO Y FOOTER ... */}
       <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/SOJpE1KMUbo?si=jgd3BSeesjTmel8h"
        title="YouTube video"
        style={{marginTop: "20px", borderRadius: "15px", maxWidth: "90%", border: "2px solid #333"}} 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      {showScroll && (
        <button onClick={scrollTop} className="back-to-top">↑ Subir</button>
      )}

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
