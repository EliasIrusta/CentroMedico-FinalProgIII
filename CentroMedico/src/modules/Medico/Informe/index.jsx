import React, { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import { Card, Checkbox, Form, Input, Button, message } from 'antd';
import pacienteService from '../../../services/pacientesApi';
import turnoService from '../../../services/turnoApi';

const { TextArea } = Input;
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

const Informe = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [pacienteData, setPacienteData] = useState({});
  const [turnoData, setTurnoData] = useState({});
  const { id } = useParams(); // Obtiene el id del turno de la URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el turno por su id
        const turno = await turnoService.getTurnoById(id);
        setTurnoData(turno);

        // Obtener el paciente por su id (si está asociado al turno)
        if (turno.paciente_id) {
          const paciente = await pacienteService.getPacienteById(turno.paciente_id);
          setPacienteData(paciente);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [id]);

  const onFinish = async (values) => {
    try {
      console.log('este es el id de', id)
      console.log('estos son los valores', values)
      const data = {
      tratamiento: values.tratamiento,
      estado: 'completado'
    }
    console.log('data',data)
    console.log('editar',id,data)
      await turnoService.editarTurno(id, data);
      
      message.success('¡Informe actualizado correctamente!');
      window.location.href = '/Medico/Historial'
    } catch (error) {
      console.error('Error al actualizar el informe:', error);
      message.error('¡Error al actualizar el informe!');
    }
    
  };

  return (
    <div style={{ padding: '20px', width: 900 }}>
      <Card
        title="Información del Paciente"
        bordered={false}
        style={{ width: 300 }}
      >
        <p><strong>Nombre:</strong> {pacienteData.firstName} {pacienteData.lastName}</p>
        <p><strong>DNI:</strong> {pacienteData.dni}</p>
        {/* Agrega más campos de información del paciente según tu esquema */}
      </Card>
      <Card
        title="Información del Turno"
        bordered={false}
        style={{ width: 300, marginTop: '20px' }}
      >
        <p><strong>Fecha del Turno:</strong> {turnoData.fechaTurno}</p>
        <p><strong>Hora del Turno:</strong> {turnoData.horaTurno}</p>
        <p><strong>Descripción:</strong> {turnoData.descripcion}</p>
        <p><strong>Estado:</strong> {turnoData.estado}</p>
        {/* Agrega más campos de información del turno según tu esquema */}
      </Card>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Iniciar Informe
      </Checkbox>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        disabled={componentDisabled}
        onFinish={onFinish}
        style={{ maxWidth: 600, marginTop: '20px' }}
      >
        <Form.Item label="Tratamiento" name="tratamiento">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Terminar Informe</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Informe;
