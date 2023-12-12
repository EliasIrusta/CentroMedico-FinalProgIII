import { Button } from 'antd'
import { Link } from 'react-router-dom'

function Character2({nombres}) {
  //const id = url.split('/')[5]
  console.log("entro");
  console.log(nombres);
  return (
    
    <li>
      
      Noambre: {nombres.apellido}{' '}
      ROL: {nombres.rol}
      <Link to={`/sw-characters/${nombres.id}`}>
        <Button>Ver detalle</Button>
      </Link>
    </li>
  )
}

export default Character2
