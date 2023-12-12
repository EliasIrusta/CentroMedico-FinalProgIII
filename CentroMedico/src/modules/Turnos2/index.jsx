import { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, AutoComplete } from 'antd';
import dayjs from 'dayjs';
import turnoService from '../../services/turnoApi';
import userService from '../../services/userApi';

const Turnos = () => {

  const [responseText, setResponseText] = useState('');

  const [users, setUsers] = useState('');
  // Estado para almacenar las opciones del AutoComplete
  const [options, setOptions] = useState([]);
  useEffect(() => {
    listarUsuarios();
  }, []);
  const listarUsuarios = () => {
    const fetchData = async () => {
      const response = await userService.getAllPeople();
      setUsers(response);
    };
    fetchData();
  };


  const handleSearch = (value) => {

    const filteredData = users.filter((user) =>
      user.firstName.toLowerCase().includes(value.toLowerCase())
    );
    const opc = filteredData.map((a) => ({ value: a.firstName }));
    setOptions(opc);
  };


  const onSelect = (data) => {
    const userSeleccionado = users.find((user) => user.firstName === data);
    console.log(userSeleccionado);
  };


  const onFinish = (values) => {
    values.estado = 'pendiente';
    const fechaISO8601 = values.fechaTurno;
    values.fechaTurno = dayjs(fechaISO8601).format('YYYY-MM-DD');
    values.horaTurno = dayjs(fechaISO8601).format('HH:mm');
    const fetchData = async () => {
      try {
        const response = await turnoService.createTurno(values);
        console.log('Respuesta del servidor', response);
        if (response) {
          setResponseText('Turno cargado');
        }
      } catch (error) {
        console.error('Error al cargar el turno:', error);
      }
    };
    fetchData();
  };


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
        {/* AutoComplete para el nombre del cliente */}
        <AutoComplete
          options={options}
          style={{ width: 100 }}
          onSelect={onSelect}
          onSearch={(text) => handleSearch(text)}
          placeholder="Nombre del cliente"
        />

        {/* Selector de fecha y hora */}
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

        {/* Descripción del turno */}
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

        {/* Botón para cargar el turno */}
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

      {/* Mostrar el texto de respuesta del servidor */}
      {responseText && <div>{responseText}</div>}
    </div>
  );
};


export default Turnos;
