/**
 * Proyecto Flash Cards
 * Licencia GPL v3
 */

'use strict';

console.log("Cargando...");

//Ejemplo de botones
document.getElementById("desc").onclick = clicks;
document.getElementById("phonetics").onclick = clicks;
document.getElementById("btnCorrect").onclick = clicks;
document.getElementById("btnIncorrect").onclick = clicks;


/**
 * Función que recoge los clicks a los botones.
 * @param {*} event 
 */
function clicks(event) {
    console.log("Has hecho click en "+event.target.innerText);
}