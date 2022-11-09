import React from "react";
import { useState, useEffect} from "react";
import Error from "./Error";

const VentanaGasto = ({setVentana, guardarGasto, gastoEditar, setGastoEditar}) => {
//Declaramos los State para los valores del formulario
const [nombre, setNombre]=useState('');
const [cantidad, setCantidad]=useState('');
const [tipoGasto, setTipoGasto]=useState('');
const [id, setId]=useState('');

//Creamos un State de Error
const [error, setError]=useState('');

useEffect(()=>{//Se va a ejecutar cuando el componente esté listo
  // If you want to check whether your object has any values or is empty you can use if(Object.keys(props.files).length>0). as the condition.
  console.log('Componente Listo')
  if(Object.keys(gastoEditar).length>0)//Comprobamos si está vacío
  {
    setNombre(gastoEditar.nombre)
    setCantidad(gastoEditar.cantidad)
    setTipoGasto(gastoEditar.tipoGasto)
    setId(gastoEditar.id)
  }
},[]);


const cerrarVentana=()=>{
  setVentana(false);
  setGastoEditar({}/*Reseteamos el State*/)
}
  
  const validarFormulario = e =>{
    e.preventDefault();
  
     //Comprobamos si alguno de los campos está vacío
    if(nombre === '' || cantidad ===''|| tipoGasto===''){
      setError ('Todos los campos son obligatorios');
      //Quitamos el mensaje de error a los 2 segundos
      setTimeout(()=>{
      setError('');
       }, 2000);
      return;
     }
     //En caso de que pase la validación, guardamos el gasto que posteriormente pasaremos a APP.JSX y cerramos la ventana
     guardarGasto({nombre, cantidad, tipoGasto, id});
     cerrarVentana();
  }
  

  return (
     
    <div className="ventana_gasto">
      
      <div className="cerrar-ventana">
        <img src='./src/img/cerrar.gif'
        onClick={cerrarVentana}/>
      </div>

      <form 
        //Validamos los datos del formulario
        onSubmit={validarFormulario}
        className="formulario">
        {/* Si exite el campo nombre en gastoEdita, es que estamos editando y pondremos ese título, en caso contrario el título será añadir nuevo gasto */}
        <h2>{gastoEditar.nombre? 'Editar Gasto':'Añadir gasto'}</h2>

        <div className="campo">
          <label htmlFor="nombre">Nombre gasto</label>
          <input 
          id="nombre"
          type="text"
          placeholder="Nombre gasto" 
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input 
          id="cantidad"
          type="number"
          placeholder="€" 
          value={cantidad}
          onChange={e => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="tipo">Tipo Gasto</label>
          <select id="tipoGasto"
             value={tipoGasto}
             onChange={e => setTipoGasto(e.target.value)}
          >
            <option value="">--Selecciona--</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
            <option value="gastos">Gastos Varios</option>
          </select> 
                 
        </div>

        <input type="submit"
          value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}
        />

      </form>

      {error && <Error> <p>Todos los campos son obligatorios</p> </Error>}
    </div>
  )
}

export default VentanaGasto;