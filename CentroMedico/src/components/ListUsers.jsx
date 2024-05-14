import { Button, Modal } from 'antd'
import { Link } from 'react-router-dom'
import userService from '../services/userApi';

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
          // Eliminación exitosa, ejecutar la función onDelete
          onDelete(data.id);
        });
      },
    });
  };

  return (
    <tr>
      
      <td>
        <Link to={`/pacientes/editar/${data.id}`}>
          <Button>Editar</Button>
        </Link>
        <Button onClick={handleDelete} type="danger">
          Borrar
        </Button>
      </td>
    </tr>
  );
}

export default Character;
