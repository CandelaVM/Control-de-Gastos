import React from "react";
import IntroducePresupesto from "./IntroducePresupuesto";
import GestionPresupuesto from "./GestionPresupuesto";

//Extraemos en el Header el valor de presupuesto
const Header = ({presupuesto, setPresupuesto, presupuestoValido, setPresupuestoValido, gastos, setGastos}) =>{
    return (
        <header>
            <h1>Proyecto Final Control de Gastos</h1>
          
            {/*Declaramos un ternario para que si  el presupuesto es válido (presupuestoValido(true)), entonces nos vamos a la pantalla de gestión del presupuesto */}
             {presupuestoValido ? (
                <GestionPresupuesto
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setPresupuestoValido={setPresupuestoValido}/>

             ):(/*Si no es un presupuesto válido, seguimos en la pantalla de introducir presupuesto*/
                <IntroducePresupesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setPresupuestoValido={setPresupuestoValido}/>
             )}            
        </header>
    )
}

export default Header;