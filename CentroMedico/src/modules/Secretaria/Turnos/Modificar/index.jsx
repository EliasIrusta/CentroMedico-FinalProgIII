import { useState, useEffect } from 'react'
import turnoService from '../../../../services/turnoApi'
import {
  message,
  Space,
  Table,
  Modal,
  TimePicker,
  DatePicker,
  Select,
  Button,
} from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import pacienteService from '../../../../services/pacientesApi'

function ModificarTurno() {
  const [turnos, setTurnos] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hora, setHora] = useState('')
  const [fecha, setFecha] = useState('')
  const [id, setId] = useState('')
  const [estado, setEstado] = useState('pendiente')

  const columns = [
    {
      title: 'Nombre',
      key: 'nombrePaciente',
      dataIndex: 'nombrePaciente',
    },

    {
      title: 'Fecha',
      dataIndex: 'fechaTurno',
      key: 'fechaTurno',
    },
    {
      title: 'Hora',
      dataIndex: 'horaTurno',
      key: 'horaTurno',
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
      title: 'Estado',
      key: 'estado',
      render: (_, record) => (
        <Space>
          <Select
            defaultValue={record.estado}
            onChange={(value) => setEstado(value)}
          >
            <Option value="pendiente">Pendiente</Option>
            <Option value="completado">Completado</Option>
            <Option value="cancelado">Cancelado</Option>
            <Option value="pagado">Pagado</Option>
          </Select>
          <Button
            onClick={() => handleChangeEstado(record._id)}
            type="primary"
            icon={<CheckOutlined />}
          />
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <button
            danger
            onClick={() => showModal(record._id)}
            style={{ color: 'grey', cursor: 'pointer' }}
          >
            Editar Fecha
          </button>
          <button
            onClick={() => borrar(record._id)}
            style={{ color: 'red', cursor: 'pointer' }}
          >
            Borrar Turno
          </button>
        </Space>
      ),
    },
  ]

  const showModal = (id) => {
    setId(id)
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
    editar(id, fecha, hora)
    setRefresh(true)
    message.success('¡Turno actualizado correctamente!')
  }

  const handleCancel = () => {
    setIsModalOpen(false)
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
                medico: { nombre: medico.firstName, apellido: medico.lastName },
              }
            }
          }
          return turno
        }),
      )
      setTurnos(turnosConMedico.filter((turno) => turno)) // Eliminar turnos que no tienen médico
    } catch (error) {
      console.error('Error al obtener los turnos:', error)
    }
  }

  const editar = (id, fecha, hora) => {
    const data = {
      fechaTurno: fecha,
      horaTurno: hora,
    }
    console.log(data)
    const fetchData = async () => {
      const response = await turnoService.editarTurno(id, data)
      console.log('Respuesta del server', response)
    }
    fetchData()
  }

  const editarEstado = (id, estado) => {
    const data = {
      estado: estado,
    }
    console.log(data)

    const fetchData = async () => {
      const response = await turnoService.editarTurno(id, data)
      console.log('Respuesta del server', response)
    }
    fetchData()
  }

  const handleChangeEstado = async (id) => {
    try {
      console.log(`Turno ID: ${id}, Nuevo estado: ${estado}`)
      await editarEstado(id, estado)
      setRefresh(!refresh)
      message.success('¡Estado del turno actualizado correctamente!')
    } catch (error) {
      console.error('Error al cambiar el estado del turno:', error)
      message.error('¡Error al cambiar el estado del turno!')
    }
  }

  const borrar = (id) => {
    const fetchData = async () => {
      const response = await turnoService.borraTurno(id)
      console.log('Respuesta del server', response)
      setRefresh(true)
    }
    fetchData()
  }

  const fechaChange = (date, dateString) => {
    setFecha(dateString)
  }

  const horaChange = (date, dateString) => {
    setHora(dateString)
  }

  return (
    <div>
      <h2>Editar borrar turnos</h2>

      <Table
        columns={columns}
        dataSource={turnos}
        style={{ textTransform: 'capitalize' }}
      />

      <>
        <Modal
          title="Editar Turno"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Fecha</p>
          <DatePicker showTime format="YYYY-MM-DD" onChange={fechaChange} />

          <p>Hora</p>
          <TimePicker showTime format="HH:mm" onChange={horaChange} />
        </Modal>
      </>
    </div>
  )
}
export default ModificarTurno
