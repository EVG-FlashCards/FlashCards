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

                this.modoJuegoIndividual ? this.totalScore.textContent = this.puntuacionT1 : sTeam1.textContent = this.puntuacionT1;

                console.log(puntuacionT1);
            } 
            else { 
                this.puntuacionT2++;

                this.modoJuegoIndividual ? this.totalScore.textContent = this.puntuacionT2 : sTeam2.textContent = this.puntuacionT2;

            }
        } else if(esSuma === false) { //Revisar lo de !esSuma
            if(this.team1Selected) { 
                this.puntuacionT1 = this.puntuacionT1-1;
                this.modoJuegoIndividual ? this.totalScore.textContent = this.puntuacionT1 : sTeam1.textContent = this.puntuacionT1;

            }
            else { 
                this.puntuacionT2 = this.puntuacionT2-1;

                this.modoJuegoIndividual ? totalScore.textContent = this.puntuacionT2 : sTeam2.textContent = this.puntuacionT2;

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
}