import React, { useState } from 'react';
import { Button, Cascader, Form, Input, Select } from 'antd';
import userService from '../services/userApi';

const { Option } = Select;


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
    },
};


const roles = [

    {
        value: 'paciente',
        label: 'Paciente',
    },
    {
        value: 'medico',
        label: 'medico',
    },
    {
        value: 'admin',
        label: 'admin',
    },
];

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="54">+54</Option>
            <Option value="1">+1</Option>
        </Select>
    </Form.Item>
);

const App = () => {
    const [form] = Form.useForm();
    const [rol, setRol] = useState('');

    const onFinish = async (values) => {
        try {
            console.log('Received values of form:', values);

            const response = await userService.createUser(values);
            console.log('Respuesta del servidor:', response);

            console.log('¡El usuario se ha creado exitosamente!', values);

            // Redirigir a la página de lista de usuarios después del éxito
            window.location.href = "/usuarios/create";
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            // Manejar el error de manera adecuada, según tus necesidades
        }
    };

    const handleRolChange = (value) => {

        setRol(value);

        console.log(rol);

    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{ prefix: '+54' }}
            style={{ maxWidth: 600 }}
            scrollToFirstError
        >
            <Form.Item
                name="rol"
                label="Rol de usuario"
                rules={[{ type: 'array', required: true, message: 'Por favor, selecciona un rol' }]}
            >

                <Cascader options={roles} onChange={handleRolChange} />

            </Form.Item>

            {rol == 'medico' && (
                <Form.Item
                    name="especialidad"
                    label="Especialidad"
                    rules={[{ required: true, message: 'Por favor, ingresa tu especialidad' }]}
                >
                    <Input />
                </Form.Item>
            )}

            <Form.Item
                name="firstName"
                label="Nombre"
                rules={[{ required: true, message: 'Por favor, ingresa tu nombre' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="lastName"
                label="Apellido"
                rules={[{ required: true, message: 'Por favor, ingresa tu apellido' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="dni"
                label="DNI"
                rules={[{ required: true, message: 'Por favor, ingresa tu DNI' }]}
            >
                <Input />
            </Form.Item>



            {rol == 'paciente' && (
                <Form.Item
                    name="bornDate"
                    label="Fecha de Nacimiento"
                    rules={[{ required: true, message: 'Por favor, ingresa tu fecha de nacimiento' }]}
                >
                    <Input type="date" />
                </Form.Item>
            )}

            

            <Form.Item
                name="email"
                label="E-mail"
                rules={[{ type: 'email', message: 'Ingresa un correo electrónico válido' }, { required: true, message: 'Por favor, ingresa tu correo electrónico' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Por favor, ingresa tu contraseña' }]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirmar Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    { required: true, message: 'Por favor, confirma tu contraseña' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Las contraseñas no coinciden'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item
                name="phone"
                label="Número de Teléfono"
                rules={[{ message: 'Por favor, ingresa tu número de teléfono' }]}
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>


            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Registrarse
                </Button>
            </Form.Item>
        </Form>
    );
};

export default App;
