//Obtenemos los datos del usuario
getDatosUsuario();

//Comprobamos si existen los datos necesarios, sino redireccionamos a index
if(!comprobarDatosUsuario()) location="index.html";

//Guardamos los datos de la sesion en el historico
historicoUsuarios(sessionStorage.getItem('nick'));