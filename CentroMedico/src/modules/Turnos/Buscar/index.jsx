import { Table, Button, DatePicker } from 'antd'
import { useState, useEffect } from 'react'
import turnoService from '../../../services/turnoApi'

const columns = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'Fecha del Turno',
    dataIndex: 'fechaTurno',
    key: 'fechaTurno',
  },
  {
    title: 'Hora',
    dataIndex: 'horaTurno',
    key: 'horaTurno',
  },
  {
    title: 'Nombre del Paciente',
    dataIndex: 'nombrePaciente',
    key: 'nombrePaciente',
  },
  {
    title: 'Descripción',
    dataIndex: 'descripcion',
    key: 'descripcion',
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    key: 'estado',
  },
]

function BuscarTurno() {
  const [turnos, setTurnos] = useState([''])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    onClick()
    setRefresh(false)
    const tokenUsuario = localStorage.getItem('miToken')
    console.log(tokenUsuario)
    //console.log(turnos)
  }, [refresh])

  const onClick = () => {
    const fetchData = async () => {
      const response = await turnoService.getAllTurnos()
      console.log(response)
      setTurnos(response)
    }
    fetchData()
  }

  const handleFechaChange = (date, dateString) => {
    //setFechaSeleccionada(dateString);
    console.log(dateString)

    const fetchData = async () => {
      const fecha = { fechaTurno: dateString }
      const response = await turnoService.buscarTurnoPorFecha(fecha)
      //console.log(response)
      setTurnos(response)
    }
    fetchData()
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2>Buscar por fecha -- </h2>
        <DatePicker format="YYYY-MM-DD" onChange={handleFechaChange} />
        <Button type="primary" onClick={() => onClick()}>
          Traer todos
        </Button>
        
      </div>

      <Table
        dataSource={turnos}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        bordered
      />
    </div>
  )
}

export default BuscarTurno
