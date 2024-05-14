import React, { useState } from 'react';
import {   Butt ,  Form,    Input, 
    Row,
    Select,
    message
} from 'antd';

import userService from '../services/userApi';




const { Option } = Select;
const roles = [
    {
        value: 'admin',
        label: 'Administrador',
    },
    {
        value: 'client',
        label: 'Cliente',
    },
];
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
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
};


const UpdateUser = (data) => {
    console.log('Update User')
    const userData = data.data.userInfo
    console.log(userData)

    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);

        const fetchData = async () => {

            const response = await userService.updateUser(userData._id, values)
            console.log(response)
        }
        fetchData()
        message.success('¡Usuario actualizado correctamente!');
        window.location.href = "/"
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="54">+54</Option>
                <Option value="1">+1</Option>
            </Select>
        </Form.Item>
    );

    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    const onWebsiteChange = (value) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
        }
    };
    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));
    
    
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                dni: userData.dni,
                phone: userData.phone,
                prefix: '+54',
            }}
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="firstName"
                label="Nombre"
                rules={[
                    {
                        type: 'text'
                    },
                    {
                        required: true,
                        message: 'Please input your name',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="lastName"
                label="Apellido"
                rules={[
                    {
                        type: 'text'
                    },
                    {
                        required: true,
                        message: 'Please input your name',
                    },
                ]}
            >
                <Input />
            </Form.Item>

        
            <Form.Item
                name="dni"
                label="DNI"
                rules={[
                    {
                        type: 'text'
                    },
                    {
                        required: true,
                        message: 'Please input your name',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                    {
                        message: 'Please input your phone number!',
                    },
                ]}
            >
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};


export default UpdateUser;