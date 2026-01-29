import { useState } from "react";
import "./css/Mateo.css";
import fotoPerfil from "../assets/fotos/heidelberg.jpg";
import foto1 from "../assets/fotos/hamburgo.jpg";
import foto2 from "../assets/fotos/udla.jpeg";

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
