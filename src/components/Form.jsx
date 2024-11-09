import React, { useEffect, useState } from "react";
import axios from "axios";

function Form() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState("");
    const [genero, setGenero] = useState("");
  
    const [juegos, setJuegos] = useState([]);
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {
        id: id,
        nombre: name,
        genero: genero,
        descripcion: description,
      };
      try {
        const response = await axios.post("http://localhost:3000/juegos", data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:3000/juegos");
          setJuegos(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    });
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            name="id"
          />
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="nombre"
          />
          <label htmlFor="genero">Genero:</label>
          <input
            type="text"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            name="genero"
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
          />
          <button type="submit">enviar</button>
        </form>
  
        {
          <ul>
            {juegos.map((juego) => (
              <li key={juego.id}>
                {juego.nombre} - {juego.genero} - {juego.descripcion}
              </li>
            ))}
          </ul>
        }
      </div>
    );
  }

export default Form