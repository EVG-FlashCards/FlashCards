/**
 * @file Controlador principal de FlashCards
 * @author Angel Manuel Fernandez, Juan Diego Carretero, Sergio Matamoros   Delgado, Jose Angel Fernandez
 * @license GPL v3 2021
 * @description Proyecto Flash Cards.
 */
'use strict';

//Variables
let darkMode = true;
let desc = false;
let fonetica = false;
let stringJson = null;
let pDescripcion = "";
let pFonetica = "";
let idPregunta = 0;

let team1Selected = null;

let totalScore = document.getElementById("totalScore");
let puntuacionT1 = 0;
let puntuacionT2 = 0;




//Al hacer click en Teams, se abrirá un pop up con la puntuación de ambos equipos y permitiendo cambiar el nombre de ambos.


console.log("Cargando...");

//poner aquí la función de inicio onload.

//window.onload = this.iniciar.bind(this);

window.onload = iniciar

/**
 * Función que se inicia al cargar completamente la página.
 */
function iniciar() {
    cargar();

    //Tiempo de espera hasta que se carguen los datos del JSON.
    setTimeout(() => {
        //Carga la imagen principal.
        document.querySelector("div#imgEDesc > img").src = stringJson.Preguntas[0].img;
    }, 200);
}

/**
 * Inicia los clicks a los botones y carga el JSON y lo añade a @var stringJson
 */
function cargar() {
    fetch ('js/preguntas.json')
    .then(respuesta => respuesta.json())
    .then(preguntas => stringJson = preguntas)

    //CAMBIAR LOS CLICKS.
    document.getElementById("desc").onclick = clicks;
    document.getElementById("phonetics").onclick = clicks;
    document.getElementById("btnCorrect").onclick = clicks;
    document.getElementById("btnIncorrect").onclick = clicks;
    document.getElementById("btnNodes").onclick = clicks;
    document.getElementById("team1").onclick = clicks;
    document.getElementById("team2").onclick = clicks;

    //Click en el botón de NAV de Teams
    document.querySelectorAll("nav a")[2].onclick = clicks;
    document.querySelector(".close-Button").onclick = clicks;


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

    //Click a botón del NAV de teams
    if(event.target.innerText == "Teams") {

        popup();

        //Carga de puntos
        document.getElementById("sTeam1").textContent = puntuacionT1;
        document.getElementById("sTeam2").textContent = puntuacionT2;
    }
    
    if(event.target.classList == "close-Button") {
        document.getElementsByClassName("popup")[0].style.display = "none";
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

            
            pDescripcion.appendChild(document.createTextNode(stringJson.Preguntas[idPregunta].desc));

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

            //crear un p que contenga el dato del JSON.
            pFonetica = document.createElement("p");
            pFonetica.id = "pFonetica";

            
            pFonetica.appendChild(document.createTextNode("e"));

            document.getElementById("imgEDesc").appendChild(pFonetica);


            //pDescripcion.appendChild(document.createTextNode(stringJson.Fonetica[0]));

            //Ocultamos la imagen
            document.querySelector("div#imgEDesc > img").style.display = "none";
        }
        else {
            console.log("Click en fonetica");
            //Reset variable
            fonetica = false;

            document.getElementById("imgEDesc").removeChild(pFonetica);


            //Volvemos a mostrar la imagen anterior.
            document.querySelector("div#imgEDesc > img").style.display = "inline";
        }
    }

    //Clicks en botones de correcto e incorrecto y equipos.
    if(event.target.id == "btnCorrect" || event.target.id == "btnIncorrect") 
        botonesCheck(event);

    //Clicks a equipos 1-2
    if(event.target.id == "team1") {
        //Establece que estás jugando como principal en el equipo 1
        team1Selected = true;
        team1.classList.add('active');
        team2.classList.remove('active');

        totalScore.textContent = `Puntos: ${puntuacionT1}`;


    }

    if(event.target.id == "team2") {
        //Establece que estás jugando como principal en el equipo 2
        team1Selected = false;
        team1.classList.remove('active');
        team2.classList.add('active');

        totalScore.textContent = `Puntos: ${puntuacionT2}`;
        
    }
}

/**
 * Función que controla los clicks en los botones de correcto/incorrecto
 * @param {*} event 
 */
function botonesCheck(event) {

    //Si no has seleccionado ningún equipo...
    if(team1Selected == null) {
        alert("[ERROR] Selecciona un equipo primero");
    } else 
    {
        //Click en botón de correcto
        if(event.target.id == "btnCorrect" ) {
            console.log("Click en Correcto");

            if(stringJson.Preguntas[idPregunta] == undefined) return;

            //Pasamos a la siguiente pregunta
            idPregunta++;

            sumarPuntos(true);

            //Actualizamos los puntos totales
            totalScore.textContent = `Puntos: ${sumarPuntos()}`;

            //console.log("Puntos:"+puntuacionT1 + " " + puntuacionT2);

            //Mostramos la siguiente imagen                
            document.querySelector("div#imgEDesc > img").src = stringJson.Preguntas[idPregunta].img;
        }

        //Click en botón de incorrecto
        if(event.target.id == "btnIncorrect") {
            console.log("Click en Incorrecto");
            
            if(stringJson.Preguntas[idPregunta] == undefined) return;

            //Pasamos a la siguiente pregunta
            idPregunta++;

            
            sumarPuntos(false);

            //Actualizamos los puntos totales
            totalScore.textContent = `Puntos: ${sumarPuntos()}`;

            //Ocultamos la imagen
            document.querySelector("div#imgEDesc > img").src = stringJson.Preguntas[idPregunta].img;
        }
    }
}

/**
 * Función que suma o resta las puntuaciones de un equipo si se les pasa un parametro.
 * De lo contrario devuelve los puntos totales.
 * @param {Boolean} esSuma -> Indica si se va a sumar o a restar puntos
 * @returns -> Devuelve la puntuación total (si no se le pasa ningún parametro)
 */
function sumarPuntos(esSuma = null) {
    if(esSuma) {
        if(team1Selected) {
            puntuacionT1++;
            console.log(puntuacionT1);
        } 
        else { 
            puntuacionT2++;
        }
    } else if(esSuma === false) { //Revisar lo de !esSuma
        if(team1Selected) { 
            puntuacionT1 = puntuacionT1-1;
        }
        else { 
            puntuacionT2 = puntuacionT2-1;
        }
    }

    if(esSuma == null) {
        if(team1Selected)
            return puntuacionT1;
        return puntuacionT2;
        /*console.log("Entra: "+Math.abs(puntuacionT1+puntuacionT2));
        //Devuelve la puntuación total.
        return puntuacionT1+puntuacionT2;*/
    }
}

/**
 * Crea un 'pop up' y comprueba si existe ya uno, de existir unicamente lo muestra 
 */
function popup() {

    //Si score existe no lo volvemos a crear, solo mostramos
    if(document.getElementById("score"))
        document.getElementsByClassName("popup")[0].style.display = "block";
    else{

        //Mostramos el pop up
        document.getElementsByClassName("popup")[0].style.display = "block";

        let divScore = document.createElement("div");
        divScore.id = "score";

        //Local
        let equipoLocal = document.createElement("div");
        equipoLocal.id="local";
        equipoLocal.textContent ="Equipo local";
        let scoreTeam1 = document.createElement("span");
        scoreTeam1.id = "sTeam1";
        scoreTeam1.textContent = "0";

        equipoLocal.appendChild(scoreTeam1);

        divScore.appendChild(equipoLocal);

        //Versus

        let versus = document.createElement("span");
        versus.id ="VS";
        versus.textContent = "VS";

        divScore.appendChild(versus);
        
        //Visitantes
        let equipoVisitante = document.createElement("div");
        equipoVisitante.id="visitante";
        equipoVisitante.textContent ="Equipo visitante";
        let scoreTeam2 = document.createElement("span");
        scoreTeam2.id = "sTeam2"; //Puntuación aquí
        scoreTeam2.textContent = "0";

        equipoVisitante.appendChild(scoreTeam2);


        divScore.appendChild(equipoVisitante);


        document.getElementsByClassName("popupTexto")[0].appendChild(divScore);
    }
}


/**
 * Función para controlar el tema de la página en modo día ó noche.
*/
function ciclosWeb() {
    if(darkMode) {

        document.body.style.backgroundColor = "#2e3440";
        document.querySelector("nav").style.backgroundColor = "#2e3440";

        for(let i=0;i<document.querySelectorAll("nav a").length;i++)
            document.querySelectorAll("nav a")[i].style.color = "white";

        document.querySelector("footer").style.backgroundColor = "#2e3440";
        document.querySelector("footer").style.color = "white";

        document.getElementById("btnNodes").src = "img/sun.png";

        darkMode = false;
    }
    else {
        document.body.style.backgroundColor = "white";
        document.querySelector("nav").style.backgroundColor = "#eceff4";

        for(let i=0;i<document.querySelectorAll("nav a").length;i++)
            document.querySelectorAll("nav a")[i].style.color = "#4c566a";

        document.querySelector("footer").style.backgroundColor = "#eceff4";
        document.querySelector("footer").style.color = "black";


        document.getElementById("btnNodes").src = "img/moon2.png";

        darkMode = true;
    }
}