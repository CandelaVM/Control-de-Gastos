import React from 'react'
//Instalamos la dependencia React swipeable list para los botones de "editar" y "eliminar" un gasto en concreto. Importamos estos cinco componentes
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'

//Importamos también la hoja de estilos
import "react-swipeable-list/dist/styles.css"
import IconoAhorro from '../img/ahorro.jpg'
import IconoCasa from '../img/casa.jpg'
import IconoComida from '../img/comida.png'
import IconoGastos from '../img/gastos.jpg'
import IconoOcio from '../img/ocio.png'
import IconoSalud from '../img/salud.jpg'
import IconoSuscripciones from '../img/suscripciones.jpg'

const diccionarioIconos = {
    ahorro : IconoAhorro,
    comida : IconoComida,
    casa : IconoCasa,
    gastos : IconoGastos,
    ocio : IconoOcio,
    salud : IconoSalud,
    suscripciones : IconoSuscripciones
}

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {
    //Hacemos destructuring 
    const {tipoGasto, nombre, cantidad, id} = gasto;
    
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => eliminarGasto(id)}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

  return (
    <SwipeableList> 
    <SwipeableListItem
        leadingActions={leadingActions()} //Cuando desplacemos el cursor a la derecha
        trailingActions={trailingActions()}//Cuando desplacemos el cursor a la izquierda
        >
    <div className='gasto sombra'>
          <div className='contenido-gasto'>
          <img 
                            src={diccionarioIconos[tipoGasto]}
                            alt="Icono Gasto"
                        />
          <div className='descripcion-gasto'>
              <p className='categoría'>{tipoGasto}</p>
              <p className='nombre gasto'>{nombre}</p>
          </div>
          </div>
          <p className='cantidad-gasto'>€{cantidad}</p>          
      </div>
      </SwipeableListItem>
      </SwipeableList>
  )
}

export default Gasto