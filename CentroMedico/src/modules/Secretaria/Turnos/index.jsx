import { useState, useEffect } from 'react'
import {
  Form,
  Input,
  DatePicker,
  Button,
  Select,
  AutoComplete,
  Card,
} from 'antd'
import dayjs from 'dayjs'
import turnoService from '../../../services/turnoApi'
import pacienteService from '../../../services/pacientesApi'

const { Option } = Select

function Turnos() {
  const [responseText, setResponseText] = useState('')
  const [especialidades, setEspecialidades] = useState([])
  const [usuariosConEspecialidad, setUsuariosConEspecialidad] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [pacientes, setPacientes] = useState('')
  const [options, setOptions] = useState([])
  const [nombrePaciente, setNombrePaciente] = useState('')

  useEffect(() => {
    listarUsuarios()
  }, [])

  const listarUsuarios = async () => {
    try {
      const response = await pacienteService.getAllPacientes()
      setUsuarios(response)
      const especialidadesUnicas = [
        ...new Set(response.map((item) => item.especialidad)),
      ]
      setEspecialidades(especialidadesUnicas)
    } catch (error) {
      console.error('Error al obtener usuarios', error)
    }
  }
  useEffect(() => {
    listarPacientes()
  }, [])

  const listarPacientes = () => {
    const fetchData = async () => {
      const response = await pacienteService.getAllPacientes()
      console.log('trae', response)
      setPacientes(response)
    }
    fetchData()
  }

  const onSelectEspecialidad = (especialidad) => {
    console.log('Especialidad seleccionada:', especialidad)
    const usuariosFiltrados = usuarios.filter(
      (usuario) => usuario.especialidad === especialidad,
    )
    setUsuariosConEspecialidad(usuariosFiltrados)
    console.log('medico select', usuariosFiltrados)
  }

  const handleSearch = (value) => {
    if (pacientes && pacientes.length > 0) {
      const filteredData = pacientes.filter((item) => {
        const dniIncludesValue = item.dni && item.dni.includes(value)
        const hasBornDate = item.bornDate && item.bornDate !== ''
        return dniIncludesValue && hasBornDate
      })

      const opc = filteredData.map((a) => ({ value: a.dni }))
      console.log('opciones filtradas', opc)
      setOptions(opc)
    }
  }

  const onSelect = (data) => {
    const pacienteSeleccionado = pacientes.find(
      (elemento) => elemento.dni === data,
    )

    if (pacienteSeleccionado) {
      const nombrePaciente = `${pacienteSeleccionado.firstName.charAt(0).toUpperCase()}
      ${pacienteSeleccionado.firstName.slice(1).toLowerCase()} 
      ${pacienteSeleccionado.lastName.toUpperCase()}`

      console.log('nombre', nombrePaciente)
      setNombrePaciente(pacienteSeleccionado)
    }
  }

  const onFinish = (values) => {
    const fechaISO8601 = values.fechaTurno
    values.fechaTurno = dayjs(fechaISO8601).format('YYYY-MM-DD')
    values.horaTurno = dayjs(fechaISO8601).format('HH:mm')
    values.nombrePaciente = `${nombrePaciente.firstName} ${nombrePaciente.lastName}`
    values.descripcion
    values.medico_id
    values.estado = 'pendiente'
    values.paciente_id = `${nombrePaciente._id}`
    values.tratamiento = ' sin evaluar '

    const fetchData = async () => {
      const response = await turnoService.createTurno(values)
      setResponseText(`Respuesta del servidor: ${JSON.stringify(response)}`)
      if (response) {
        setResponseText('Turno cargado')
      }
    }
    fetchData()
  }

  return (
    <div>
      <h2>Cargar turno</h2>
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
        <Form.Item
          label="Busqueda por DNI"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 12 }}
        >
          <AutoComplete
            options={options}
            style={{ width: 100 }}
            onSelect={onSelect}
            onSearch={(text) => handleSearch(text)}
            placeholder="DNI cliente"
          />
        </Form.Item>
        <Form.Item
          name="nombrePaciente"
          label="Nombre y Apellido"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 12 }}
        >
          {' '}
          <span
            style={{
              border: '1px solid #d9d9d9',
              borderRadius: '5px',
              padding: '5px',
              textTransform: 'capitalize',
            }}
          >
            {nombrePaciente &&
              `${nombrePaciente.firstName} ${nombrePaciente.lastName}`}
          </span>
        </Form.Item>

        <Form.Item
          name="paciente_id"
          label="pacienteid"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 12 }}
          style={{ display: 'none' }}
        >
          {' '}
          <span
            style={{
              border: '1px solid #d9d9d9',
              borderRadius: '5px',
              padding: '5px',
              textTransform: 'capitalize',
            }}
          >
            {nombrePaciente && `${nombrePaciente._id}`}
          </span>
        </Form.Item>

        <Form.Item
          label="Servicio"
          name="especialidad"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 12 }}
        >
          <Select
            placeholder="Selecciona una especialidad"
            onSelect={onSelectEspecialidad}
          >
            {especialidades.map((especialidad) => (
              <Option key={especialidad} value={especialidad}>
                {especialidad}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {usuariosConEspecialidad.length > 0 && (
          <Form.Item
            label="Nomina de Medicos"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
            name="medico_id"
          >
            <Select style={{ textTransform: 'capitalize' }}>
              {usuariosConEspecialidad.map((usuario) => (
                <Option key={usuario._id} value={usuario._id}>
                  {`${usuario.firstName} ${usuario.lastName}`}
                  {console.log('medico marcado', usuario._id)}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          label="Fecha del turno"
          name="fechaTurno"
          rules={[
            {
              required: true,
              message: 'Por favor, selecciona la fecha del turno',
            },
          ]}
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 12 }}
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
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 12 }}
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
    </div>
  )
}

export default Turnos
