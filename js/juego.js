/**
 * JS del funcionamiento del juego
 * @author Samuel Pampillón <samuelpampillonroa@gmail.com>
 * {@link https://github.com/samuelpampi/MasterDots GitHub}
 */

//VARIABLES GLOBALES
var iniciarMarcado = false;
const colores=["rojo", "verde", "amarillo", "azul"];
var adyacentes=[];
var tamPanel;
var colorMarcado;
var puntuacion = 1;
var itemsMarcados = [];

/**
 * Devuelve un numero entre [0, max)
 *
 * @param {*} max
 * @returns {*}
 */
function getRandomColor(){
    let index = Math.floor(Math.random() * colores.length);
    return colores[index];
}

/** Rellena el formualrio con los datos que habia introducido el usuario */
function rellenarFormularioUsuario(){
    document.getElementById("nick").value = nickSession;
    document.getElementById("avatarImg").src = avatarSession;
    tamPanel=parseInt(sizeSession);
}

/** Crea el grid del tamaño seleccionado por el usuario y lo colore de forma aleatoria */
function pintarPanelJuego(){
    let grid_juego = document.getElementById("juego");
    let color = getRandomColor(); 

    //Establecemos el tamaño del grid
    grid_juego.style.gridTemplateColumns=`repeat(${sizeSession}, 1fr)`;
    grid_juego.style.gridTemplateRows=`repeat(${sizeSession}, 1fr)`;

    //Rellenamos el grid con los elementos
    for(let index=0; index<(tamPanel*tamPanel); index++){
        if(index%2==0) color = getRandomColor();

        let itemHtml = `<div class="containerItem"><div id="${index}" class="item ${color}"></div></div>`;

        grid_juego.insertAdjacentHTML("beforeend", itemHtml);
    }

}


/** Programa los eventos sobre los elementos del documento */
function programarEventos(){
    const items = document.getElementsByClassName("item");
    for(let item of items){
        item.addEventListener('mousedown', event => comenzarMarcar(event));
        item.addEventListener('mouseover', event => continuarMarcando(event));
    }

    document.addEventListener('mouseup', event => finalizarMarcado(event));
}


//FUNCIONES DEL JUEGO


/**
 * Inicia el marcado de los dots
 *
 * @param {*} event
 */
function comenzarMarcar(event){
    console.log("Se ha pinchado un circulo");
    if(!iniciarMarcado) iniciarMarcado = true;
    let item = event.target;
    let containerItem = item.parentElement;

    if (item.classList.contains('rojo')){
        containerItem.classList.add('rojo');
        colorMarcado = "rojo";
    }
    else if (item.classList.contains('azul')){
        containerItem.classList.add('azul');
        colorMarcado = "azul";
    } 
    else if (item.classList.contains('amarillo')){
        containerItem.classList.add('amarillo');
        colorMarcado = "amarillo";
    }
     
    else if (item.classList.contains('verde')){
        containerItem.classList.add('verde');
        colorMarcado = "verde";
    } 

    itemsMarcados.push(parseInt(item.id));
    calcularAdyacentes(parseInt(parseInt(item.id)));
}

/**
 * Coninua marcando los dots
 *
 * @param {*} event
 */
function continuarMarcando(event){
    item = event.target;
    //Si se puede marcar y es adyacente comprobamos el color
    if(iniciarMarcado && adyacentes.includes(parseInt(item.id))) {

        //Si el color es el mismo marcamos
        if(item.classList.contains(colorMarcado)){
            puntuacion += 1;
            comenzarMarcar(event);
        }
    }
}


/**
 * Finaliza el marcado de los dots
 *
 * @param {*} event
 */
function finalizarMarcado(event){
    let currentPuntuacion = document.getElementById("puntuacion").value;
    console.log("Se ha soltado el mouse, sumar puntuación obtenida");
    iniciarMarcado = false;

    console.log("Puntuacion obtenida:" + puntuacion);
    document.getElementById("puntuacion").value = puntuacion + parseInt(currentPuntuacion);
    //Reinicamos la puntuacion
    puntuacion = 1;

    console.log("Items marcados: " + itemsMarcados);
    recolorearItems();

    //Reiniciamos los items marcados
    itemsMarcados = [];

}


/**
 * Calcula los adyacentes de un item del grid
 *
 * @param {*} idMarcado
 */
function calcularAdyacentes(idMarcado){
    adyacentes=[];
    //Adyacente superior
    if((idMarcado-tamPanel) >= 0) adyacentes.push(idMarcado-tamPanel);
    //Adyacente inferior
    if((idMarcado+tamPanel) < (tamPanel*tamPanel)) adyacentes.push(idMarcado+tamPanel);
    //Adyacente izquierda
    if((idMarcado%tamPanel) > 0) adyacentes.push(idMarcado-1);
    //Adyacente derecha
    if(((idMarcado+1)%tamPanel) > 0) adyacentes.push(idMarcado+1);

    console.log(adyacentes);
}


function recolorearItems(){

    for(let index=0; index<itemsMarcados.length; index++){
        //Capturamos objeto marcado
        let itemMarcado = document.getElementById(itemsMarcados[index]);
        let colorRandom = getRandomColor();

        //Reiniciamos el item
        itemMarcado.parentElement.classList.remove(colorMarcado);
        itemMarcado.classList.remove(colorMarcado);
        itemMarcado.classList.add(colorRandom);
    }
}




//MAIN DEL JUEGO

//Obtenemos los datos del usuario
getDatosUsuario();
//Comprobamos si existen los datos necesarios, sino redireccionamos a index
if(!comprobarDatosUsuario()) location="index.html";
//Guardamos los datos de la sesion en el historico
historicoUsuarios(sessionStorage.getItem('nick'));

//Funciones de logica del juego
rellenarFormularioUsuario();
pintarPanelJuego();
programarEventos();