import { useEffect, useState } from 'react'
import { Spin, Table } from 'antd'
import pacienteService from '../../../services/pacientesApi'
import Character from '../../../components/ListUsers'

function ListarPacientes() {
  const [isLoading, setIsLoading] = useState(false)
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await pacienteService.getAllPacientes()

      setUsuarios(response)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const handleDelete = (id) => {
    setUsuarios(usuarios.filter((user) => user.id !== id))
    window.location.reload()
  }

  const columns = [
    {
      title: 'Apellido',
      dataIndex: 'apellido',
      key: 'apellido',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Dni',
      dataIndex: 'dni',
      key: 'dni',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <Character data={record} onDelete={handleDelete} />
      ),
    },
  ]

  return (
    <>
      <h1>Listado de Pacientes</h1>
      {isLoading ? (
        <Spin tip="Cargando listado..." size="large">
          <div className="content" />
        </Spin>
      ) : (
        <Table
          columns={columns}
          dataSource={usuarios
            .filter((x) => x.role.name === 'paciente')
            .map((x) => ({
              key: x._id,
              nombre: x.firstName,
              apellido: x.lastName,
              dni: x.dni,

              id: x._id,
            }))}
        />
      )}
    </>
  )
}

export default ListarPacientes
