const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
// Middleware para manejar JSON en el cuerpo de las peticiones
app.use(express.json());

app.use(cors());
// Datos de ejemplo (almacenamiento en memoria)
let juegos = [];

// Leer todos los juegos (GET /juegos)
app.get("/juegos", (req, res) => {
  res.json(juegos);
});

// Crear un nuevo juego (POST /juegos)
app.post("/juegos", (req, res) => {
  const { id, nombre, genero, descripcion } = req.body;
  const nuevoJuego = { id, nombre, genero, descripcion };
  juegos.push(nuevoJuego);
  res.status(201).json({ mensaje: "Juego creado", juego: nuevoJuego });
});

// Leer un juego por ID (GET /juegos/:id)
app.get("/juegos/:id", (req, res) => {
  const { id } = req.params;
  const juego = juegos.find((j) => j.id == id);
  if (juego) {
    res.json(juego);
  } else {
    res.status(404).json({ mensaje: "Juego no encontrado" });
  }
});

// Actualizar un juego por ID (PUT /juegos/:id)
app.put("/juegos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, genero, descripcion } = req.body;
  const juego = juegos.find((j) => j.id == id);
  if (juego) {
    juego.nombre = nombre || juego.nombre;
    juego.genero = genero || juego.genero;
    juego.descripcion = descripcion || juego.descripcion;
    res.json({ mensaje: "Juego actualizado", juego });
  } else {
    res.status(404).json({ mensaje: "Juego no encontrado" });
  }
});

// Eliminar un juego por ID (DELETE /juegos/:id)
app.delete("/juegos/:id", (req, res) => {
  const { id } = req.params;
  const index = juegos.findIndex((j) => j.id == id);
  if (index !== -1) {
    const juegoEliminado = juegos.splice(index, 1);
    res.json({ mensaje: "Juego eliminado", juego: juegoEliminado });
  } else {
    res.status(404).json({ mensaje: "Juego no encontrado" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
