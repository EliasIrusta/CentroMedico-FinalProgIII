import { useState, useEffect } from 'react'
import { Form, Input, DatePicker, Button, AutoComplete, Select } from 'antd'
import dayjs from 'dayjs'
import turnoService from '../../services/turnoApi'
import pacienteService from '../../services/pacientesApi'
import { Outlet } from 'react-router-dom'
//import mascotaService from '../../../services/mascotaApi'

const { Option } = Select

function Turnos() {
  const [responseText, setResponseText] = useState('')
  const [pacientes, setPacientes] = useState('')
  const [options, setOptions] = useState([])
  const [options2, setOptions2] = useState([])
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('')
  //const [mascotas, setMascotas] = useState([])

  const opciones = {
    opcion1: 'Opción 1',
    opcion2: 'Opción 2',
    opcion3: 'Opción 3',
  }


  useEffect(() => {
    listarPacientes()
  }, [])
  //----------------------------- FUNCION -----------------------------------
  const listarPacientes = () => {
    const fetchData = async () => {
      const response = await pacienteService.getAllPacientes()
      setPacientes(response)
      
    }
    fetchData()
  }

  //------------------- FUNCION -----------------------------------
  const handleSearch = (value) => {
    const filteredData = pacientes.filter((item) => item.dni.includes(value))
    const opc = filteredData.map((a) => ({ value: a.dni }))
    const opc2 = filteredData.map((a) => ({ value: a.name }))
    setOptions(opc)
    setOptions2(opc2)
  }


  const onSelect = (data) => {
    const pacienteSeleccionado = pacientes.filter(function (elemento) {
      return elemento.dni === data
    })

  
    const paciente = pacienteSeleccionado[0].name

  }
  //----------------------------- FUNCION -----------------------------------
  const onFinish = (values) => {
    values.estado = 'pendiente'
    const fechaISO8601 = values.fechaTurno
    values.fechaTurno = dayjs(fechaISO8601).format('YYYY-MM-DD')
    values.horaTurno = dayjs(fechaISO8601).format('HH:mm')
    values.nombrePaciente = data.name
    console.log(values)

    const fetchData = async () => {
      const response = await turnoService.createTurno(values)
      console.log('Respuesta del server', response)
      //setResponseText(`Respuesta del servidor: ${JSON.stringify(response)}`)
      if (response) {
        setResponseText('Turno cargado')
      }
    }
    fetchData()
  }

  return (
    <div>
      <h2>Cargar turno nuevo</h2>
      <Form
        name="nuevoTurnoForm"
        onFinish={onFinish}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
      >
        <AutoComplete
          options={options}
          style={{ width: 100 }}
          onSelect={onSelect}
          onSearch={(text) => handleSearch(text)}
          placeholder="DNI paciente"
        />


    
        <Form.Item
          label="Fecha del turno"
          name="fechaTurno"
          rules={[
            {
              required: true,
              message: 'Por favor, selecciona la fecha del turno',
            },
          ]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>

      

        <Form.Item
          label="Descripción"
          name="descripcion"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Cargar Turno
          </Button>
        </Form.Item>
      </Form>

      {responseText && <div>{responseText}</div>}
      <Outlet />
    </div>
  )
}

export default Turnos
