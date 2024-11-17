/**
 * JS inicio para el formulario de entrada 
 * @author Samuel Pampillón <samuelpampillonroa@gmail.com>
 * {@link https://github.com/samuelpampi/MasterDots GitHub}
 */

//Iniciación de variables
const botonJugar = document.getElementById("btnJugar");
const nick = document.getElementById("nick");
const email = document.getElementById("email");
const size = document.getElementById("size");
const error = document.getElementById("error");

//Comprobar si existe error en la sesion
if(sessionStorage.getItem('error')){
    error.innerText = sessionStorage.getItem('error');
    sessionStorage.removeItem('error');
}

//Funciones
/**
 * Comprueba que los datos del formulario sean validos y muestra un error si no lo son, si pasa con exito los guarda
 *
 * @param {*} event
 * @returns {boolean}
 */
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

    datosUsuario(nick, email, size);
    return true;
}

//Inicio y carga de eventos
botonJugar.addEventListener('click', comprobarFormulario);
//Cargar geolocalizacion
getGeolocalizacion();