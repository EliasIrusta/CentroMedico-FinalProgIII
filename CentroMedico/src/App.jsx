import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import Home from './modules/Home'
import Layout from './modules/Layout'
import LayoutMedico from './modules/LayoutMedico'
import ListarUsuarios from './modules/Usuarios/ListarUsuarios'
import EditarUsuario from './modules/Usuarios/EditarUsuario'
import CreateUser from './components/CreateUser'

import ListarPacientes from './modules/Pacientes/ListarPacientes'
import EditarPaciente from './modules/Pacientes/EditarPaciente'
import BuscarTurno from './modules/Secretaria/Turnos/Buscar'
import ModificarTurno from './modules/Secretaria/Turnos/Modificar'
import Turnos from './modules/Secretaria/Turnos'
import { useState, useEffect } from 'react'
import Login from './modules/Login'
import Logout from './modules/Login/Logout'
import NotFound from './modules/NotFound'
import Historial from './modules/Medico/Historial'
import Informe from './modules/Medico/Informe'
import Agenda from './modules/Medico/Agenda'
import Cobros from './modules/Secretaria/Cobros'
import PaymentForm from './modules/Secretaria/Cobros/PaymentForm'



const Secretaria = () => {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="usuarios">
              <Route index element={<ListarUsuarios />} />
              <Route path='list' element={<ListarUsuarios />} />
              <Route path='create' element={<CreateUser />} />
              <Route path='editar/:id' element={<EditarUsuario />} />
            </Route>
            <Route path="medicos">
              <Route index element={<ListarUsuarios />} />

            </Route>
            <Route path="pacientes">
              <Route index element={<ListarPacientes />} />
              <Route path='list' element={<ListarPacientes />} />
              
              <Route path='editar/:id' element={<EditarPaciente />} />
            </Route>
            <Route path="Turnos">
              <Route index element={<Turnos />} />
              <Route path="Buscar" element={<BuscarTurno />} />
              <Route path="Modificar" element={<ModificarTurno />} />
            </Route>
            <Route path="Cobros" element={<Cobros />} /> 
            <Route path="Cobros/PaymentForm/:id" element={<PaymentForm />} />

          
            <Route path="Login/Logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )

}


const Medico = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route element={<LayoutMedico />}>
          <Route path="Medico/Agenda/" element={<Agenda />} />
          <Route path="Medico/Historial" element={<Historial />} />
          <Route path="Medico/Informe/:id" element={<Informe />} />
          <Route path="Login/Logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  //const MiContexto = React.createContext(null)
  const miRol = localStorage.getItem('rol')
  const miToken = localStorage.getItem('miToken')
  const miId = localStorage.getItem('miId')
  const [user, setUser] = useState({
    email: '',
    password: '',
    rol: miRol,
    token: miToken,
    _id: miId,
  })


  //const valorContexto = useContext(MiContexto);

  useEffect(() => {
    localStorage.setItem('miToken', user.token);
    localStorage.setItem('rol', user.rol);
    localStorage.setItem('miId', user._id);

    // Redirigir después de establecer el estado del usuario
    if (user.rol.name == 'admin') {
      window.location.href = "/pacientes/list";
    }

    if (user.rol.name == 'medico') {
      window.location.href = "/";
      console.log('idUSRIO', user._id)
    }
  }, [user]);

  return (
    <div className="App">
      {(user.rol === 'null' || user.rol === null) && (
        <Login setUser={setUser} />
      )}

      {user.rol == 'admin' && Secretaria()}

      {user.rol == 'medico' && <Medico miId={user._id} />}
      {console.log('idUSUAR', user._id)}

    </div>
  )
}

export default App

