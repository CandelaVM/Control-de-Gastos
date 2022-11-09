import { useState, useEffect} from 'react'
import Header from './componentes/Header'
import VentanaGasto from './componentes/VentanaGasto';
import ListadoGastos from './componentes/ListadoGastos';
import BuscaGasto from './componentes/BuscaGasto';

function App() {
//Declaro en APP las variables que nos van a permitir el intercambio del valor de del presupuesto entre componentes.

//Si hay almacenado en LocalStorage algún presupuesto, lo cargamos. Si no, lo inicilizamos a cenro
const [presupuesto, setPresupuesto]=useState(
  Number(localStorage.getItem('presupuesto')) ?? 0
);
  
const [presupuestoValido, setPresupuestoValido]=useState(false);
  
const [ventana, setVentana] = useState(false);

//De la misma manera que con "presupuesto", miramos en primer lugar a ver si hay gastos en localStorage. Si hay, los cargamos, y si no, inicializamos a cero
const [gastos, setGastos] = useState(  localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);

//Creamos un objeto con el gasto que queremos editar
const [gastoEditar, setGastoEditar] =useState({})

//Filtrado de categorías
const [select, setSelect] =useState('');
const [gastosSeleccionados, setGastosSeleccionados]=useState([]);

//Coloco un UseEffect para escuchar los cambios que se produzcan en el objeto "gastoEditar"
useEffect(()=>{
  //Si se le ha dado a "editar", abrimos de nuevo la ventana de gasto para poder editarlo
  // If you want to check whether your object has any values or is empty you can use if(Object.keys(props.files).length>0). as the condition.
  if(Object.keys(gastoEditar).length>0)
  {
    setVentana(true);
  }
},[gastoEditar])

//Este useEffect se va a ejecutar cuando cambie "presupuesto"
useEffect(() => {
  localStorage.setItem('presupuesto', presupuesto ?? 0)
}, [presupuesto])

//Este useEffect se va a ejecutar cuando cambie "gastos"
useEffect(() => {
  localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
}, [gastos])

//Este useEffect se va a ejecutar cuando intentemos seleccinar gastos de un mismo tipo, por lo que su dependencia va a ser "select"
useEffect(() => {
  if(select) {
      const gastosFiltrados = gastos.filter( gasto => gasto.tipoGasto === select)
      setGastosSeleccionados(gastosFiltrados)
  }
}, [select]);


//Si ya hay definido un presupuesto (locaslStorage !=0), directamente tenemos ya un presupuesto de finido válido. Este useEffect se va a ejecutar una sola vez cuando carga la aplicación
useEffect(() => {
  const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
  if(presupuestoLS > 0 ) {
    setPresupuestoValido(true)
  }
}, []);

const clickAnadeGasto = () =>{
  setVentana(true);
  setGastoEditar({}); //Reinicializamos el gasto a cero al dar al botón de añadir gasto
}

//Creamos un ID único para cada gasto
const generarId = () =>{
    const random = Math.random().toString(36)
    const fecha = Date.now().toString(36)
    return random + fecha; 
  }  

  //Creamos nuestro objeto de gasto
const guardarGasto = objGasto =>{
  //Si ya existe in un ID, lo vamos a actualizar
  if(objGasto.id){
    //Si ya existe in un ID, lo vamos a actualizar
    const gastosActualizados = gastos.map(gastoState => gastoState.id === objGasto.id ? objGasto : gastoState)
    setGastos(gastosActualizados);
    setGastoEditar({})/*Reseteamos el State*/
  }else{//si no, lo vamos a generar
    objGasto.id=generarId();
    setGastos([...gastos, objGasto])
  }
}

const eliminarGasto = id => {
  //Filtramos el gasto por su ID única
  const gastosActualizados = gastos.filter( gasto => gasto.id !== id);
  setGastos(gastosActualizados);
}

  return (
    <div>
      <Header
      gastos={gastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      presupuestoValido={presupuestoValido}
      setPresupuestoValido={setPresupuestoValido}
      setGastos={setGastos}
      />
      {presupuestoValido && (
        <>
        <main>
          <BuscaGasto
          select={select}
          setSelect={setSelect}
          
          />
          <ListadoGastos 
          gastos={gastos}
          setGastoEditar={setGastoEditar}
          eliminarGasto={eliminarGasto}
          select={select}
          gastosSeleccionados={gastosSeleccionados}
          />
        </main>
        <div className='nuevo-gasto'>
            <img src='./src/img/nuevo-gasto.gif'
              onClick={clickAnadeGasto} />
        </div>
        </>
      )}

      {ventana && <VentanaGasto 
      setVentana={setVentana}
      guardarGasto={ guardarGasto}
      gastoEditar={gastoEditar}
      setGastoEditar={setGastoEditar}/*Reseteamos el modal*//>}
    </div>
  )
}

export default App
