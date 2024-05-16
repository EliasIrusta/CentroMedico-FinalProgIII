import React, { useState, useEffect } from 'react';
import { Table, Button, DatePicker, Modal, message, Select } from 'antd';
import turnoService from '../../../services/turnoApi';
import pacienteService from '../../../services/pacientesApi';
import pagosService from '../../../services/pagosApi';
import { Link } from 'react-router-dom';

const { Option } = Select;

const columns = (handleIniciarCobro) => [
  {
    title: 'Nombre del Paciente',
    dataIndex: 'nombrePaciente',
    key: 'nombrePaciente',
  },
  {
    title: 'Hora',
    dataIndex: 'horaTurno',
    key: 'horaTurno',
  },
  {
    title: 'Fecha del Turno',
    dataIndex: 'fechaTurno',
    key: 'fechaTurno',
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    key: 'estado',
  },
  {
    title: 'Acciones',
    key: 'acciones',
    render: (_, record) => (
      <span>
        <Button type="primary" onClick={() => handleIniciarCobro(record)}>
          Iniciar Cobro
        </Button>
      </span>
    ),
  },
];

function Cobros() {
  const [turnos, setTurnos] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [categoriaPago, setCategoriaPago] = useState(null);

  useEffect(() => {
    onClick();
    setRefresh(false);
  }, [refresh]);

  const onClick = async () => {
    try {
      const response = await turnoService.getAllTurnos();
      setTurnos(response);
    } catch (error) {
      console.error('Error al obtener los turnos:', error);
    }
  };

  const handleFechaChange = async (date, dateString) => {
    try {
      const fecha = { fechaTurno: dateString };
      const response = await turnoService.buscarTurnoPorFecha(fecha);
      setTurnos(response);
    } catch (error) {
      console.error('Error al buscar los turnos por fecha:', error);
    }
  };

  useEffect(() => {
    traerTurnos();
    setRefresh(false);
  }, [refresh]);

  const traerTurnos = async () => {
    try {
      const response = await turnoService.getAllTurnos();
      const turnosConMedico = await Promise.all(
        response.map(async (turno) => {
          if (turno.medico_id) {
            const pacientes = await pacienteService.getAllPacientes();
            const medico = pacientes.find(
              (paciente) => paciente._id === turno.medico_id
            );
            if (medico) {
              return {
                ...turno,
                medico: {
                  nombre: medico.firstName,
                  apellido: medico.lastName,
                  especialidad: medico.especialidad,
                },
              };
            }
          }
          return turno;
        })
      );
      setTurnos(turnosConMedico.filter((turno) => turno));
    } catch (error) {
      console.error('Error al obtener los turnos:', error);
    }
  };

  const handleIniciarCobro = (record) => {
    setSelectedTurno(record);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setSelectedTurno(null);
    setCategoriaPago(null);
  };

  const handlePago = async (metodo) => {
    try {
      if (!categoriaPago) {
        message.error('Debe seleccionar una categoría de pago primero!');
        return;
      }

      let monto = 0;
      switch (categoriaPago) {
        case 'primera-consulta':
          monto = 5000;
          break;
        case 'consulta':
          monto = 3500;
          break;
        case 'control':
          monto = 2500;
          break;
        default:
          monto = 0;
      }

      const pagoData = {
        turno_id: selectedTurno._id,
        categoria: categoriaPago,
        monto: monto.toString(),
        metodoPago: metodo,
      };
      console.log(metodo)
      const response = await pagosService.createPago(pagoData);
      await turnoService.editarTurno(selectedTurno._id, { estado: 'pagado' });

      message.success('¡Pago realizado con éxito!');
      setVisible(false);
      setRefresh(true);
    } catch (error) {
      console.error('Error al realizar el pago:', error);
      message.error('¡Error al realizar el pago!');
    }
  };


  
  return (
    <div>
      <h2>Cobros</h2>
      <DatePicker onChange={handleFechaChange} style={{ marginBottom: 20 }} />
      <Table
        dataSource={turnos.filter((x) => x.estado === 'completado')}
        columns={columns(handleIniciarCobro)}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        bordered
        style={{ textTransform: 'capitalize' }}
      />
      <Modal
        title="Seleccionar Método de Pago"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="efectivo" type="primary" onClick={() => handlePago('efectivo')}>
            Efectivo
          </Button>,
          
          <Link
            to={categoriaPago ? `PaymentForm/${selectedTurno?._id}` : '#'}
            key="tarjeta"
            onClick={() => handlePago('tarjeta')}
          >
            <Button type="primary">Tarjeta de Crédito</Button>
          </Link>,
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <p>Seleccione la categoría de pago:</p>
        <Select
          defaultValue="Seleccione una categoría"
          style={{ width: '100%', marginBottom: 20 }}
          onChange={(value) => setCategoriaPago(value)}
        >
          <Option value="primera-consulta">Primera Consulta</Option>
          <Option value="consulta">Consulta</Option>
          <Option value="control">Control</Option>
        </Select>
      </Modal>
    </div>
  );
}

export default Cobros;
