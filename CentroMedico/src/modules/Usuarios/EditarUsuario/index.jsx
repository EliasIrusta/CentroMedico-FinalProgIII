import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UpdateUser from '../../../components/UpdateUser'
import userService from '../../../services/userApi'

function editarUsuario() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await userService.getPersonById(id)
      console.log(response)
      setUserInfo(response)
      setIsLoading(false)
    }
    fetchData()
  }, [])
  return (
    <>
      <h1>Información del Usuario</h1>
      {isLoading ? (
        <Spin tip="Cargando info del usuario..." size="large">
          <div className="content" />
        </Spin>
      ) : (
        <div>
          <pre>{JSON.stringify(userInfo, null, 2)}</pre>
          <UpdateUser data={{ userInfo }} />
        </div>
      )}
    </>
  )
}

export default editarUsuario
