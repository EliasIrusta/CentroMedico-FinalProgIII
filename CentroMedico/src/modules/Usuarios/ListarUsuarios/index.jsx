import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import swService from '../../../services/swapi'
import ListUsers from '../../../components/ListUsers'


function ListarUsuarios() {
  const [isLoading, setIsLoading] = useState(false)
  const [usuarios, setUsuarios] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await swService.getPeople()
      console.log(response)
      setUsuarios(response)
      setIsLoading(false)
    }
    fetchData()
    console.log(JSON.stringify(usuarios))
  }, [])
  return (
    <>
      <h1>Listado de USUARIOS</h1>
      {isLoading ? (
        <Spin tip="Cargando listado..." size="large">
          <div className="content" />
        </Spin>
      ) : ( 
        usuarios
        .filter((x) => x.role.name === 'medico') // Filtra solo los usuarios con rol 'medico'
        .map((x) => (
          <ListUsers data={{ NOMBRE: x.firstName, apellido: x.lastName, rol: x.role.name, id: x._id }} />
        ))
    )}
    </>
  )
}

export default ListarUsuarios
