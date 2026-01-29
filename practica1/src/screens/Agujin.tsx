import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import './css/Agujin.css';

const Agujin = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Usamos el ID de documento exacto de tu base de datos
        const docRef = doc(db, "Agujin", "BGQGB3SafoTzzLZrry9U");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const driveLink = data["Foto de perfil"];
          
          if (driveLink && driveLink.includes('drive.google.com')) {
            // Extracción del ID del archivo para generar un link de visualización directa
            const fileId = driveLink.split('/d/')[1].split('/')[0];
            const directLink = `https://lh3.googleusercontent.com/d/${fileId}`;
            setImageUrl(directLink);
          }
        }
      } catch (error) {
        console.error("Error cargando perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="loading">Cargando portafolio...</div>;

  return (
    <div className="portfolio-container">
      <header className="hero-section">
        <div className="glass-card">
          {imageUrl && (
            <img src={imageUrl} alt="Alejandro Ibujes" className="profile-img" />
          )}
          <h1>Hola, soy <span className="highlight">Alejandro Ibujes</span> [cite: 1]</h1>
          <p className="subtitle">Estudiante de Ingeniería en Desarrollo de Software [cite: 1]</p>
          <p className="university">Universidad de las Américas (UDLA) [cite: 24, 29]</p>
        </div>
      </header>

      <main className="content">
        <section className="section">
          <h2>Sobre mí</h2>
          <p>Me defino por ser una persona con ganas de aprender y un gran líder de equipos multidisciplinares. [cite: 21]</p>
        </section>

        <div className="grid-section">
          <section className="card">
            <h3>Certificaciones</h3>
            <ul>
              <li>AWS Academy Graduate - Cloud Foundations [cite: 35]</li>
              <li>Cisco Certified Support Technician IT Support [cite: 33]</li>
              <li>Python Essentials 1 y 2 [cite: 36]</li>
            </ul>
          </section>

          <section className="card">
            <h3>Investigación IEEE</h3>
            <p><strong>Ponente en ETCM 2025:</strong> [cite: 37]</p>
            <p>"Risk-Aware Fleet Management in Public Enterprises: A Machine Learning Approach" [cite: 37, 38]</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Agujin;