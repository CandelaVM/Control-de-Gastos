import {useState} from "react";
import Error from "./Error";

const IntroducePresupesto = ({presupuesto, setPresupuesto, setPresupuestoValido}) =>{
const [error, setError]=useState(''); //Declaramos un state local porque sólo nos va a servir en IntroducePresupuesto
    
    /*Validamos nuestro presupuesto para que no se introduzcan valores de tipo caracter o negativos*/
    const validarPresupuesto = (e) =>{
        e.preventDefault();

        /*SI no es un número o es menor a cero.*/ 
        if (!(presupuesto) || (presupuesto)<0){
            setError ('No es un dato válido');
            return
        }
        //Si es un presupuesto válido, reseteamos el error en y confirmamos que es válido estableciento "setPresupuestoValido=true"    
        setError('');
        setPresupuestoValido(true);

    }
    return (
        /*Llamamos a la funcion validarPresupuesto, cuando le demos a submit (onSUbmit)*/
        <div onSubmit={validarPresupuesto} className="seccion-presupuesto contenedor sombra">
            <form className="formulario">
                <div className="campo">
                <div className="centrar-imagen">
                    <img  src="/ControlGasto.jpg" alt="" width="100" height="100" />
                </div>
                    <label>Introduce tu Presupuesto</label>
                    <input className="nuevo-presupuesto"
                    type="number"/*Sólo nos va a permitir leer números*/
                    value={presupuesto}    
                    //Actualizamos el state con un callback
                    onChange={e=>setPresupuesto(e.target.value)}        
                    />
                </div>
                <input type="submit" value="Añadir"/>
                
                {error && <Error> <p>No es un dato válido</p> </Error>}
            </form>
        </div>
    )
}

export default IntroducePresupesto;