import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';
import shortid from 'shortid'

const Formulario = ({ updateGasto, updateCrearGasto }) => {
    const [ nombre, updateNombre ] = useState('');
    const [ cantidad, updateCantidad ] = useState(0);
    const [ error, updateError ] = useState(false);

    const agregarGasto = e => {
        e.preventDefault();
        //validar
        if( cantidad < 1 || isNaN(cantidad) || nombre.trim() === '' ) {
            updateError(true);
            return;
        }

        updateError(false);
        //construir el gasto
        const gasto = { nombre, cantidad, id: shortid.generate() }

        //pasar el gasto al componente principal 

        updateGasto(gasto);
        updateCrearGasto(true);

        //resetear el FORMULARIO

        updateNombre('');
        updateCantidad(0); 
    }

    return ( 
        <form
            onSubmit={ agregarGasto }
        >
            <h2>Agrega tus gastos aquí</h2>

            {error 
            ?   <Error 
                    mensaje='Defina la cantidad del gasto'
                />
            : null}

            <div className='campo'>
                <label htmlFor='gastos-nombre'>Tipo de gasto</label>
                <input 
                    type='text' 
                    className='u-full-width' 
                    placeholder='Transporte, comida, servicios...' 
                    id='gastos-nombre' 
                    value={nombre}
                    onChange={e => updateNombre(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label htmlFor='gastos-cantidad'>Cantidad del gasto</label>
                <input 
                        type='number' 
                        placeholder='Cantidad' 
                    className='u-full-width' 
                    id='gastos-cantidad' 
                    value={cantidad}
                    onChange={ e => updateCantidad(parseInt(e.target.value, 10))}
                />
            </div>

            <input 
                type='submit'
                className='button-primary u-full-width'
                value='Agregar gasto'
            />
        </form>
     );
}


Formulario.propTypes = {
    updateGasto: PropTypes.func.isRequired,
    updateCrearGasto: PropTypes.func.isRequired
}
 
export default Formulario;