import React, { useState, useEffect } from 'react'
import { message, Form, Input, Button, Card, Typography, Layout } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import pacienteService from '../../../../services/pacientesApi'
import turnoService from '../../../../services/turnoApi'
import './PaymentForm.css'

const { Title } = Typography
const { Content } = Layout

const PaymentForm = () => {
  const [pacienteData, setPacienteData] = useState({})
  const [turnoData, setTurnoData] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()
  const [state, setState] = useState({
    number: '',
    name: '',
    cvc: '',
    expiry: '',
    focus: '',
  })

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

  const handleFocus = (e) => {
    setState({
      ...state,
      focus: e.target.name,
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value,
    })
  }

  const onFinish = async () => {
    try {
      const data = { estado: 'pagado' }
      await turnoService.editarTurno(id, data)
      message.success('¡Pago realizado correctamente!')
      navigate('/Cobros')
    } catch (error) {
      console.error('Error al realizar el pago:', error)
      message.error('¡Error al realizar el pago!')
    }
  }

  return (
    <Layout className="layout">
      <Content className="payment-form-content">
        <Card
          className="payment-card"
          bordered={false}
          style={{ maxWidth: 500, margin: '0 auto' }}
        >
          <Title level={2} style={{ textAlign: 'center' }}>
            Cobro con Tarjeta de Credito
          </Title>
          <div className="card-preview">
            <Cards
              cvc={state.cvc}
              expiry={state.expiry}
              focused={state.focus}
              name={state.name}
              number={state.number}
            />
          </div>
          <Form layout="vertical" onFinish={onFinish} className="payment-form">
            <Form.Item label="Número de la tarjeta" required>
              <Input
                type="text"
                name="number"
                maxLength="16"
                placeholder="Número de tarjeta"
                onChange={handleChange}
                onFocus={handleFocus}
                value={state.number}
              />
            </Form.Item>
            <Form.Item label="Nombre" required>
              <Input
                type="text"
                name="name"
                maxLength="30"
                placeholder="Nombre"
                onChange={handleChange}
                onFocus={handleFocus}
                value={state.name}
              />
            </Form.Item>
            <Form.Item label="Vencimiento" required>
              <Input
                type="text"
                name="expiry"
                maxLength="4"
                placeholder="MMYY"
                onChange={handleChange}
                onFocus={handleFocus}
                value={state.expiry}
              />
            </Form.Item>
            <Form.Item label="CVC" required>
              <Input
                type="text"
                name="cvc"
                maxLength="4"
                placeholder="CVC"
                onChange={handleChange}
                onFocus={handleFocus}
                value={state.cvc}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Pagar
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  )
}

export default PaymentForm
