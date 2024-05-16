import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Checkbox, Form, Input, Button, message } from 'antd'
import pacienteService from '../../../services/pacientesApi'
import turnoService from '../../../services/turnoApi'

const { TextArea } = Input
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const Informe = () => {
  const [componentDisabled, setComponentDisabled] = useState(true)
  const [pacienteData, setPacienteData] = useState({})
  const [turnoData, setTurnoData] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const turno = await turnoService.getTurnoById(id)
        setTurnoData(turno)

        if (turno.paciente_id) {
          const paciente = await pacienteService.getPacienteById(
            turno.paciente_id,
          )
          setPacienteData(paciente)
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    fetchData()
  }, [id])

  const onFinish = async (values) => {
    try {
      const data = {
        tratamiento: values.tratamiento,
        estado: 'completado',
      }
      await turnoService.editarTurno(id, data)
      message.success('¡Informe actualizado correctamente!')
      window.location.href = '/Medico/Historial'
    } catch (error) {
      console.error('Error al actualizar el informe:', error)
      message.error('¡Error al actualizar el informe!')
    }
  }
  function obtenerActualYear() {
    const fechaActual = new Date()
    const ActualYear = fechaActual.getFullYear()
    return ActualYear
  }
  const ActualYear = obtenerActualYear()
  const fechaNacimiento = new Date(pacienteData.bornDate)
  const year = fechaNacimiento.getFullYear()
  const mes = fechaNacimiento.getMonth() + 1
  const dia = fechaNacimiento.getDate()
  const fechaFormateada = `${year}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`
  const edad = ActualYear - year

  return (
    <div>
      <div style={{ padding: '20px', width: 900 }}>
        <div style={{ display: 'flex' }}>
          <Card
            title="Información del Paciente"
            bordered={false}
            style={{ width: 300 }}
          >
            <p>
              <strong>Nombre:</strong> {pacienteData.firstName}{' '}
              {pacienteData.lastName}
            </p>
            <p>
              <strong>DNI:</strong> {pacienteData.dni}
            </p>
            <p>
              <strong>Fecha Nac:</strong> {fechaFormateada}
            </p>
            <p>
              <strong>Edad:</strong> {edad}
            </p>
          </Card>
          <Card
            title="Información del Turno"
            bordered={false}
            style={{ width: 300, marginLeft: '20px' }}
          >
            <p>
              <strong>Fecha del Turno:</strong> {turnoData.fechaTurno}
            </p>
            <p>
              <strong>Hora del Turno:</strong> {turnoData.horaTurno}
            </p>
            <p>
              <strong>Descripción:</strong> {turnoData.descripcion}
            </p>
            <p>
              <strong>Estado:</strong> {turnoData.estado}
            </p>
          </Card>
        </div>
        <div>
          <p></p>
          <p></p>
          <Checkbox
            checked={componentDisabled}
            onChange={(e) => setComponentDisabled(e.target.checked)}
          >
            <strong>Iniciar Informe</strong>
          </Checkbox>
          <Form
            align="center"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="vertical"
            name="disabled"
            disabled={componentDisabled}
            valuePropName="unchecked"
            onFinish={onFinish}
            style={{ maxWidth: 1100, marginTop: '20px' }}
          >
            <Form.Item label="Tratamiento" name="tratamiento">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Terminar Informe
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Informe
