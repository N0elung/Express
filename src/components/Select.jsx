import React from 'react'

function Select({nombre, opt, setOpt}) {
    return (
        <div>
            <select name="Select" value={opt} onChange={(e) => setOpt(e.target.value)}>
            <option selected value="0" disabled>Seleccionar opciones</option>
                {nombre.map((nombres) => (
                    <option key={nombres.value} value={nombres.value}>{nombres.title}</option>
                ))} 
            </select>
        </div>
    )
}

export default Select