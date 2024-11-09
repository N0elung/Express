import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "./Select";
import FormAgregar from "./formAgregar";
import Games from "./Games";

function Form() {
  const nombres = [
    { title: "Mostrar", value: "1" },
    { title: "Agregar", value: "2" },
    { title: "Editar", value: "3" },
    { title: "Borrar", value: "4" }
  ]
  const [opt, setOpt] = useState(0);

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
    <div className="w-full h-48 bg-orange-200 justify-center items-center flex flex-col gap-8">
      <Select nombre={nombres} opt={opt} setOpt={setOpt} />
      {opt == 1 ? (
        <Games juegos={juegos} />
      ) : opt == 2 ? (
        <FormAgregar
          handleSubmit={handleSubmit}
          name={name} setName={setName}
          id={id} setId={setId}
          genero={genero} setGenero={setGenero}
          description={description} setDescription={setDescription} />
      ) : opt == 3 ? (
        <div>No</div>
      ) : opt == 4 ? (
        <div>Tal vez</div>
      ) : <div>Error</div>}

    </div>
  );
}

export default Form