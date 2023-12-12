import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import swService from '../../services/swapi'
import Character from '../../components/Character'
import Character2 from '../../components/Character2'

function SWCharacters() {
  const [isLoading, setIsLoading] = useState(false)
  const [characters, setCharacters] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await swService.getPeople()
      //console.log(response)
      setCharacters(response)
      setIsLoading(false)
    }
    fetchData()
    console.log(JSON.stringify(characters))
  }, [])
  return (
    <>
      <h1>Listado de personajes de Star Wars</h1>
      {isLoading ? (
        <Spin tip="Cargando listado..." size="large">
          <div className="content" />
        </Spin>
      ) : (
//        characters.map((x) =><Character nombre={x.firstName} apellido={x.lastName} rol={"admin"}/>) 
          characters.map((x) =><Character2 nombres={{nombre: x.firstName, apellido:x.lastName, rol:"admin", id:x._id}}/>) 

)}
    </>
  )
}

export default SWCharacters
