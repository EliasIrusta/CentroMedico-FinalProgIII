
import userService from '../../services/userApi'
import React, { useState, useEffect } from 'react';


function Home() {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const id = localStorage.getItem('miId')
    console.log('id logueado', id)
    const fetchData = async () => {
      const response = await userService.getPersonById(id)
      setUserName(response.firstName + ' ' + response.lastName)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>CENTRO MÉDICO</h1>
      <div> <h2>Bienvendio: {userName}</h2> </div>
    </div>
  )
}

export default Home

