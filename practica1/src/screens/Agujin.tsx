import React, { useEffect, useState } from 'react';
import { 
  doc, getDoc, collection, addDoc, 
  onSnapshot, query, orderBy, deleteDoc 
} from 'firebase/firestore';
import { db } from '../firebase'; 
import './css/Agujin.css';

function Agujin() {
  // --- Estados de Perfil ---
  const [imageUrl, setImageUrl] = useState<string>('');
  const docId = "00UuCFRx1ZfrGYGOqHFC"; 

  // --- Estados de Usuarios ---
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState<any[]>([]); 
  const [newUser, setNewUser] = useState({
    nombre: '', universidad: '', rol: '', email: ''
  });

  // --- Estados PokeAPI ---
  const [pokeName, setPokeName] = useState('');
  const [pokeData, setPokeData] = useState<any>(null);
  const [loadingPoke, setLoadingPoke] = useState(false);
  const [errorPoke, setErrorPoke] = useState('');

  // 1. CARGA INICIAL
  useEffect(() => {
    // A. Perfil
    const fetchProfile = async () => {
      try {
        const docSnap = await getDoc(doc(db, "Agujin", docId));
        if (docSnap.exists()) {
          const data = docSnap.data();
          let photo = data["foto"] || '';
          if (photo.includes('drive.google.com')) {
             const idMatch = photo.match(/\/d\/(.+?)\//);
             if (idMatch) photo = `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
          }
          setImageUrl(photo);
        }
      } catch (err) { console.error("Error perfil:", err); }
    };
    fetchProfile();

    // B. Usuarios
    const q = query(collection(db, "Agujin"), orderBy("fechaCreacion", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .filter((user: any) => user.id !== docId); 
      setUsers(usersData);
    });
    return () => unsubscribe();
  }, []);

  // --- 2. BUSCADOR POKEMON (CORREGIDO PARA TIPOS MULTIPLES) ---
  const searchPokemon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pokeName) return;
    
    setLoadingPoke(true);
    setErrorPoke('');
    setPokeData(null);

    try {
      const name = pokeName.toLowerCase();
      const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Pokemon no encontrado');

      const data = await response.json();
      
      setPokeData({
        name: data.name,
        id: data.id,
        img: data.sprites.front_default,
        // CAMBIO AQUÍ: Guardamos TODO el array de tipos, no solo el [0]
        types: data.types 
      });

    } catch (error: any) {
      console.error(error);
      setErrorPoke(error.message);
    } finally {
      setLoadingPoke(false);
    }
  };

  // 3. Crear Usuario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Agujin"), {
        ...newUser,
        fechaCreacion: new Date()
      });
      setNewUser({ nombre: '', universidad: '', rol: '', email: '' }); 
      setShowForm(false);
    } catch (error) { alert("Error al guardar."); }
  };

  // 4. Borrar Usuario
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
          <div className="profile-wrapper">
             <img src={imageUrl || 'https://via.placeholder.com/150'} alt="Perfil" className="profile-img" />
          </div>
          <div className="text-section">
            <h1>Hola, soy <span className="highlight">Flavio Alejandro Ibujes</span></h1>
            <p className="role">Ingeniería de Software - UDLA</p>
          </div>
        </header>

        {/* VIDEO */}
        <div className="video-container" style={{ marginTop: '40px', textAlign: 'center', marginBottom: '40px' }}>
          <iframe 
            width="100%" height="400" 
            src="https://www.youtube.com/embed/LEhTlLnOVDU?si=MUgPt4oS3sR0j0C-" 
            title="YouTube video player" frameBorder="0" allowFullScreen
            style={{ borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}
          ></iframe>
        </div>

        {/* --- SECCIÓN POKEAPI --- */}
        <div className="api-section glass-card" style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h2>Buscador de Pokemones por nombre : </h2>
          
          <form onSubmit={searchPokemon} className="search-box" style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '20px 0' }}>
            <input 
              type="text" placeholder="Ej: bulbasaur, charizard, darkrai ..." 
              value={pokeName} onChange={(e) => setPokeName(e.target.value)}
              className="api-input"
              style={{ padding: '12px', borderRadius: '10px', border: 'none', width: '60%' }}
            />
            <button type="submit" className="btn-primary" disabled={loadingPoke}>
              {loadingPoke ? '...' : 'Buscar'}
            </button>
          </form>

          {errorPoke && <p style={{color: '#ef4444', fontWeight: 'bold'}}>{errorPoke}</p>}

          {/* RESULTADO */}
          {pokeData && (
            <div className="poke-results" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="poke-card" style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px', textAlign: 'center', width: '220px', border: '1px solid #3b82f6' }}>
                
                <img src={pokeData.img} alt={pokeData.name} style={{ width: '100px', height: '100px', imageRendering: 'pixelated' }} />
                
                <h3 style={{ textTransform: 'capitalize', fontSize: '1.5rem', margin: '10px 0' }}>{pokeData.name}</h3>
                <p style={{ fontSize: '0.9rem', color: '#ccc' }}>#{pokeData.id}</p>
                
                {/* CAMBIO AQUÍ: Mapeamos el array para mostrar TODOS los tipos */}
                <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '10px' }}>
                  {pokeData.types.map((slot: any, index: number) => (
                    <span key={index} style={{ 
                      background: '#3b82f6', 
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      fontSize: '0.8rem', 
                      textTransform: 'capitalize'
                    }}>
                      {slot.type.name}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          )}
        </div>

        {/* --- SECCIÓN USUARIOS --- */}
        <div className="admin-section">
          <div className="admin-header">
            <h2>Gestión de Usuarios</h2>
            <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cerrar Formulario' : '+ Nuevo Usuario'}
            </button>
          </div>

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
              <button type="submit" className="btn-save">Guardar</button>
            </form>
          )}

          <div className="users-list">
            <div className="grid-users">
              {users.map((user) => (
                <div key={user.id} className="user-card">
                  <div className="user-info">
                    <h3>{user.nombre}</h3>
                    <span className="badge-role">{user.rol || 'Sin rol'}</span>
                    <p className="school-text">{user.universidad}</p>
                    <p className="email-text">{user.email}</p>
                  </div>
                  <button className="btn-save" style={{background: '#ef4444', marginTop: '10px'}} onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Agujin;