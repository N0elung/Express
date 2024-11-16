import React, { useEffect, useState } from 'react'
import axios from 'axios';

function FormMostrar({ juegos }) {

    let [showForm, setShowForm] = useState(false)
    const [id, setId] = useState(1);
    const [juego, setJuego] = useState([]);

    const mostrarFormulario = () => {

        setShowForm(showForm = !showForm);
        ShowData();
    }

    const ShowData = () => {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/juegos/${id}`)
                    setJuego(response.data)
                    
                    console.log(response.data)
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }, []);
    }    

    return (
        <div className='w-screen flex flex-col justify-center items-center'>


            <table className='mb-10 w-9/12'>
                <tr className='bg-orange-300'>
                    <th className='border border-black'>ID</th>
                    <th className='border border-black'>Nombre</th>
                    <th className='border border-black'>Género</th>
                    <th className='border border-black'>Descripción</th>
                    <th className='border border-black'>Acción</th>
                    <th className='border border-black'>Accion 2</th>
                </tr>
                {juegos.length > 0 ?
                    juegos.map((juego) => (
                        <tr key={juego.id} className='text-center even:bg-amber-200 bg-orange-300'>
                            <td className='border border-black p-4'>{juego.id}</td>
                            <td className='border border-black p-4'>{juego.nombre}</td>
                            <td className='border border-black p-4'>{juego.genero}</td>
                            <td className='border border-black p-4'>{juego.descripcion}</td>
                            <td className='border border-black p-4 text-center'><button className='bg-slate-300 border border-slate-100' onClick={mostrarFormulario}>Editar</button></td>
                            <td className='border border-black p-4 text-center'><button className='bg-slate-300 border border-slate-100' >Eliminar</button></td>
                        </tr>
                    ))
                    :
                    <div>No hay juegos pa</div>
                }
            </table>

            {showForm == true ? (
                <div className='flex items-center justify-center'>
                    <form>
                        <label htmlFor="id">ID:</label>
                        <input
                            type="text"
                        />
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                        />
                        <label htmlFor="Genero">Genero:</label>
                        <input
                            type="text"
                        />
                        <label htmlFor="Descripcion">Descripcion:</label>
                        <input
                            type="text"
                        />
                        <button type='submit'>Enviar</button>
                    </form>
                </div>
            ) : null}

        </div>
    )
}

export default FormMostrar