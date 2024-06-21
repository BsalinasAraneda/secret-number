//Declaración global de la variable en la que se almacenara
//el valor que retorne la función generateSecretNumber()
let getSecretNumber =0;
let listaNumerosSorteados = []; //Declaración de un arreglo
let numerosMaximosSorteados =10;

//Inicializamos el contador en 0 para luego asignarlo en el inicio
//del programa
let cont = 0;
//Función que permite cambiar el mensaje de texto
//de algun elemento como p,h1,h2 dentro de la pagina
function changeTexto(elemento, texto){
    let getElemento = document.querySelector(elemento);
    getElemento.innerHTML = texto;
    return; //Se aconseja como buena practica que siempre al finalizar una función se agregue el return
}

// Funcion que permite cambiar el mensaje del placeholder del
// input que ingresa el usuario
function changePlaceHolder(elemento,texto){
    let getPlaceHolder = document.querySelector("input");
    getPlaceHolder.placeholder = texto;
    return;
}

//Funcion que genera un numero pseudoaleatorio
function generateSecretNumber() {
    //Asignamos el numero generado en una variable
    let numeroGenerado = Math.floor(Math.random()*numerosMaximosSorteados)+1;
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    if(listaNumerosSorteados.length == numerosMaximosSorteados){
        changeTexto("p","Lo sentimos, alcanzaste el numero maximo de numeros generado..adios :(");
    }else{
        //Preguntamos a la lista si dentro de esta incluye al numero random generado
        if(listaNumerosSorteados.includes(numeroGenerado)){
            //Si la lista lo incluye, utilizamos recursividad para poder retornar el valor que la función genera
            return generateSecretNumber();
        }
        else{
            //En caso de que no se incluya el valor en la lista, retorna el numero que en un comienzo se genero
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    } 
}

//Esta función solo se va a ejecutar cuando se cree el evento oneClic(), de caso contrario no se generara
function verificateNumber() {
    //Obtener el valor que se ingresa desde el input y luego convertir la cadena a int
    let getNumberByInput = parseInt(document.getElementById("userNumber").value); 
    console.log(`Numero usuario:${getNumberByInput}(${typeof(getNumberByInput)}) ------ Numero secreto:${getSecretNumber}`);
    if(getNumberByInput <0){
        changeTexto("p","El rango de nuevos el positivo");
    }
    if(getNumberByInput === getSecretNumber){
        changeTexto("p",`Felicidades acertastaste el numero secreto ${getSecretNumber} en ${cont} ${(cont===1) ? "intento": "intentos"}`);
        document.getElementById("reiniciar").removeAttribute("disabled");//Activa el boton nuevo juego cuando adivina
    }
    else{
        if(getNumberByInput > getSecretNumber){
            changeTexto("p","El numero secreto es menor");
        }
        else{
            changeTexto("p","El numero secreto es mayor");
        }
        cont +=1;
        cleanControls();
    }
    return;
    }

//Funcion que permite limpiar el valor del input del usuario
//Lo reinicia en 0
function cleanControls() {
    document.querySelector("#userNumber").value = "";//Buscar por el ID
}
//Funcion que permite cargar los controles iniciales de la pagina
function condicionalesIniciales() {
    changeTexto("h1","Juego del numero secreto");
    changeTexto("p",`Indica un numero entre el 1 y el ${numerosMaximosSorteados}`);
    changePlaceHolder("input","Digita el numero...");
    //Cargamos de manera dinamica el nuevo valor que genera la
    //funcion de crear un numero aleatorio
    getSecretNumber = generateSecretNumber();
    //Inicializamos el contrador en uno, lo que permite
    //validar si en el primer intento el usuario acerto el numero
    cont = 1;
}

//Funcion que nos permitira reiniciar los controles
//Ademas debemos reiniciar el numero randomico
function reiniciarJuego() {
    cleanControls();    // 1.-Limpiar controles
    condicionalesIniciales(); //Contiene todo el contenido limpio para carggar
    // 4.-Deshabilitar el boton de nuevo reiniciarJuego
    // 5.-Reiniair el numero de intentos
    // console.clear();
    document.querySelector("#reiniciar ").setAttribute("disabled","true");//Desactivamos nuevamente el botón (nuevo juego)
}
//Incializamos esta función para cargar la configuración
//predeterminada de los controles.
condicionalesIniciales();





