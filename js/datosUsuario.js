/* JS PAra ka gestion de los datos del usuario */

var nickSession;
var emailSession;
var sizeSession;

function datosUsuario(nick){
    sessionStorage.setItem('nick', nick.value);
    sessionStorage.setItem('email', email.value);
    sessionStorage.setItem('size', size.value);
}

function getDatosUsuario(){
    nickSession = sessionStorage.getItem('nick');
    emailSession = sessionStorage.getItem('nick');
    sizeSession = sessionStorage.getItem('nick');
}

function comprobarDatosUsuario(){
    if(nickSession == null){
        sessionStorage.setItem('error', 'Debes cubrir el formulario de entrada');
        return false;
    }
    return true;
}

//Local Storage del historico de usauarios
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