/**
 * JS inicio para el formulario de entrada 
 * @author Samuel Pampillón <samuelpampillonroa@gmail.com>
 * {@link https://github.com/samuelpampi/MasterDots GitHub}
 */

//Variables
var botonJugar;
var nick;
var email;
var size;
var error;
var avatarItems;
var avatarImg; //Avatar que esta en el drag
var selectedAvatar;

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

    datosUsuario(nick, email, size, selectedAvatar);
    return true;
}

/** Inicializa las variables y comprobaciones iniciales del documento, una vez esté cargado */
function initDocument(){
    //Inicializamos las variables
    botonJugar = document.getElementById("btnJugar");
    nick = document.getElementById("nick");
    email = document.getElementById("email");
    size = document.getElementById("size");
    error = document.getElementById("error");
    avatarItems = document.getElementsByClassName("avatarImgItem"); //Imagenes de avatares que selecciona el usuario
    selectedAvatar = document.getElementById("avatarImg");

    //Comprobar si existe error en la sesion
    if(sessionStorage.getItem('error')){
        error.innerText = sessionStorage.getItem('error');
        sessionStorage.removeItem('error');
    }

    botonJugar.addEventListener('click', comprobarFormulario);

    //Eventos Drag & Drop
    for(let item of avatarItems){
        item.addEventListener('dragstart', event => {
            avatarImg = event.target.src; //Asignamos a avatarImg la fuente del avatar que estamos moviendo
        });
    }
    
    selectedAvatar.addEventListener('dragover', event => {
        event.preventDefault();
    });

    selectedAvatar.addEventListener('drop', event => {
        selectedAvatar.src = avatarImg;
    });
}

//Inicio y carga de eventos
document.addEventListener('DOMContentLoaded', initDocument);
//Cargar geolocalizacion
getGeolocalizacion();