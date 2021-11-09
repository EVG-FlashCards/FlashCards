/**
 * @author Angel Manuel Fernandez, Juan Diego Carretero, Sergio Matamoros   Delgado, Jose Angel Fernandez
 * @license GPL v3 2021
 */

'use strict'

window.onload = iniciar


function iniciar() {
    cargar()
}

function cargar(){
    fetch ('js/preguntas.json')
    .then(respuesta => respuesta.json())
    .then(preguntas => console.log(preguntas))
}
