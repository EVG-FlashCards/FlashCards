/**
 * Proyecto Flash Cards 
 * @author Angel Manuel Fernandez, Juan Diego Carretero, Sergio Matamoros   Delgado, Jose Angel Fernandez
 * @license GPL v3 2021
 */
'use strict';

//Variables
let darkMode = true;
let desc = false;
let fonetica = false;
let stringJson = null;
let pDescripcion = "";



console.log("Cargando...");

//poner aquí la función de inicio onload.

//window.onload = this.inicio.bind(this);

//Ejemplo de botones
document.getElementById("desc").onclick = clicks;
document.getElementById("phonetics").onclick = clicks;
document.getElementById("btnCorrect").onclick = clicks;
document.getElementById("btnIncorrect").onclick = clicks;
document.getElementById("btnNodes").onclick = clicks;



window.onload = iniciar


function iniciar() {
    cargar()
}

function cargar(){
    let getJson = fetch ('js/preguntas.json')
    .then(respuesta => respuesta.json())
    .then(preguntas => stringJson = preguntas)

    //let parser = JSON.parse(getJson);

    //console.log(parser.Preguntas[0]);
}

/**
 * Función que recoge los clicks a los botones.
 * @param {*} event 
*/
function clicks(event) {
    console.log("Has hecho click en "+event.target.innerText);

    //Click en botón de ciclos
    if(event.target.id == "btnNodes") {
        ciclosWeb();
    }

    //Click en botón de descripción
    if(event.target.id == "desc") {

        if(!desc) {
            console.log("Click en descripción.");
            //Activamos la variable
            desc = true;
            
            //Ocultamos la imagen
            document.querySelector("div#imgEDesc > img").style.display = "none";

            //crear un p que contenga el dato del JSON.
            pDescripcion = document.createElement("p");
            pDescripcion.id = "pDescripcion";

            
            pDescripcion.appendChild(document.createTextNode(stringJson.Preguntas[0]));

            //obtener el div y metemos el parrafo dentro.
            document.getElementById("imgEDesc").appendChild(pDescripcion);
        } else {
            console.log("Click en descripcion.");
            //Reset variable
            desc = false;

            //Eliminamos el texto de la descripción
            document.getElementById("imgEDesc").removeChild(pDescripcion);

            //Volvemos a mostrar la imagen anterior.
            document.querySelector("div#imgEDesc > img").style.display = "inline";
        }
    }
    
    //Click en botón de fonetica
    if(event.target.id == "phonetics") {
        if(!fonetica) {
            console.log("Click en fonética");
            //Activamos la variable
            fonetica = true;

            //pDescripcion.appendChild(document.createTextNode(stringJson.Fonetica[0]));

            //Ocultamos la imagen
            document.querySelector("div#imgEDesc > img").style.display = "none";
        }
        else {
            console.log("Click en fonetica");
            //Reset variable
            fonetica = false;

            //Volvemos a mostrar la imagen anterior.
            document.querySelector("div#imgEDesc > img").style.display = "inline";
        }
    }
}


/**
 * Función para controlar el tema de la página en modo día ó noche.
 */

//hover
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