import React from 'react'

function Select({ }) {
    return (
        <div>
            <select name="Select" id="opciones">
            <option value="volvo">Buscar</option>
            <option value="saab">Agregar</option>
            <option value="opel">Editar</option>
            <option value="audi">Borrar</option>
        </select>
        </div>
    )
}

export default Select