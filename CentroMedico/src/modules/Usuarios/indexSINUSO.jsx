import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import swService from '../../services/swapi'
import ListUsers from '../../components/ListUsers'
import CreateUser from '../../components/CreateUser'


//function Usuarios() {
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
      <h1>Listado de personajes de Star Wars</h1>
      {isLoading ? (
        <Spin tip="Cargando listado..." size="large">
          <div className="content" />
        </Spin>
      ) : ( 
          usuarios.map((x) =><ListUsers User={x.firstName}/>) 

)}
  <CreateUser />
    </>
  )


//export default Usuarios
