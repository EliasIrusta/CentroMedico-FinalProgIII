import { Table, Button, DatePicker } from 'antd'
import { useState, useEffect } from 'react'
import turnoService from '../../../../services/turnoApi'
import pacienteService from '../../../../services/pacientesApi'

const columns = [
  {
    title: 'Nombre del Paciente',
    dataIndex: 'nombrePaciente',
    key: 'nombrePaciente',
  },

  {
    title: 'Médico',
    key: 'medico',
    render: (_, record) => (
      <span>
        {record.medico
          ? `${record.medico.nombre} ${record.medico.apellido}`
          : 'Sin médico asignado'}
      </span>
    ),
  },

  {
    title: 'Especialidad',
    key: 'especialidad',
    render: (_, record) => (
      <span>
        {record.medico
          ? `${record.medico.especialidad}`
          : 'Sin médico asignado'}
      </span>
    ),
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
  }, [refresh])

  const onClick = () => {
    const fetchData = async () => {
      const response = await turnoService.getAllTurnos()
      setTurnos(response)
    }
    fetchData()
  }

  const handleFechaChange = (date, dateString) => {
    console.log(dateString)

    const fetchData = async () => {
      const fecha = { fechaTurno: dateString }
      const response = await turnoService.buscarTurnoPorFecha(fecha)

      setTurnos(response)
    }
    fetchData()
  }

  useEffect(() => {
    traerTurnos()
    setRefresh(false)
  }, [refresh])
  const traerTurnos = async () => {
    try {
      const response = await turnoService.getAllTurnos()
      const turnosConMedico = await Promise.all(
        response.map(async (turno) => {
          if (turno.medico_id) {
            const pacientes = await pacienteService.getAllPacientes()
            const medico = pacientes.find(
              (paciente) => paciente._id === turno.medico_id,
            )
            if (medico) {
              return {
                ...turno,
                medico: {
                  nombre: medico.firstName,
                  apellido: medico.lastName,
                  especialidad: medico.especialidad,
                },
              }
            }
          }
          return turno
        }),
      )
      setTurnos(turnosConMedico.filter((turno) => turno))
    } catch (error) {
      console.error('Error al obtener los turnos:', error)
    }
  }
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          textTransform: 'capitalize',
        }}
      >
        <h2>Filtro Fecha: </h2>
        <DatePicker format="DD-MM-YYYY" onChange={handleFechaChange} />
        <Button type="primary" onClick={() => onClick()}>
          Traer todos los turnos
        </Button>
      </div>

      <h2>TURNOS</h2>
      <Table
        dataSource={turnos}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        bordered
        style={{ textTransform: 'capitalize' }}
      />
    </div>
  )
}

export default BuscarTurno
