import React, { useState, useEffect } from 'react';
import { Table, DatePicker, message } from 'antd';
import pagosService from '../../../../services/pagosApi';
import pacienteService from '../../../../services/pacientesApi';
import turnoService from '../../../../services/turnoApi';
import userService from '../../../../services/userApi';

const columns = [
    {
        title: 'Nombre del Paciente',
        dataIndex: 'nombrePaciente',
        key: 'nombrePaciente',
    },
    {
        title: 'Nombre del Médico',
        dataIndex: 'nombreMedico',
        key: 'nombreMedico',
    },
    {
        title: 'Categoría de Pago',
        dataIndex: 'categoria',
        key: 'categoria',
    },
    {
        title: 'Monto',
        dataIndex: 'monto',
        key: 'monto',
    },
    {
        title: 'Fecha de Pago',
        dataIndex: 'fechaPago',
        key: 'fechaPago',
    },
];

function HistorialPagos() {
    const [pagos, setPagos] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        onClick();
        setRefresh(false);
    }, [refresh]);

    const onClick = () => {
        const fetchData = async () => {
            try {
                const response = await pagosService.getAllPagos();
                const turnos = await turnoService.getAllTurnos();
                const pacientes = await pacienteService.getAllPacientes();
                const pagosConDetalles = await Promise.all(
                    response.map(async (pago) => {
                        const turno = turnos.find((t) => t._id === pago.turno_id);
                        const idmedico = pago.turno_id.medico_id
                        const nombrecompletoMedico = await userService.getPersonById(idmedico)
                        const fechaPago = new Date(pago.createdAt).toLocaleDateString('en-US');
                        return {
                            ...pago,
                            nombrePaciente: pago.turno_id.nombrePaciente,
                            nombreMedico: nombrecompletoMedico.firstName + ' ' + nombrecompletoMedico.lastName,
                            fechaPago: fechaPago,
                        };
                    })
                );
                setPagos(pagosConDetalles);
            } catch (error) {
                console.error('Error al obtener los pagos:', error);
                message.error('Error al obtener los pagos');
            }
        };
        fetchData();
    };

    const handleFechaChange = (date, dateString) => {
        const fetchData = async () => {
            try {
                const response = await pagosService.buscarPagosPorFecha(dateString);
                setPagos(response);
            } catch (error) {
                console.error('Error al buscar los pagos por fecha:', error);
                message.error('Error al buscar los pagos por fecha');
            }
        };
        fetchData();
    };

    return (
        <div>
            <h1>HISTORIAL</h1>
            <div style={{ display: 'flex', alignItems: 'center', textTransform: 'capitalize' }}>
                <DatePicker onChange={handleFechaChange} style={{ marginBottom: 20 }} />
            </div>
            <h2>Historial de Pagos</h2>
            <Table
                dataSource={pagos}
                columns={columns}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
                bordered
                style={{ textTransform: 'capitalize' }}
            />
        </div>
    );
}

export default HistorialPagos;
