/* COMPROBACION DE DATOS DEL FORMULARIO */


//Iniciación de variables
const botonJugar = document.getElementById("btnJugar");
const nick = document.getElementById("nick");
const email = document.getElementById("email");
const size = document.getElementById("size");
const error = document.getElementById("error");


//Funciones
function comprobarFormulario(event){
    if(nick.value.length==0){
        nick.focus();
        event.preventDefault();
        error.innerText="Es necesario escribir el nick";
        return false;

    } else if(nick.value.match(/(?<!\S)[0-9]/)){
        nick.focus();
        event.preventDefault();
        error.innerText="El nick no puede comenzar por un numero";
    }
    else if(size.value=="0"){
        size.focus();
        event.preventDefault();
        error.innerText="Es necesario seleccionar el tamaño del juego";
        return false;
    }

    return true;
}

//Inicio y carga de eventos
botonJugar.addEventListener('click', comprobarFormulario);