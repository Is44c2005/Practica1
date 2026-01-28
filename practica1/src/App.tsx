import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 1. Corregimos las rutas para que busquen dentro de la carpeta "screens"
// 2. Cambiamos 'isaac' por 'Isaac' (React exige mayúsculas)
import Home from "./screens/Home";
import Isaac from "./screens/isaac"; 
import Mateo from "./screens/Mateo";
import Agujin from "./screens/Agujin";


function App() {
  return (
<<<<<<< HEAD
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


=======
    <div className='Main'>
      <h1>Hola mundo</h1> 

      <button className='Isaac'>
        Pagina Isaac
      </button>

      <button className='Mateo'>
        Pagina Mateo
      </button>

      <button className='Agujin'>
        Pagina Agujin
      </button>
    </div> 
  )
}

export default App
>>>>>>> 9bc4954bc25a519c1a41884faf2058218f31a2b2
