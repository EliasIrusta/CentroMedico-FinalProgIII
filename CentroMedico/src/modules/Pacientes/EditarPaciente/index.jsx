import { Spin } from 'antd'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UpdateUser from '../../../components/UpdateUser'
import userService from '../../../services/userApi'

function editarPaciente() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await userService.getPersonById(id)
      setUserInfo(response)
      setIsLoading(false)
    }
    fetchData()
  }, [])
  return (
    <>
      <h1>Información del Paciente</h1>
      {isLoading ? (
        <Spin tip="Cargando info del usuario..." size="large">
          <div className="content" />
        </Spin>
      ) : (
        <div>
          <UpdateUser data={{ userInfo }} />
        </div>
      )}
    </>
  )
}

export default editarPaciente
