import React, { useState } from 'react';
import './css/Auth.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";



const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Guardamos datos extra en Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: formData.nombre,
        email: formData.email,
        creadoEn: new Date()
      });
      alert("Cuenta creada correctamente. Inicia sesión.");
      navigate("/"); // Después de crear una cuenta manda a iniciar sesión al login
    } catch (error: any) {
      alert(error.message);
    }
  };

  

  return (
    <div className="auth-container">
      <div className="auth-glass-card">
        <div className="auth-header">
          <h2>Crear Cuenta</h2>
          <p>Únete a la plataforma de gestión</p>
        </div>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>Nombre Completo</label>
            <input 
              type="text" 
              name="nombre"
              placeholder="Flavio Ibujes" 
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              name="email"
              placeholder="tu@email.com" 
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              name="password"
              placeholder="Crea una contraseña segura" 
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Confirmar Contraseña</label>
            <input 
              type="password" 
              name="confirmPassword"
              placeholder="Repite tu contraseña" 
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="button" className="btn-auth btn-register" onClick={handleSignup}>
            Registrarse
          </button>
        </form>

        <div className="auth-footer">
          <p>¿Ya tienes cuenta? <span className="link-highlight"><Link to="/">Inicia Sesión</Link></span></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
