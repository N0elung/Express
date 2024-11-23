import React, { useEffect, useState } from "react";
import axios from "axios";

function FormMostrar() {
  const [juegos, setJuegos] = useState([]); // Lista de juegos.
  const [showForm, setShowForm] = useState(false); // Controla si se muestra el formulario.
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null); // Datos del juego seleccionado.

  // Función para cargar la lista de juegos desde el servidor.
  const cargarJuegos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/juegos");
      setJuegos(response.data);
    } catch (error) {
      console.error("Error al cargar los juegos:", error);
    }
  };

  // useEffect para cargar los juegos al montar el componente.
  useEffect(() => {
    cargarJuegos();
  }, []);

  // Maneja la selección de un juego para edición.
  const seleccionarJuego = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/juegos/${id}`);
      setJuegoSeleccionado(response.data);
      setShowForm(true);
    } catch (error) {
      console.error("Error al obtener el juego:", error);
    }
  };

  // Maneja los cambios en los inputs del formulario.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJuegoSeleccionado((prev) => ({ ...prev, [name]: value }));
  };

  // Envía los datos actualizados al servidor y recarga la lista de juegos.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!juegoSeleccionado) return;

    try {
      await axios.put(
        `http://localhost:3000/juegos/${juegoSeleccionado.id}`,
        juegoSeleccionado
      );
      setShowForm(false); // Cierra el formulario.
      cargarJuegos(); // Recarga la lista de juegos.
    } catch (error) {
      console.error("Error al actualizar el juego:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <table className="w-9/12 mb-10">
        <thead>
          <tr className="bg-orange-300">
            <th className="border border-black">ID</th>
            <th className="border border-black">Nombre</th>
            <th className="border border-black">Género</th>
            <th className="border border-black">Descripción</th>
            <th className="border border-black">Acción</th>
          </tr>
        </thead>
        <tbody>
          {juegos.length > 0 ? (
            juegos.map((juego) => (
              <tr
                key={juego.id}
                className="text-center bg-orange-300 even:bg-amber-200"
              >
                <td className="p-4 border border-black">{juego.id}</td>
                <td className="p-4 border border-black">{juego.nombre}</td>
                <td className="p-4 border border-black">{juego.genero}</td>
                <td className="p-4 border border-black">{juego.descripcion}</td>
                <td className="p-4 border border-black">
                  <button
                    className="border bg-slate-300 border-slate-100"
                    onClick={() => seleccionarJuego(juego.id)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No hay juegos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showForm && juegoSeleccionado && (
        <div className="flex items-center justify-center">
          <form
            className="flex flex-col gap-4 p-4 bg-gray-100 border rounded"
            onSubmit={handleSubmit}
          >
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              name="id"
              value={juegoSeleccionado.id}
              readOnly
              className="p-2 border"
            />

            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={juegoSeleccionado.nombre}
              onChange={handleInputChange}
              className="p-2 border"
            />

            <label htmlFor="genero">Género:</label>
            <input
              type="text"
              name="genero"
              value={juegoSeleccionado.genero}
              onChange={handleInputChange}
              className="p-2 border"
            />

            <label htmlFor="descripcion">Descripción:</label>
            <input
              type="text"
              name="descripcion"
              value={juegoSeleccionado.descripcion}
              onChange={handleInputChange}
              className="p-2 border"
            />

            <button
              type="submit"
              className="p-2 text-white bg-blue-500 rounded"
            >
              Actualizar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default FormMostrar;
