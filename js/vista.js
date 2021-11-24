export class Vista {
   constructor() {
      this.darkMode = true;
   } 

   
   /**
    * Método que crea un 'pop up' y comprueba si existe ya uno, de existir unicamente lo muestra 
    * == Método OBSOLETO == (¿¿ REUTILIZABLE ??)
    */
   popup() {

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
    * Método para controlar el tema de la página en modo día ó noche.
   */
   ciclosWeb() {
      if(this.darkMode) {

         document.body.style.backgroundColor = "#2e3440";
         document.querySelector("nav").style.backgroundColor = "#2e3440";

         for(let i=0;i<document.querySelectorAll("nav a").length;i++)
            document.querySelectorAll("nav a")[i].style.color = "white";

         document.querySelector("footer").style.backgroundColor = "#2e3440";
         document.querySelector("footer").style.color = "white";

         document.getElementById("btnNodes").src = "img/sun.png";

         this.darkMode = false;
      }
      else {
         document.body.style.backgroundColor = "white";
         document.querySelector("nav").style.backgroundColor = "#eceff4";

         for(let i=0;i<document.querySelectorAll("nav a").length;i++)
            document.querySelectorAll("nav a")[i].style.color = "#4c566a";

         document.querySelector("footer").style.backgroundColor = "#eceff4";
         document.querySelector("footer").style.color = "black";


         document.getElementById("btnNodes").src = "img/moon2.png";

         this.darkMode = true;
      }
   }
}