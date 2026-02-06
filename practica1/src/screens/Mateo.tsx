import { useEffect, useState } from "react";
import "./css/Mateo.css";
import foto1 from "../assets/fotos/hamburgo.jpg";
import foto2 from "../assets/fotos/udla.jpeg";
import foto3 from "../assets/fotos/heidelberg.jpg";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function Mateo() {
    const postsIniciales = [
    {
      id: 1,
      imagen: foto1,
      descripcion: "Hamburgo, Alemania",
      likes: 0
    },
    {
      id: 2,
      imagen: foto2,
      descripcion: "UDLA ",
      likes: 0
    },
    {
      id: 3,
      imagen: foto3,
      descripcion: "Castillo de Heidelberg, Alemania",
      likes: 0
    }
  ]; 

  const [posts, setPosts] = useState(postsIniciales);

  const [postSeleccionado, setPostSeleccionado] = useState<any>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  
  const [perfil, setPerfil] = useState<any>(null);

  const [nasaData, setNasaData] = useState<any>(null);


  useEffect(() => {
    document.body.classList.add("page-mateo");
    return () => {
      document.body.classList.remove("page-mateo");
    };
  }, []);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const ref = doc(db, "Mateo", "nf34bTvUqLpmZmESc5fP");
        const snap = await getDoc(ref);

        if (snap.exists()) {
          console.log("DATOS FIREBASE:", snap.data());
          setPerfil(snap.data());
        } else {
          console.log(" El documento NO existe");
        }
      } catch (error) {
        console.error(" Error al traer perfil:", error);
      }
    };

    obtenerPerfil();
  }, []);

    {/* UseEffect para consumir la API de la NASA*/}

  useEffect(() => {
    const obtenerFotoNASA = async () => {
      try {
        const response = await fetch(
          "https://api.nasa.gov/planetary/apod?api_key=AXHqHSq8beZlKGUztdkU4Kyl8xVccvPGqM0JBfvX"
        );
        const data = await response.json();
        console.log("NASA DATA:", data);
        setNasaData(data);
      } catch (error) {
        console.error("Error al traer la foto de la NASA", error);
      }
    };

    obtenerFotoNASA();
  }, []);

  {/* Evitar que react se rompa mientras se carga Firebase */}
  if (!perfil) {
  return <p>Cargando perfil...</p>;
  }

  return (
    <div className="perfil">

      {/* HEADER */}
      <div className="perfil-header">
        <img src={perfil.foto} alt="Foto de perfil" className="perfil-foto" />
        <h2>@{perfil.Nombre}</h2>
        <p>{perfil.Edad} años</p>
        <p>Ing. Software</p>
        <p>UDLA</p>
      </div>

      {/* CANCIÓN FAVORITA */}
      <div className="musica">
        <h3> 🟢Mi canción favorita : HECTOL - FEID 🟢</h3>

        <iframe 
          src="https://www.youtube.com/embed/NwKP92AoB04"
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      {/* GALERÍA */}
      <div className="galeria">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <img
              src={post.imagen}
              onClick={() => {
                setPostSeleccionado(post);
                setMostrarModal(true);
               }}
            />
            <p>{post.descripcion}</p>

            <button
              onClick={() => {
                const nuevosPosts = posts.map(p =>
                  p.id === post.id
                    ? { ...p, likes: p.likes + 1 }
                    : p
                );
                setPosts(nuevosPosts);
              }}
            >
              ❤️ {post.likes}
            </button>
          </div>
        ))}
      </div>

      {mostrarModal && postSeleccionado && (
        <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            <img src={postSeleccionado.imagen} />
            <p>{postSeleccionado.descripcion}</p>

            <button
              onClick={() => {
                const nuevosPosts = posts.map(p =>
                  p.id === postSeleccionado.id
                    ? { ...p, likes: p.likes + 1 }
                    : p
                );

                setPosts(nuevosPosts);

                const actualizado = nuevosPosts.find(
                  p => p.id === postSeleccionado.id
                );
                setPostSeleccionado(actualizado);
              }}
            >
              ❤️ {postSeleccionado.likes}
            </button>

          </div>
        </div>
      )}

      
      {/* FOTO DIARIA DE LA NASA */}
      {nasaData && (
        <div className="nasa-section">
          <h3 className="nasa-title">Foto diaria de la NASA</h3>

          {nasaData.media_type === "image" ? (
            <img
              src={nasaData.url}
              alt={nasaData.title}
              className="nasa-image"
            />
          ) : (
            <iframe
              src={nasaData.url}
              title="NASA video"
              allowFullScreen
            ></iframe>
          )}
          <div className="nasa-content">
            <h4 className="nasa-image-title">Título: {nasaData.title}</h4>
            <p className="nasa-description">Descripción: </p>
            <p> {nasaData.explanation}</p>
            <p className="nasa-date">📅 {nasaData.date}</p>
          </div>

        </div>
      )}

      <footer className="nav-footer-mateo">
        <Link to="/home" className="btn-back-mateo">← Volver al Home</Link>
        <div className="footer-links-mateo">
          <span>Ver otros perfiles: </span>
          <Link to="/isaac">Isaac</Link> | <Link to="/agujin">Agujin</Link>
        </div>
      </footer>
    

      

    </div>
  )
}


export default Mateo;
