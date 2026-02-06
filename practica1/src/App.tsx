import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 1. Corregimos las rutas para que busquen dentro de la carpeta "screens"
// 2. Cambiamos 'isaac' por 'Isaac' (React exige mayúsculas)
import Home from "./screens/Home";
import Isaac from "./screens/Isaac"; 
import Mateo from "./screens/Mateo";
import Agujin from "./screens/Agujin";
import Login from './screens/Login';
import Signup from './screens/Signup';


function App() {
  return (
    <BrowserRouter>
      <Routes>  
        <Route path="/" element={<Login />} />
        {/* Aquí usamos el componente con Mayúscula */}
        <Route path="/isaac" element={<Isaac />} /> 
        <Route path="/mateo" element={<Mateo />} /> 
        <Route path="/agujin" element={<Agujin />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


