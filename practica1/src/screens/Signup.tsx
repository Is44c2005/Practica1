import React, { useState } from 'react';
import './css/Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

          <button type="submit" className="btn-auth btn-register">
            Registrarse
          </button>
        </form>

        <div className="auth-footer">
          <p>¿Ya tienes cuenta? <span className="link-highlight">Inicia Sesión</span></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;