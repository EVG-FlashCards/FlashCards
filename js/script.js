/**
 * Proyecto Flash Cards 
 * @author Angel Manuel Fernandez, Juan Diego Carretero, Sergio Matamoros   Delgado, Jose Angel Fernandez
 * @license GPL v3 2021
 */



'use strict';

//Variables
let darkMode = true;

console.log("Cargando...");

//poner aquí la función de inicio onload.

//window.onload = this.inicio.bind(this);

//Ejemplo de botones
document.getElementById("desc").onclick = clicks;
document.getElementById("phonetics").onclick = clicks;
document.getElementById("btnCorrect").onclick = clicks;
document.getElementById("btnIncorrect").onclick = clicks;
document.getElementById("btnNodes").onclick = clicks;


/**
 * Función que recoge los clicks a los botones.
 * @param {*} event 
 */


 window.onload = iniciar


 function iniciar() {
     cargar()
 }
 
 function cargar(){
     fetch ('js/preguntas.json')
     .then(respuesta => respuesta.json())
     .then(preguntas => console.log(preguntas))
 }
 
function clicks(event) {
    console.log("Has hecho click en "+event.target.innerText);

    //console.log(event);
    if(event.target.id == "btnNodes") {
        ciclosWeb();
    }
}


/**
 * Función para controlar el tema de la página en modo día ó noche.
 */
function ciclosWeb() {
    if(darkMode) {
        document.body.style.backgroundColor = "#2e3440";
        document.querySelector("nav").style.backgroundColor = "#2e3440";
        document.querySelector("footer").style.backgroundColor = "#2e3440";

        document.getElementById("btnNodes").src = "img/soon.png";

        let l = document.getElementsByTagNameNS("http://www.w3.org/2000/svg", "path")[1].setAttribute("fill","#373d4c");
        console.log(l);
        darkMode = false;
    }
    else {
        document.body.style.backgroundColor = "white";
        document.querySelector("nav").style.backgroundColor = "#eceff4";
        document.querySelector("footer").style.backgroundColor = "#eceff4";

        document.getElementById("btnNodes").src = "img/soon.png";

        let l = document.getElementsByTagNameNS("http://www.w3.org/2000/svg", "path")[1].setAttribute("fill","white");
        darkMode = true;
    }
}