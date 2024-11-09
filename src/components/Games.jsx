import React from 'react'

function Games({ juegos }) {
    return (
        <ul>
            {juegos.length > 0 ?    
                    juegos.map((juego) => (
                        <li key={juego.id}>
                            {juego.nombre} - {juego.genero} - {juego.descripcion}
                        </li>
                    ))
                :
                <div>No hay juegos pa</div>
            }
        </ul>
    )
}

export default Games