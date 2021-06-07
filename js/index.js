/* eslint-disable import/extensions */
import { getPersonajes, mataPersonajes } from "./funciones.js";

let personajes = [];

const anyadirEventos = () => {
  const botonCargar = document.querySelector(".cargar-personajes");
  const botonMatarFamilia = document.querySelector(".matar-familia");

  botonCargar.addEventListener("click", async () => {
    personajes = await getPersonajes();
    borrarPersonajes();
    cargarPersonajes();
  });
  botonMatarFamilia.addEventListener("click", () => {
    mataFamilia();
  });
};

const cargarPersonajes = () => {
  const padrePersonajes = document.querySelector(".personajes");
  const personajeElementoCopia = padrePersonajes
    .querySelector(".personaje-dummy")
    .cloneNode(true);
  personajeElementoCopia.classList.remove("personaje-dummy");

  for (const { nombre, familia, vivo } of personajes) {
    const personajeElemento = personajeElementoCopia.cloneNode(true);
    personajeElemento.querySelector(
      ".personajeNombre"
    ).textContent = `${nombre} ${familia}`;

    personajeElemento.querySelector(".estado").textContent = vivo
      ? "vivo"
      : "muerto";

    padrePersonajes.append(personajeElemento);
  }
};

const borrarPersonajes = () => {
  const padrePersonajes = document.querySelector(".personajes");
  while (padrePersonajes.lastChild && padrePersonajes.childElementCount > 1) {
    const hijoElemento = padrePersonajes.lastChild;
    padrePersonajes.removeChild(hijoElemento);
  }
};

const mataFamilia = async () => {
  const familia = document.querySelector(".familia").value;
  try {
    personajes = await mataPersonajes(familia);
    borrarPersonajes();
    cargarPersonajes();
  } catch (error) {
    const elementoError = document.querySelector(".mensaje");

    elementoError.textContent = error.message;
  }
};

anyadirEventos();
