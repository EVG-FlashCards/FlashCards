/**
 * @file Modelo de FlashCards
 * @author Angel Manuel Fernandez, Juan Diego Carretero, Sergio Matamoros   Delgado, Jose Angel Fernandez
 * @license GPL v3 2021
 * @description Proyecto Flash Cards.
 * 
 * Clase Modelo del juego.
*/
export class Modelo {
    constructor() {
        this.team1Selected = null;
        this.puntuacionT1 = 0;
        this.puntuacionT2 = 0;

        this.modoJuegoIndividual = null; //entra de controlador.

        this.totalScore = document.getElementById("totalScore");
    }

    /**
     * Función que suma o resta las puntuaciones de un equipo si se les pasa un parametro.
     * De lo contrario devuelve los puntos totales.
     * @param {Boolean} esSuma -> Indica si se va a sumar o a restar puntos
     * @returns -> Devuelve la puntuación total (si no se le pasa ningún parametro)
    */
    sumarPuntos(esSuma = null) {
        if(esSuma) {
            if(this.team1Selected) {
                this.puntuacionT1++;

                this.modoJuegoIndividual ? this.totalScore.textContent = "Puntos: "+this.puntuacionT1 : sTeam1.textContent = this.puntuacionT1;

                console.log(this.puntuacionT1);
            } 
            else { 
                this.puntuacionT2++;

                this.modoJuegoIndividual ? this.totalScore.textContent = "Puntos: "+this.puntuacionT2 : sTeam2.textContent = this.puntuacionT2;

            }
        } else if(esSuma === false) { //Revisar lo de !esSuma
            if(this.team1Selected) { 
                this.puntuacionT1 = this.puntuacionT1-1;
                this.modoJuegoIndividual ? this.totalScore.textContent = "Puntos: "+this.puntuacionT1 : sTeam1.textContent = this.puntuacionT1;

            }
            else { 
                this.puntuacionT2 = this.puntuacionT2-1;

                this.modoJuegoIndividual ? totalScore.textContent = "Puntos: "+this.puntuacionT2 : sTeam2.textContent = this.puntuacionT2;

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
     * Método que te devuelve una canción aleatoria.
     * @returns Array con el nombre del artista y nombre de cancion
    */
    cancionesAleatorias() {
        this.arraySongs = [
            ["Christina Aguilera","Beautiful"],
            ["Imagine Dragons","Radioactive"],
            ["Nathan Evans", "Wellerman (Sea Shanty)"]
        ];

        //Elijo una canción aleatoriamente
        return this.arraySongs[Math.floor(Math.random()*this.arraySongs.length)];
    }

    /**
     * API que recoge la letra de una canción especificada
     * @param {String} artist  -> Nombre del artista
     * @param {String} songTitle  -> Nombre de la canción.
    */
     async getLyrics(artist, songTitle) {
        let apiURL = "https://api.lyrics.ovh";
        const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
        const data = await response.json();
    
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    
        //Actualizo el div
        document.getElementsByClassName("auto")[0].innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
        <p>${lyrics}</p>`;

    }
}