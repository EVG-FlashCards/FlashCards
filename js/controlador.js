import { Vista } from "./vista.js";
import { Modelo } from "./modelo.js";

/**
 * @file Controlador principal de FlashCards
 * @author Angel Manuel Fernandez, Juan Diego Carretero, Sergio Matamoros   Delgado, Jose Angel Fernandez
 * @license GPL v3 2021
 * @description Proyecto Flash Cards.
 * 
 * Clase controladora principal del juego.
*/
export class Controlador {

    constructor() {

        this.vista = new Vista();
        this.modelo = new Modelo();

        this.darkMode = true;
        this.desc = false;
        this.fonetica = false;
        this.stringJson = null;
        this.pDescripcion = "";
        this.pFonetica = "";
        this.idPregunta = 20;

        this.team1Selected = null;
        this.otherGameMode = ''; //Otro modo de juego, como el modo de 'Audio', por ejemplo.

        this.totalScore = document.getElementById("totalScore");
        this.puntuacionT1 = 0;
        this.puntuacionT2 = 0;

        //Cookie
        this.fechaCaducidad = new Date();

        //Establecemos que caduque en 30 días a partir de hoy.
        this.fechaCaducidad.setDate(this.fechaCaducidad.getDate()+30);

        //Fin cookie

        this.modoJuegoIndividual = null;

        window.onload = this.iniciar.bind(this);

    }

    /**
     * Método de inicio.
    */
    iniciar() {

        //Te cambia automaticamente al modo de juego en el que el jugador esté.
        if(document.getElementById("score")) {
            //Establecemos que jugamos en teams
            this.modoJuegoIndividual = false;

            //Ocultamos temporalmente...
            document.querySelector("#panelesTeam").style.display = "none";
            document.querySelector(".chooseTeam1").style.display = "none";
            document.querySelector(".chooseTeam2").style.display = "none";
        } 
        else this.modoJuegoIndividual = true;

        //Apaño rápido...
       if(document.querySelector("[data-audio=itsAudio]")) {
           this.otherGameMode='a';
           
            this.crearSong();

       }

        //Establezco en el modelo el modo de juego en el que estamos.
        this.modelo.modoJuegoIndividual = this.modoJuegoIndividual;

        //Cargamos los datos.
        if(this.otherGameMode == '')
            this.cargar();

        //Inicio de los clicks.
        window.onclick = this.clicks.bind(this);

        if(this.obtCookie("ciclos") == "false") {
            //this.vista.darkMode = this.obtCookie("ciclos");
            this.vista.ciclosWeb();
        }
    }

    crearSong() {
        this.lyrics();

        //cargar las letras rnd

        this.arraySongs = [
            ["Christina Aguilera","Beautiful"],
            ["Imagine Dragons","Radioactive"],
            ["Nathan Evans", "Wellerman (Sea Shanty)"]
        ];

        let rndSong = this.arraySongs[Math.floor(Math.random()*this.arraySongs.length)];

        this.getLyrics(rndSong[0],rndSong[1]);

        //Cargar las canciones rnd.

        let buttonRnd = document.createElement("button");
        buttonRnd.textContent = "Generar canción";
        buttonRnd.onclick = this.crearSong.bind(this);

        //Inicio variables de bloque
        let pAudio = null;
        let audio = null;

        //Si no existe el elemento P, entonces lo creamos.
        if(!document.querySelector(".derecha p")){
            pAudio = document.createElement("p");
            pAudio.id ="pTitle";
           

            audio = document.createElement("audio");
            audio.controls = "controls autoplay";
            audio.type = 'audio/mpeg';
            

            document.getElementsByClassName("derecha")[0].appendChild(audio);
            document.getElementsByClassName("derecha")[0].appendChild(pAudio);

            document.getElementsByClassName("derecha")[0].appendChild(buttonRnd);
        }
        
        //Actualizo el nombre de la canción
        document.getElementById("pTitle").textContent = rndSong[0];
        //Actualizo la canción
        document.querySelector(".derecha audio").src = `audio/${rndSong[1]}.mp3`;
    }

    //API musica, 
    async getLyrics(artist, songTitle) {
        let apiURL = "https://api.lyrics.ovh";
        const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
        const data = await response.json();
    
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    
        //Actualizo el div
        document.getElementsByClassName("auto")[0].innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
        <p>${lyrics}</p>`;

    }

    /**
   * Devuelve el valor de una cookie si la encuentra.
   * @param {String} username 
   * @returns - Cadena
   */
    obtCookie(username) {
        let nomb = username+"=";
        //Pasa la cookie a string
        let cookieDecoded = decodeURIComponent(document.cookie);
        let array = cookieDecoded.split(";");
  
        //Recorremos el array
        for(let i=0;i<array.length;i++) {
           let c = array[i];
           //Recorre hasta que encuentre un espacio
           while(c.charAt(0) == " ") {
                 c.substring(1);//Vamos quitando los espacios si los hay.
           }
           //Comprobamos si lo ha encontrado.
           if(c.indexOf(nomb)==0){
                 return c.substring(nomb.length,c.length);
           }
        }
        //No encontró nada, así que devolvemos vacio.
        console.log("No se pudo obtener la cookie con nombre: "+nomb);
        return "";
    }

    /**
        * Animación de expansión para las letras de las canciones 
    */
    lyrics() {
        if (document.getElementsByClassName("auto")) {
            let autos = document.getElementsByClassName("auto");

            for (let i=0; i<autos.length; i++) {
                autos[i].addEventListener("mouseover", this.autoOver);
                autos[i].addEventListener("mouseout", this.autoOut);
            }
        }
    }

    /* Método que comprueba que el ratón esté dentro*/
    autoOver() {
        this.style.height = this.scrollHeight + "px";
    }
    /** Método que comprueba que el ratón se haya salido */
    autoOut() {
        this.style.height = "20px";
    }
    
    /**
     * Inicia los clicks a los botones y carga el JSON y lo añade a @var stringJson
     */
    async cargar() {
        let promesa = new Promise(function(correcto,incorrecto) { 


            fetch ('./js/preguntas.json')
            .then(respuesta => respuesta.json())
            .then(preguntas => correcto(preguntas))
            .catch(r => incorrecto("Error en: "+r));
        });

        //Carga la primera imagen
        try {
            //Espera a que los datos esten listos.
            await promesa.then(r => this.stringJson = r)
            .catch(r => console.log("Se produjo una excepción: "+r));

            document.querySelector("div#imgEDesc > img").src = this.stringJson.Preguntas[0].img;

        } catch(err) {
            console.error(err);
        }
    }
    
    /**
     * Función que recoge los clicks a los botones.
     * @param {*} event 
    */
    clicks(event) {
        //console.log("Has hecho click en "+event.target.innerText);
    
        //Click en botón de ciclos
        if(event.target.id == "btnNodes") {
            this.vista.ciclosWeb();
            //actualizo la cookie para guardar en el último modo en el que entró
            document.cookie = `ciclos=${this.vista.darkMode};expires=${this.fechaCaducidad}`;
        }

        if(event.target.classList == "chooseTeam1" || event.target.classList == "chooseTeam2") {

            //Ocultamos la flashcard y los botones de atrás.
            document.querySelector("#panelesTeam").style.display = "none";
            document.querySelector(".chooseTeam1").style.display = "none";
            document.querySelector(".chooseTeam2").style.display = "none";
    
            //Mostramos la elección de equipo
            document.getElementsByClassName("main_container")[0].style.display = "flex";
        }
    
        //Click a botón del NAV de teams
        /*if(event.target.innerText == "Teams") {
    
            //popup(); ¿¿ REUTILIZABLE ??
    
            //Carga de puntos
            document.getElementById("sTeam1").textContent = puntuacionT1;
            document.getElementById("sTeam2").textContent = puntuacionT2;
        }
        
        if(event.target.classList == "close-Button") {
            document.getElementsByClassName("popup")[0].style.display = "none";
        }*/
    
        //Click en botón de descripción
        if(event.target.id == "desc") {
            if(this.fonetica) return;
    
            if(!this.desc) {
                console.log("Click en descripción.");
                //Activamos la variable
                this.desc = true;
                
                //Ocultamos la imagen
                document.querySelector("div#imgEDesc > img").style.display = "none";
    
                //crear un p que contenga el dato del JSON.
                this.pDescripcion = document.createElement("p");
                this.pDescripcion.id = "pDescripcion";
    
                
                this.pDescripcion.appendChild(document.createTextNode(this.stringJson.Preguntas[this.idPregunta].desc));
    
                //obtener el div y metemos el parrafo dentro.
                document.getElementById("imgEDesc").appendChild(this.pDescripcion);
            } else {
                console.log("Click en descripcion.");
                //Reset variable
                this.desc = false;
    
                //Eliminamos el texto de la descripción
                document.getElementById("imgEDesc").removeChild(this.pDescripcion);
    
                //Volvemos a mostrar la imagen anterior.
                document.querySelector("div#imgEDesc > img").style.display = "inline";
            }
        }
        
        //Click en botón de fonetica
        if(event.target.id == "phonetics") {
            if(this.desc) return;

            if(!this.fonetica) {
                console.log("Click en fonética");
                //Activamos la variable
                this.fonetica = true;
    
                //crear un p que contenga el dato del JSON.
                this.pFonetica = document.createElement("p");
                this.pFonetica.id = "pFonetica";
    
                
                this.pFonetica.appendChild(document.createTextNode("e"));
    
                document.getElementById("imgEDesc").appendChild(this.pFonetica);
    
    
                //pDescripcion.appendChild(document.createTextNode(stringJson.Fonetica[0]));
    
                //Ocultamos la imagen
                document.querySelector("div#imgEDesc > img").style.display = "none";
            }
            else {
                console.log("Click en fonetica");
                //Reset variable
                this.fonetica = false;
    
                document.getElementById("imgEDesc").removeChild(this.pFonetica);
    
    
                //Volvemos a mostrar la imagen anterior.
                document.querySelector("div#imgEDesc > img").style.display = "inline";
            }
        }
    
        //Clicks en botones de correcto e incorrecto y equipos.
        if(event.target.id == "btnCorrect" || event.target.id == "btnIncorrect") 
            this.botonesCheck(event);
    
        //Clicks a equipos 1-2
        if(event.target.id == "team1") {
           //Establece que estás jugando como principal en el equipo 1
            this.team1Selected = true;
            this.modelo.team1Selected = true;

            //Ocultamos los equipos.
            document.getElementsByClassName("main_container")[0].style.display = "none";

            //Mostramos la flashcard
            document.querySelector("#panelesTeam").style.display = "block";

            //Mostramos la elección de equipo
            document.querySelector(".chooseTeam1").style.display = "block";
            document.querySelector(".chooseTeam2").style.display = "block";

        }
    
        if(event.target.id == "team2") {
            //Establece que estás jugando como principal en el equipo 2
            this.team1Selected = false;
            this.modelo.team1Selected = false;

            //Ocultamos los equipos.
            document.getElementsByClassName("main_container")[0].style.display = "none";

            //Mostramos la flashcard
            document.querySelector("#panelesTeam").style.display = "block";

            //Mostramos la elección de equipo
            document.querySelector(".chooseTeam1").style.display = "block";
            document.querySelector(".chooseTeam2").style.display = "block";

            //totalScore.textContent = `Puntos: ${puntuacionT2}`;
            
        }
    }
    
    /**
     * Función que controla los clicks en los botones de correcto/incorrecto
     * @param {*} event 
     */
    botonesCheck(event) {
    
        //Si no has seleccionado ningún equipo...
        if(this.team1Selected == null && !this.modoJuegoIndividual) {
            alert("[ERROR] Selecciona un equipo primero");
        } else 
        {
            //Click en botón de correcto
            if(event.target.id == "btnCorrect" ) {
                console.log("Click en Correcto");
    
                if(this.stringJson.Preguntas[this.idPregunta] == undefined) return; //REVISAR *******

                //Pasamos a la siguiente pregunta
                this.idPregunta++;

                this.modelo.sumarPuntos(true);

                //Actualizamos los puntos totales
                //totalScore.textContent = `Puntos: ${sumarPuntos()}`;

                //console.log("Puntos:"+puntuacionT1 + " " + puntuacionT2);

                //Mostramos la siguiente imagen                
                document.querySelector("div#imgEDesc > img").src = this.stringJson.Preguntas[this.idPregunta].img;
            }
    
            //Click en botón de incorrecto
            if(event.target.id == "btnIncorrect") {
                console.log("Click en Incorrecto");
            
                if(this.stringJson.Preguntas[this.idPregunta] == undefined) return;
    
                //Pasamos a la siguiente pregunta
                this.idPregunta++;
    
                
                this.modelo.sumarPuntos(false);
    
                //Actualizamos los puntos totales
                //totalScore.textContent = `Puntos: ${sumarPuntos()}`;
    
                //Ocultamos la imagen
                document.querySelector("div#imgEDesc > img").src = this.stringJson.Preguntas[this.idPregunta].img;
            }
        }
    }
}

var app = new Controlador();