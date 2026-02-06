import React, { useEffect, useState } from 'react';
import { 
  doc, getDoc, updateDoc, collection, addDoc, 
  onSnapshot, query, orderBy, deleteDoc 
} from 'firebase/firestore';
import { db, storage } from '../firebase'; 
import './css/Agujin.css';

function Agujin() {

  // --- Estados para Usuarios ---
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState<any[]>([]); // Lista de usuarios
  
  const [newUser, setNewUser] = useState({
    nombre: '',
    universidad: '',
    rol: '',
    email: ''
  });



  // 3. Crear Usuario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Agujin"), {
        ...newUser,
        fechaCreacion: new Date() // Importante para ordenar
      });
      setNewUser({ nombre: '', universidad: '', rol: '', email: '' }); 
      setShowForm(false);
    } catch (error) { alert("Error al guardar."); }
  };

  // 4. Borrar Usuario (Extra: por si te equivocas)
  const handleDeleteUser = async (id: string) => {
    if (window.confirm("¿Seguro que quieres borrar este usuario?")) {
      await deleteDoc(doc(db, "Agujin", id));
    }
  };


  return (
    <div id="agujin-personal-page">
      <div className="portfolio-container">
        
        {/* HERO */}
        <header className="glass-card header-flex">
          <div className="img-wrapper">
  
          </div>
          <div className="text-section">
            <h1>Hola, soy <span className="highlight">Flavio Alejandro Ibujes</span></h1>
            <p className="role">Ingeniería de Software - UDLA</p>
          </div>
        </header>

        {/* --- SECCIÓN ADMIN: AGREGAR Y MOSTRAR --- */}
        <div className="admin-section">
          <div className="admin-header">
            <h2>Gestión de Usuarios</h2>
            <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cerrar Formulario' : '+ Nuevo Usuario'}
            </button>
          </div>

          {/* Formulario */}
          {showForm && (
            <form className="glass-card user-form" onSubmit={handleCreateUser}>
              <div className="form-group">
                <input type="text" name="nombre" placeholder="Nombre" value={newUser.nombre} onChange={handleInputChange} required />
                <input type="text" name="universidad" placeholder="Universidad" value={newUser.universidad} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <input type="text" name="rol" placeholder="Rol" value={newUser.rol} onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} />
              </div>
              <button type="submit" className="btn-save">Guardar en Base de Datos</button>
            </form>
          )}

          {/* LISTA DE USUARIOS (TABLA) */}
          <div className="users-list">
            {users.length === 0 ? (
              <p className="empty-msg">No hay usuarios registrados aún.</p>
            ) : (
              <div className="grid-users">
                {users.map((user) => (
                  <div key={user.id} className="user-card">
                    <div className="user-info">
                      <h3>{user.nombre}</h3>
                      <span className="badge-role">{user.rol || 'Sin rol'}</span>
                      <p className="school-text">{user.universidad}</p>
                      <p className="email-text">{user.email}</p>
                    </div>
                    <button className="btn-delete" onClick={() => handleDeleteUser(user.id)}>🗑️</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <iframe 
        width="560" height="315" 
        src="https://www.youtube.com/embed/LEhTlLnOVDU?si=MUgPt4oS3sR0j0C-" title="YouTube video player" 
        frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
        picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

      </div>
    </div>
  );
}

export default Agujin;