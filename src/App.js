import React, { useState, useEffect } from 'react';
import Pregunta from './components/Pregunta.js';
import Formulario from './components/Formulario.js';
import Listado from './components/Listado.js';
import ControlPresupuesto from './components/ControlPresupuesto.js';


function App() {

  const [ presupuesto, updatePresupuesto ] = useState(0);
  const [ restante, updateRestante ] = useState(0);
  const [ pregunta, updatePregunta ] = useState(true);
  const [ gastos, updateGastos ] = useState([]);
  const [ gasto, updateGasto ] = useState({});
  const [ crearGasto, updateCrearGasto ] = useState(false);

  useEffect(() => {
    if(crearGasto) {
      //agrega el nuevo presupuesto
      updateGastos([
        ...gastos,
        gasto
      ])

      //resta el presupuesto actual
      const presupuestoRestante = restante - gasto.cantidad;
      updateRestante(presupuestoRestante);
      updateCrearGasto(false);
    }
  }, [gasto, gastos, restante, crearGasto]);//dependencias son todas las variables que se utilicen dentro del useEffect
  

  return (
    <div className="container">
      <header>
        <h1>Presupuesto para la semana</h1>
        <div className='contenido-principal contenido'>
          { pregunta 
          ? (
              <Pregunta 
                updatePresupuesto={ updatePresupuesto }
                updateRestante={ updateRestante } 
                updatePregunta={ updatePregunta }         
              />
            )
          : (
              <div className='row'>
                <div className='one-half column'>
                  <Formulario 
                    updateGasto={ updateGasto }
                    updateCrearGasto={ updateCrearGasto }
                  />
                </div>
                <div className='one-half column'>
                  <Listado 
                    gastos={gastos}
                  />
                  <ControlPresupuesto 
                    presupuesto={presupuesto}
                    restante={restante}                  
                  />
                </div>
              </div>
          )
          }
          

          
        </div>
      </header>
    </div>
  );
}

export default App;
