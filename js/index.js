/* eslint-disable import/extensions */
import { getPersonajes, mataPersonajes } from "./funciones.js";

const anyadirEventos = () => {
  const botonCargar = document.querySelector(".cargar-personajes");
  const botonMatarFamilia = document.querySelector(".matar-familia");

  botonCargar.addEventListener("click", () => {
    cargarPersonajes();
  });
  botonMatarFamilia.addEventListener("click", () => {});
};

const cargarPersonajes = async () => {
  const personajes = await getPersonajes();
  const padrePersonajes = document.querySelector(".personajes");
  const personajeElementoCopia = padrePersonajes
    .querySelector(".personaje-dummy")
    .cloneNode(true);
  personajeElementoCopia.classList.remove("personaje-dummy");

  for (const { nombre, familia, estado } of personajes) {
    const personajeElemento = personajeElementoCopia.cloneNode(true);
    personajeElemento.querySelector(
      ".personajeNombre"
    ).textContent = `${nombre} ${familia}`;

    personajeElemento.querySelector(".estado").textContent = estado
      ? "muerto"
      : "vivo";

    padrePersonajes.append(personajeElemento);
  }
};

(() => {
  anyadirEventos();
})();
