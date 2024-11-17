/**
 * JS para la gestion de los datos del usuario
 * @author Samuel Pampillón <samuelpampillonroa@gmail.com>
 * {@link https://github.com/samuelpampi/MasterDots GitHub}
 */

var nickSession;
var emailSession;
var sizeSession;
var geolocationTxt;


/**
 * Guarda los datos del usuario en Session Storage
 *
 * @param {HTMLElement} nick
 * @param {HTMLElement} email
 * @param {HTMLElement} size
 */
function datosUsuario(nick, email, size){
    sessionStorage.setItem('nick', nick.value);
    sessionStorage.setItem('email', email.value);
    sessionStorage.setItem('size', size.value);
    sessionStorage.setItem('geolocation', geolocationTxt);
}


/** Recupera las variables de session */
function getDatosUsuario(){
    nickSession = sessionStorage.getItem('nick');
    emailSession = sessionStorage.getItem('nick');
    sizeSession = sessionStorage.getItem('nick');
}

/**
 * Se ejecuta para comprobar que el usuario ha cubierto el formulario, necesitamos minimo un nick
 *
 * @returns {boolean}
 */
function comprobarDatosUsuario(){
    if(nickSession == null){
        sessionStorage.setItem('error', 'Debes cubrir el formulario de entrada');
        return false;
    }
    return true;
}


/**
 * Guarda en local storage un historico con todos los accesos que se hacen al juego, almacenando el nick y el timestamp
 *
 * @param {string} nickSession
 */
function historicoUsuarios(nickSession){
    let usuariosStorage = localStorage.getItem('historico'); //Cogemos los datos del historico anterior
    let historico;
    
    //Si no existe se inicializa como una lista si existe lo pasamos de string a json para operar con el
    if(usuariosStorage == null){
        historico = [];
    } else{
        historico = JSON.parse(usuariosStorage);
    }

    let registroUsuario = {
        user: nickSession,
        date: Date.now()
    }

    historico.push(registroUsuario); //Añadimos el nuevo registro a la lista de historicos

    localStorage.setItem('historico', JSON.stringify(historico));
}


/** Solicita la geolocalizacion del usuario */
function getGeolocalizacion(){
    //Debemos asegurarnos de que la geolocalizacion está disponible
    if(!navigator.geolocation){
        geolocationTxt = "Geolocalización no disponible";
    } else{
        navigator.geolocation.getCurrentPosition(
            //Callback success
            (position) => {
                geolocationTxt = `Latitud: ${position.coords.latitude}, Longitud: ${position.coords.longitude}`;
            },
            //Callback error
            () => {geolocationTxt = "No se ha podido obtener la ubicacion";}
        );
    }
}