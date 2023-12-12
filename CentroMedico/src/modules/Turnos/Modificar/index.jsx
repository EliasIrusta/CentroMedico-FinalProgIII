import { useState, useEffect } from 'react'
//import { Button } from 'antd'
import turnoService from '../../../services/turnoApi'
import { Space, Table, Modal, TimePicker, DatePicker, /* Select */ } from 'antd'

function ModificarTurno() {
  const [turnos, setTurnos] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hora, setHora] = useState('')
  const [fecha, setFecha] = useState('')
  const [id, setId] = useState('')

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
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
      title: 'Nombre',
      key: 'nombrePaciente',
      dataIndex: 'nombrePaciente',
    },
    {
      title: 'Estado',
      key: 'estado',
      dataIndex: 'estado',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
  {/*         <a onClick={() => showModal(record._id)} style={{ color: 'green' }} > Editar </a> */}
          <button onClick={() => showModal(record._id)} style={{ color: 'green', cursor: 'pointer' }}>Editar</button>
          <button onClick={() => borrar(record._id)} style={{ color: 'red', cursor: 'pointer' }}>Borrar</button>

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
    editar(id,fecha,hora)
    setRefresh(true)


  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    traerTurnos()
    setRefresh(false)
    //console.log(turnos)
  }, [refresh])

  const traerTurnos = () => {
    const fetchData = async () => {
      const response = await turnoService.getAllTurnos()
      console.log(response)
      setTurnos(response)
    }
    fetchData()
  }

  const editar = (id,fecha, hora) => {
    const data = {
      fechaTurno: fecha,
      horaTurno: hora
    }

console.log(data)

    const fetchData = async () => {
      const response = await turnoService.editarTurno(id,data)
      console.log('Respuesta del server', response)
    }
    fetchData()
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
    console.log('Hola',dateString);
  }

  const horaChange = (date, dateString) => {
    console.log('Hola',dateString);
    setHora(dateString)
    console.log(dateString);
  }

  return (
    <div>
      <h2>Editar borrar turnos</h2>

      <Table columns={columns} dataSource={turnos} />

      <>

        <Modal
          title="Editar Turno"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Fecha</p>
          <DatePicker showTime format="YYYY-MM-DD" 
          onChange={fechaChange}/>


          <p>Hora</p>
          <TimePicker showTime format="HH:mm" 
          onChange={horaChange}
          />

{/*           <p>Estado</p>
          <Select
            defaultValue="pendiente"
            onChange={estadoChange}
            style={{ width: 120 }}
            options={[
              { value: 'pendiente', label: 'pendiente' },
              { value: 'terminado', label: 'terminado' },
            ]}
          /> */}
        </Modal>
      </>
    </div>
  )
}
export default ModificarTurno
