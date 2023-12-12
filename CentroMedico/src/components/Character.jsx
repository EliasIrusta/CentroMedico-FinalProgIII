import { Button } from 'antd'
import { Link } from 'react-router-dom'

function Character({nombre, apellido, rol}) {
  //const id = url.split('/')[5]
  console.log("entro");
  console.log(nombre);
  return (
    <li>
      Nombre: {apellido}{' '}
      ROL: {rol}
      <Link to={`/sw-characters/${nombre}`}>
        <Button>Ver detalle</Button>
      </Link>
    </li>
  )
}

export default Character
