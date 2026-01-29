import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 1. Corregimos las rutas para que busquen dentro de la carpeta "screens"
// 2. Cambiamos 'isaac' por 'Isaac' (React exige mayúsculas)
import Home from "./screens/Home";
import Isaac from "./screens/Isaac"; 
import Mateo from "./screens/Mateo";
import Agujin from "./screens/Agujin";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Aquí usamos el componente con Mayúscula */}
        <Route path="/isaac" element={<Isaac />} /> 
        <Route path="/mateo" element={<Mateo />} /> 
        <Route path="/agujin" element={<Agujin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


