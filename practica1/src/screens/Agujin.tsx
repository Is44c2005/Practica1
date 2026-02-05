import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase'; 
import './css/Agujin.css';

const Agujin = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // ID de tu documento en Firestore
  const docId = "BGQGB3SafoTzzLZrry9U";

  useEffect(() => {
    document.body.classList.add("page-agujin");
    return () => {
      document.body.classList.remove("page-agujin");
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "Agujin", docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setImageUrl(data["Foto de perfil"] || '');
        }
      } catch (error) {
        console.error("Error al cargar:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // 1. Referencia en Firebase Storage
      const storageRef = ref(storage, `perfiles/${file.name}`);
      
      // 2. Subir archivo
      await uploadBytes(storageRef, file);
      
      // 3. Obtener URL de descarga
      const downloadURL = await getDownloadURL(storageRef);
      
      // 4. Actualizar el campo en Firestore
      const userDoc = doc(db, "Agujin", docId);
      await updateDoc(userDoc, {
        "Foto de perfil": downloadURL
      });

      setImageUrl(downloadURL);
      alert("¡Imagen actualizada con éxito!");
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Error al subir. Revisa las reglas de Storage en Firebase.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="loading">Cargando portafolio...</div>;

  return (
    <div className="portfolio-container">
      <header className="hero-section">
        <div className="glass-card">
          <div className="profile-container">
            {imageUrl ? (
              <img src={imageUrl} alt="Alejandro Ibujes" className="profile-img" />
            ) : (
              <div className="profile-placeholder">Sin Foto</div>
            )}
            
            {/* Input para subir imagen */}
            <div className="upload-btn-wrapper">
              <button className="btn-upload">{uploading ? 'Subiendo...' : 'Cambiar Foto'}</button>
              <input type="file" onChange={handleImageUpload} accept="image/*" disabled={uploading} />
            </div>
          </div>

          [cite_start]<h1>Hola, soy <span className="highlight">Alejandro Ibujes</span></h1> [cite: 1]
          [cite_start]<p className="subtitle">Estudiante de Ingeniería en Desarrollo de Software</p> [cite: 1]
          [cite_start]<p className="university">Universidad de las Américas (UDLA)</p> [cite: 24]
        </div>
      </header>

      <main className="content">
        <section className="section">
          <h2>Sobre mí</h2>
          [cite_start]<p>Líder de equipos multidisciplinares con ganas de aprender. [cite: 21]</p>
          [cite_start]<p>Ayudante de Cátedra en la carrera de Ingeniería en Software UDLA. [cite: 29]</p>
        </section>

        <div className="grid-section">
          <section className="card">
            <h3>Certificaciones</h3>
            <ul>
              [cite_start]<li>AWS Academy Graduate - Cloud Foundations [cite: 35]</li>
              [cite_start]<li>Cisco Certified Support Technician IT Support [cite: 33]</li>
              [cite_start]<li>Python Essentials 1 y 2 [cite: 36]</li>
            </ul>
          </section>

          <section className="card">
            <h3>Investigación</h3>
            [cite_start]<p><strong>Ponente en ETCM 2025:</strong> [cite: 37]</p>
            [cite_start]<p>"Risk-Aware Fleet Management in Public Enterprises" [cite: 38]</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Agujin;
