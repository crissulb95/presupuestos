import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Pregunta = ({ updatePresupuesto, updateRestante, updatePregunta }) => {

    const [cantidad, updateCantidad ] = useState(0);
    const [error, updateError ] = useState(false);

    const cambiarPresupuesto = e => { 
        updateCantidad(Number(e.target.value));
    };

    const definirPresupuesto = e => {
        e.preventDefault();
        //Validar valores
        if(cantidad < 1 || isNaN( cantidad )) {
            updateError(true);
            return;
        } 
            

        //Valores validados
        updateError(false);
        updatePresupuesto(cantidad);
        updateRestante(cantidad );
        updatePregunta(false);
    };

    return ( 
        <Fragment>
            <h2> Introduce tu presupuesto</h2>


            {error 
            ? <Error mensaje='Por favor, ingrese un presupuesto mayor a 0' />
            : null }
            
            <form
                onSubmit={definirPresupuesto}
            >

                <input 
                    type='number'
                    className='u-full-width'
                    placeholder='Presupuesto semanal'
                    onChange={cambiarPresupuesto}
                />
                <input 
                    type='submit'
                    className='button-primary u-full-width'
                    value='Definir presupuesto'
                />

            </form>
        </Fragment>
     );
}
 
Pregunta.propTypes = {
    updatePresupuesto: PropTypes.func.isRequired,
    updateRestante: PropTypes.func.isRequired,
    updatePregunta: PropTypes.func.isRequired
}
export default Pregunta;