import { useState } from "react";
import "./css/Mateo.css";
import fotoPerfil from "../assets/fotos/heidelberg.jpg";
import foto1 from "../assets/fotos/hamburgo.jpg";
import foto2 from "../assets/fotos/udla.jpeg";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";

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
    }
  ]; 

  const [posts, setPosts] = useState(postsIniciales);

  const [postSeleccionado, setPostSeleccionado] = useState<any>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const obtenerPosts = async () => {
      const snapshot = await getDocs(collection(db, "posts"));

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setPosts(data as any);
    };

    obtenerPosts();
  }, []);

  return (
    <div className="perfil">

      {/* HEADER */}
      <div className="perfil-header">
        <img src={fotoPerfil} alt="Foto de perfil" className="perfil-foto" />
        <h2>@mateo.cuevaa</h2>
        <p>Ing. Software</p>
        <p>UDLA</p>
        <p>2005</p>
      </div>

      {/* CANCIÓN FAVORITA */}
      <div className="musica">
        <h3>🎵 Mi canción favorita</h3>

        <iframe 
          src="https://www.youtube.com/embed/Th-WfPibwTQ"
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

    </div>
  );
}


export default Mateo;
