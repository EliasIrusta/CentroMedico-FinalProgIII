import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './modules/Home'
//import Students from './modules/Students'
import Layout from './modules/Layout'
//import NotFound from './modules/NotFound'
//import SWCharacters from './modules/SWCharacters'
//import CharacterDetail from './modules/CharacterDetail'
//import Contact from './modules/Contact'
//import About from './modules/About'
import ListarUsuarios from './modules/Usuarios/ListarUsuarios'
import EditarUsuario from './modules/Usuarios/EditarUsuario'
import CreateUser from './components/CreateUser'
import CreatePaciente from './components/CreatePaciente'
import ListarPacientes from './modules/Pacientes/ListarPacientes'
import editarPaciente from './modules/Pacientes/EditarPaciente'
import BuscarTurno from './modules/Turnos/Buscar'
import ModificarTurno from './modules/Turnos/Modificar'
import Turno from './modules/Turnos'



import { useState } from 'react'
import FormLogin from './modules/Login/Login'





function App() {
  const [user, setUser] = useState([])

  return (
    <div className="App">
      {/* { !user.length > 0 ? <FormLogin setUser={setUser}/>
    
    :   */}
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            {/* <Route path="students" element={<Students />} />
            <Route path="sw-characters">
              <Route index element={<SWCharacters />} />
              <Route path=":id" element={<CharacterDetail />} />
            </Route>
            <Route path="contact" element={<Contact />}>
              <Route path=":type" element={<Contact />} />
            </Route>
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} /> */}
            <Route path="usuarios">
              <Route index element={<ListarUsuarios />} />
              <Route path='list' element={<ListarUsuarios />} />
              <Route path='create' element={<CreateUser />} />
              <Route path='editar/:id' element={<EditarUsuario />} />
            </Route>
            <Route path="pacientes">
              <Route index element={<ListarPacientes />} />
              <Route path='list' element={<ListarPacientes />} />
              <Route path='create' element={<CreatePaciente />} />
              <Route path='editar/:id' element={<editarPaciente />} />
            </Route>
            <Route path="Turnos">
              <Route index element={<Turno />} />
              <Route path="Buscar" element={<BuscarTurno />} />
              <Route path="Modificar" element={<ModificarTurno />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    
    </div>
  )
}

export default App

