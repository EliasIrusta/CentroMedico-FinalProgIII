import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

import '../../../../../node_modules/antd/dist/reset.css';
import Cards from 'react-credit-cards-2';
import  '../../../../../node_modules/react-credit-cards-2/dist/es/styles-compiled.css'
import pacienteService from '../../../../services/pacientesApi';
import turnoService from '../../../../services/turnoApi';
import {  useParams } from 'react-router-dom';

const PaymentForm = () => {
  const [pacienteData, setPacienteData] = useState({});
  const [turnoData, setTurnoData] = useState({});
  const { id } = useParams();
    const navigate = useNavigate()
    const [state, setState] = useState({
        number: '',
        name: '',
        cvc: '',
        expiry: '',
        focus: ''
    })
	
    useEffect(() => {
      const fetchData = async () => {
        try {
          
          const turno = await turnoService.getTurnoById(id);
          setTurnoData(turno);
  
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
  


    const handleFocus = (e) => {
        setState({ 
            ...state,
            focus: e.target.name 
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ 
            ...state,
            [name]: value 
        });
    }

    const onFinish = async () => {
      try {
        console.log('este es el id de', id)
        const data = {
        estado: 'pagado'
      }
      console.log('data',data)
      console.log('editar',id,data)
      await turnoService.editarTurno(id, data);
      console.log("name => " , state.name)
        console.log("number => " , state.number)
        console.log("expiry => " , state.expiry)
        console.log("cvc => " , state.cvc)
      
        
        
        message.success('¡Informe actualizado correctamente!');
        window.location.href = '/Cobros'
      } catch (error) {
        console.error('Error al actualizar el informe:', error);
        message.error('¡Error al actualizar el informe!');
      }
      
    }

    return (

<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-900 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-4 shadow-xl">
        <div>
          <h2 className="mt-4 text-center text-4xl font-extrabold text-gray-900">PAGOS</h2>
        </div>
        <div className="centrar-contenido">
            <div className="card">
                <div className="card-body">
                    <Cards
                        cvc={state.cvc}
                        expiry={state.expiry}
                        focused={state.focus}
                        name={state.name}
                        number={state.number}
                    />
                    <br />
                    <form>
                        <div className="form-group">
                            <label htmlFor="number">Número de la tarjeta</label>
                            <input
                                type="text"
                                className="form-control"
                                name="number"
                                maxLength="16"
                                placeholder="Número de tarjeta"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                style={{ textAlign: 'center' }}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="Nombre">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                maxLength="30"
                                placeholder="Nombre"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                style={{ textAlign: 'center' }}
                            />
                        </div>
                        <br />
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="expiry">Vencimiento</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="expiry"
                                    maxLength="4"
                                    placeholder="Expiración"
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    style={{ textAlign: 'center' }}
                                />
                            </div>
                            <br />
                            <div className="form-group col-md-6">
                                <label htmlFor="cvc">CVC</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="cvc"
                                    maxLength="4"
                                    placeholder="CVC"
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    style={{ textAlign: 'center' }}
                                />
                            </div>
                        </div>
                        <br />
                        <button
                            type="button"
                            className="flex w-fit items-center gap-1 mx-auto block rounded-md bg-gradient-to-r from-indigo-600 to-blue-500 py-2 px-4 text-lg font-medium text-white hover:from-indigo-500 hover:to-blue-400 disabled:from-slate-500 disabled:to-slate-400"
                            onClick={onFinish} style={{ textAlign: 'center' }}
                        >Pagar</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}

export default PaymentForm