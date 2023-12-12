import { Button } from 'antd'
import { Link } from 'react-router-dom'
import swService from '../services/swapi'


function Character({data}) {
  //const id = url.split('/')[5]
  console.log("entro");
  console.log(data);
  return (
    <li>
      Nombre: {data.apellido}{' '}
      ROL: {data.rol}
      <Link to={`/usuarios/editar/${data.id}`}>
        <Button>Editar</Button>
      </Link>
      <Link to="/usuarios/list" onClick={()=>swService.deleteUser(data.id).then(() => {
            // Eliminación exitosa, recargar la página
            window.location.reload();
        })}>
        <Button >Borrar</Button>
    </Link>
    </li>
  )
}

export default Character