import './Formulario.css'
import { useState } from 'react'
import { validarUsuario } from './validacionUsuarios'
import { Spin, Form, Input, Button, message } from 'antd'

export function Formulario({ setUser }) {
    const [isLoading, setIsLoading] = useState(false)
    const [error401, setError401] = useState(false)

    const handleSubmit = async (values) => {
        const { nombre, contrasenia } = values

        const user = {
            email: nombre,
            password: contrasenia,
            rol: '',
            token: '',
        }

        setIsLoading(true)

        try {
            await validarUsuario({ user })

            setUser(user)

            if (user.rol.name === 'admin') {
                window.location.href = '/pacientes'
            } else if (user.rol.name === 'medico') {
                window.location.href = '/medico'
            }
        } catch (error) {
            setError401(true)
            message.error('Error de autenticación')
        } finally {
            setIsLoading(false)
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <section className="section-background">
            <div className="form-container">
                <h1 className="titulo">Bienvenido al Centro Médico</h1>
                <h2 className="tituloLogin">Iniciar Sesión:</h2>
                <Spin
                    spinning={isLoading}
                    size="large"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                />

                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={handleSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="E-mail"
                        name="nombre"
                        rules={[
                            { required: true, message: 'Por favor ingrese su nombre!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Contraseña"
                        name="contrasenia"
                        rules={[
                            { required: true, message: 'Por favor ingrese su contraseña!' },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Iniciar sesión
                        </Button>
                    </Form.Item>
                </Form>

                {error401 && <p className="msg">Error de autenticación</p>}
            </div>
        </section>
    )
}

export default Formulario
