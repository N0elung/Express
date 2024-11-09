import React from 'react'

function FormAgregar({handleSubmit, name, setName, id, setId, genero, setGenero, description, setDescription}) {
  return (
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
  )
}

export default FormAgregar