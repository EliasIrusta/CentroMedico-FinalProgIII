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
    title: 'Detalle',
    dataIndex: 'descripcion',
    key: 'descripcion',
    
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

  
]

function Historial() {
  const [turnos, setTurnos] = useState([''])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    onClick()
    setRefresh(false)
    const tokenUsuario = localStorage.getItem('miToken')
    const idUsuario = localStorage.getItem('miId')
    //console.log(tokenUsuario)
    console.log('IDUsuariodeH',idUsuario)
    
    
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
      const idUsuario = localStorage.getItem('miId');
      console.log('idusuario para comparar',idUsuario)
      const turnosConMedico = await Promise.all(response.map(async (turno) => {
        if (turno.medico_id === idUsuario) { // Comparar el id del médico con el id del usuario
          const pacientes = await pacienteService.getAllPacientes();
          const medico = pacientes.find(paciente => paciente._id === turno.medico_id);
          if (medico) {
            return { ...turno, medico: { nombre: medico.firstName, apellido: medico.lastName, especialidad: medico.especialidad } };
          }
        }
        return null; // Si el turno no coincide con el id del usuario, retornar null
      }));
      setTurnos(turnosConMedico.filter(turno => turno)); // Eliminar los turnos que son null
    } catch (error) {
      console.error("Error al obtener los turnos:", error);
    }
  };
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', textTransform: 'capitalize' }}>
      

      </div>
        <h2 >TURNOS </h2>
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


  
  export default Historial