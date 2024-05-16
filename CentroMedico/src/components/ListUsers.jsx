import { Button, Modal } from 'antd'
import { Link } from 'react-router-dom'
import userService from '../services/userApi'

function Character({ data, onDelete }) {
  const handleDelete = () => {
    Modal.confirm({
      title: 'Confirmar eliminación',
      content: `¿Estás seguro de eliminar a ${data.apellido}?`,
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        userService.deleteUser(data.id).then(() => {
          onDelete(data.id)
        })
      },
    })
  }

  return (
    <tr>
      <td>
        <Link to={`/pacientes/editar/${data.id}`}>
          <Button>Editar Datos</Button>
        </Link>
        <Button danger onClick={handleDelete}>
          Borrar Paciente
        </Button>
      </td>
    </tr>
  )
}

export default Character
