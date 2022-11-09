import { useState, useEffect } from 'react'

const BuscaGasto = ({select, setSelect}) => {


    return (
        <div className="seleccion-gasto sombra contenedor">
            <form>
                <div className="campo">
                    <label>Selecciona gasto</label>
                    <select 
                        value={select}
                        onChange={e => setSelect(e.target.value) }
                    >
                        <option value="">-- Todas las Categorías --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default BuscaGasto
