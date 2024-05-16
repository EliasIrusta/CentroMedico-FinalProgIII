import { Table, Button, DatePicker, Modal, message } from 'antd'
import { useState, useEffect } from 'react'
import turnoService from '../../../services/turnoApi'
import pacienteService from '../../../services/pacientesApi'
import { Link } from 'react-router-dom'

const columns = (handleIniciarCobro) => [
  {
    title: 'Nombre del Paciente',
    dataIndex: 'nombrePaciente',
    key: 'nombrePaciente',
  },
  {
    title: 'Hora',
    dataIndex: 'horaTurno',
    key: 'horaTurno',
  },
  {
    title: 'Fecha del Turno',
    dataIndex: 'fechaTurno',
    key: 'fechaTurno',
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    key: 'estado',
  },
  {
    title: 'Acciones',
    key: 'acciones',
    render: (_, record) => (
      <span>
        <Button type="primary" onClick={() => handleIniciarCobro(record)}>
          Iniciar Cobro
        </Button>
      </span>
    ),
  },
]

function Cobros() {
  const [turnos, setTurnos] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [visible, setVisible] = useState(false)
  const [selectedTurno, setSelectedTurno] = useState(null)

  useEffect(() => {
    onClick()
    setRefresh(false)
    const tokenUsuario = localStorage.getItem('miToken')
    const idUsuario = localStorage.getItem('miId')
  }, [refresh])

  const onClick = () => {
    const fetchData = async () => {
      const response = await turnoService.getAllTurnos()
      setTurnos(response)
    }
    fetchData()
  }

  const handleFechaChange = (date, dateString) => {
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

  const handleIniciarCobro = (record) => {
    setSelectedTurno(record)
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
    setSelectedTurno(null)
  }

  const handlePagoEfectivo = async () => {
    try {
      const data = { estado: 'pagado' }
      await turnoService.editarTurno(selectedTurno._id, data)
      message.success('¡Pago realizado con éxito!')
      setVisible(false)
      setRefresh(true)
    } catch (error) {
      console.error('Error al realizar el pago:', error)
      message.error('¡Error al realizar el pago!')
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
      ></div>
      <h2>Cobros</h2>
      <DatePicker onChange={handleFechaChange} style={{ marginBottom: 20 }} />
      <Table
        dataSource={turnos.filter((x) => x.estado === 'completado')}
        columns={columns(handleIniciarCobro)}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        bordered
        style={{ textTransform: 'capitalize' }}
      />
      <Modal
        title="Seleccionar Método de Pago"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="efectivo" type="primary" onClick={handlePagoEfectivo}>
            Efectivo
          </Button>,
          <Link to={`PaymentForm/${selectedTurno?._id}`} key="tarjeta">
            <Button type="primary">Tarjeta de Crédito</Button>
          </Link>,
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <p>Seleccione el método de pago:</p>
      </Modal>
    </div>
  )
}

export default Cobros
