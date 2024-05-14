

import { Spin } from 'antd'
import swService from '../../../services/swapi'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UpdateUser from '../../../components/UpdateUser'


function editarPaciente() {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const response = await swService.getPersonById(id)
            console.log(response)
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
                   {/* <pre>{JSON.stringify(userInfo, null, 2)}</pre> */}
                    <UpdateUser data={{userInfo}} />
                </div>
            )}
        </>
    )
}

export default editarPaciente;