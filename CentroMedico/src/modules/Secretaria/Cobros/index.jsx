import { Table, Button, DatePicker, } from 'antd'
import { useState, useEffect } from 'react'
import turnoService from '../../../services/turnoApi'
import pacienteService from '../../../services/pacientesApi'
import { Link } from 'react-router-dom';

const columns = [
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
        <Link to={`PaymentForm/${record._id}`}>
          <Button type="primary">Iniciar Cobro</Button>
        </Link>
      </span>
    ),
  }, 

]


function Cobros() {
  const [turnos, setTurnos] = useState([''])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    onClick()
    setRefresh(false)
    const tokenUsuario = localStorage.getItem('miToken')
    const idUsuario = localStorage.getItem('miId')
    //console.log(tokenUsuario)
    //console.log(turnos)
    
  }, [refresh])

  const onClick = () => {
    const fetchData = async () => {
      const response = await turnoService.getAllTurnos()
      console.log(response)
      setTurnos(response)
    }
    fetchData()
  }

  const handleFechaChange = (date, dateString) => {
    //setFechaSeleccionada(dateString);
    console.log(dateString)

    const fetchData = async () => {
      const fecha = { fechaTurno: dateString }
      const response = await turnoService.buscarTurnoPorFecha(fecha)
      //console.log(response)
      setTurnos(response)
    }
    fetchData()
  }

  useEffect(() => {
    traerTurnos()
    setRefresh(false)
    //console.log(turnos)
  }, [refresh])
  const traerTurnos = async () => {
    try {
      const response = await turnoService.getAllTurnos();
      const turnosConMedico = await Promise.all(response.map(async (turno) => {
        if (turno.medico_id) {
          // Obtener todos los pacientes de la base de datos
          const pacientes = await pacienteService.getAllPacientes();
          // Buscar el paciente cuyo ID coincida con el medico_id del turno actual
          const medico = pacientes.find(paciente => paciente._id === turno.medico_id);
          // Si se encuentra el médico, agregar su nombre y apellido al turno
          if (medico) {
            return { ...turno, medico: { nombre: medico.firstName, apellido: medico.lastName, especialidad: medico.especialidad } };
          }
        }
        return turno;
      }));
      setTurnos(turnosConMedico.filter(turno => turno)); // Eliminar turnos que no tienen médico
    } catch (error) {
      console.error("Error al obtener los turnos:", error);
    }
  };
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', textTransform: 'capitalize' }}>
      

      </div>
        <h2 >Cobros </h2>
        <Table
          dataSource={turnos.filter((x) => x.estado === 'completado')}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          bordered
          style={{ textTransform: 'capitalize' }}
        />
      </div>
    
  )
}



  
  export default Cobros