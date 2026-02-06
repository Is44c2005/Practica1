import React, { useState } from 'react';
import './css/Auth.css'; // Usaremos un CSS compartido para ambos

const Login = () => {
  // Estados solo para que los inputs funcionen visualmente
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="auth-container">
      <div className="auth-glass-card">
        <div className="auth-header">
          <h2>Bienvenido de nuevo</h2>
          <p>Ingresa tus credenciales para acceder al sistema</p>
        </div>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>Correo </label>
            <input 
              type="email" 
              placeholder="isacnegrito@gmail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="btn-auth">
            Iniciar Sesión
          </button>
        </form>

        <div className="auth-footer">
          <p>¿No tienes cuenta? <span className="link-highlight">Regístrate aquí</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;