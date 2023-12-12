import { useState } from 'react';
import { Spin } from 'antd';

function FormLogin({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error401, setError401] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email === '' || password === '') {
            setError(true);
            return;
        }
        console.log(event);
        console.log('ACA');
        setError(false);
        setUser([email]);
    };

    const formularioStyle = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
    };

    return (
        <div>
            <h1>Formulario Login</h1>
            <form style={formularioStyle} onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button>iniciar sesion</button>
            </form>
            {error && <p>todos los campos son obligatorios</p>}
        </div>
    );
}

export default FormLogin;
