import { useState } from 'react';
import './css/Auth.css'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";



const Login = () => {

  const navigate = useNavigate();

  // Estados solo para que los inputs funcionen visualmente
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/home"); //Si el login es correcto va a la pantalla de home
  } catch (error: any) {
    alert("Correo o contraseña incorrectos");
  }
};

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

          <button type="button" className="btn-auth" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </form>

        <div className="auth-footer">
          <p>¿No tienes cuenta? <span className="link-highlight">
            <Link to="/signup">Regístrate aquí</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;