import './Formulario.css'
import { useState } from 'react'
import { validarUsuario } from './validacionUsuarios'
import { Spin } from 'antd'

export function Formulario({ setUser }) {

    const [nombre, setNombre] = useState('')
    const [contrasenia, setContrasenia] = useState('')
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error401, setError401] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (nombre === '' || contrasenia === '') {
            setError(true)
            return
        }

        setError(false)
        const user = {
            email: nombre,
            password: contrasenia,
            rol: '',
            token: '',
        }
        setIsLoading(true)

        await validarUsuario({ user })

        setIsLoading(false)

        setUser(user)

        if (user.rol.name == 'admin') {
            window.location.href = "/pacientes"
        }

        if (user.rol.name == 'medico') {
            window.location.href = "/medico"
        }

    }

    return (
        <section>
            <h1 className="tituloLogin">Login</h1>
            <Spin
                spinning={isLoading}
                size="large"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />

            <form className="formulario" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="password"
                    value={contrasenia}
                    onChange={(e) => setContrasenia(e.target.value)}
                />
                <button>Iniciar sesión</button>
            </form>
            {error && <p className="msg">Todos los campos son obligatorios</p>}
        </section>
    )
}
