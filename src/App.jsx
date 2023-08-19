import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/commons/Sidebar";
import { Cliente, Gimnasio, Home, Membresia, Notificacion } from "./components/pages";

export const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sidebar/>}>
          <Route path="/cliente" element={<Cliente/>}/>
          <Route path="/gimnasio" element={<Gimnasio/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/membresia" element={<Membresia/>}/>
          <Route path="/notificacion" element={<Notificacion/>}/>
        </Route>
      </Routes>
    </div>
  );
};
