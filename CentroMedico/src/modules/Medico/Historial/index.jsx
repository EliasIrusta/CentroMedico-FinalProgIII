import { Table, Button, DatePicker, } from 'antd'
import { useState, useEffect } from 'react'
import turnoService from '../../../services/turnoApi'
import pacienteService from '../../../services/pacientesApi'

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
    console.log('IDUsuariodeH',idUsuario)
  }, [refresh])

  const onClick = () => {
    const fetchData = async () => {
      const response = await turnoService.getAllTurnos()
      setTurnos(response)
    }
    fetchData()
  }

  const handleFechaChange = (date, dateString) => {
    const fetchData = async () => {
      const fecha = { fechaTurno: dateString }
      const response = await turnoService.buscarTurnoPorFecha(fecha)
      setTurnos(response)
    }
    fetchData()
  }

  useEffect(() => {
    traerTurnos()
    setRefresh(false)
  }, [refresh])
  const traerTurnos = async () => {
    try {
      const response = await turnoService.getAllTurnos();
      const idUsuario = localStorage.getItem('miId');
      const turnosConMedico = await Promise.all(response.map(async (turno) => {
        if (turno.medico_id === idUsuario) { // Comparar el id del médico con el id del usuario
          const pacientes = await pacienteService.getAllPacientes();
          const medico = pacientes.find(paciente => paciente._id === turno.medico_id);
          if (medico) {
            return { ...turno, medico: { nombre: medico.firstName, apellido: medico.lastName, especialidad: medico.especialidad } };
          }
        }
        return null; 
      }));
      setTurnos(turnosConMedico.filter(turno => turno)); 
    } catch (error) {
      console.error("Error al obtener los turnos:", error);
    }
  };
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', textTransform: 'capitalize' }}>
      

      </div>
        <h2 >Historial de Turnos </h2>
        <Table
          dataSource={turnos.filter((x) => x.estado !== 'pendiente')}
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