import {useState, useEffect} from "react";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const GestionPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setPresupuestoValido}) => {
    //Declaramos nuestras variables para el control del presupuesto ("gastado" y "disponible") y las inicializamos a cero
    const [disponible, setDisponible]=useState(0);
    const [gastado, setGastado]= useState(0);
    //Variable para el control de la gráfica
    const [porcentaje, setPorcentaje] =useState(0);
    
    
    
    //Cada vez que "gastos" cambie, se va a estar ejecutando useEffect 
    useEffect(()=>{
        //El método reduce() ejecuta una función reductora sobre cada elemento de un array, devolviendo como resultado un único valor.
        //La función reductora recibe cuatro argumentos:

            // Acumulador 
            // Valor Actual 
            // Índice Actual 
            // Array 
        const totalGasto=gastos.reduce((total, gasto)=>gasto.cantidad+total,0);
        const totalDisponible = presupuesto - totalGasto;
        //Calculamos el porcentaje gastado redondeado a dos dígitos
        const nuevoPorcentaje = (((presupuesto-totalDisponible)/presupuesto)*100).toFixed(2);
        setPorcentaje(nuevoPorcentaje);
        setGastado(totalGasto)
        setDisponible(totalDisponible)
    }, [gastos])
    
    const resetearApp = () => {
        const resultado = confirm ('¿Realmente quieres reiniciar tu presupuesto?')
        if (resultado) {
            //Reiniciamos los valores
            setGastos([]);
            setPresupuesto(0);
            setPresupuestoValido(false);
        }
    }
    return (
        <div className="seccion-presupuesto contenedor sombra interfaz-gestion-presupuesto">
            <div className={(porcentaje>100) ? 'grafica-negativa' : ''}>
                <CircularProgressbar
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
                />
            </div>
            
            <div className="contenido-presupuesto">
                
                <button
                    className="reset-app"
                    type="button"
                    onClick={resetearApp}
                >
                    Resetear App
                </button>        
                
                <p>
                    <span>Presupuesto:</span> {presupuesto}€
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible:</span> {disponible}€
                </p>
                 <p>
                    <span>Gastado:</span> {gastado}€
                </p>           
                
            </div>
            
        </div>
    )
}

export default GestionPresupuesto;