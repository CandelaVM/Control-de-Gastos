import React from 'react'
import Gasto from './Gasto';

const ListadoGastos = ({gastos, 
  setGastoEditar, 
  eliminarGasto, 
  select, 
  gastosSeleccionados
}) => {
  return (
    <div className='listado-gastos contenedor'>
        { select ? (
         <>
         <h2>{gastosSeleccionados.length ? 'Gastos' : 'No Hay Gastos en esta categoría'}</h2>    
          {gastosSeleccionados.map (gasto => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
          </>
          ):(
           <> 
            <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos aún'}</h2>
            {gastos.map( gasto => (
                <Gasto 
                    key={gasto.id}
                    gasto={gasto}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                />
            ))}
            </>
          )
        }
    </div>
  )
}

export default ListadoGastos;