
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

//*** PASO 4: CONSTANTE
const TAMANIO_CELDA = 25;


//**** inicio de movimiento de la serpiente
let direccionActual = "derecha";
let velocidad = 300;


//***** variables ´para capturar coordenadas d la comida
let comidaX;
let comidaY;


// intervalos de tiempo con setInterval
let intervaloSerpiente;


//********* Arreglo de la serpiente 
const SERPIENTE = [ // EJERCICIO  3: SERPIENTE SUBIENDO LADO IZQUIERDO
    {x:0, y:2},
    {x:0, y:3},
    {x:0, y:4}
];


let juegoTerminado = false;     // control del juego, si es true el juego termina


//*** PASO 5: CREAR FUNCION dibujarTablero()

function dibujarTablero(){
  ctx.strokeStyle = "#333333";  // lineas color gris oscuro

  ctx.beginPath();                // iniciar trazo, dibujar nueva linea
  ctx.moveTo(25, 0);              // posicion inicial
  ctx.lineTo(25, canvas.height);  // dibuja una linea desde y hasta
  ctx.stroke();                   // dibuja la linea


  // PASO 9: CREAR FOR PARA DIBUJAR LAS LINEAS VERTICALES
  for(let lineasX = TAMANIO_CELDA; lineasX < canvas.width; lineasX += TAMANIO_CELDA){
    ctx.beginPath();
    ctx.moveTo(lineasX, 0);
    ctx.lineTo(lineasX, canvas.height);
    ctx.stroke();
  }

  // PASO 10: CREAR FOR PARA DIBUJAR LAS LINEAS HORIZONTALES
  for(let lineasY=TAMANIO_CELDA; lineasY < canvas.height; lineasY += TAMANIO_CELDA){
    ctx.beginPath();
    ctx.moveTo(0, lineasY);
    ctx.lineTo(canvas.width, lineasY);
    ctx.stroke();
  }

}//fin de dibujarTablero


//****************************************************************/
// PARTE 2: PASO 1 Y 2 - CREAR FUNCION PINTARPARTE(LINEAX, LINEAY)
function pintarParte(lineaX, lineaY){
  let x = lineaX * TAMANIO_CELDA;
  let y = lineaY * TAMANIO_CELDA;

  // RELLENO DEL CUADRADO
  //ctx.fillStyle = "red";  // color de relleno del cuadrado
  ctx.fillRect(x, y, TAMANIO_CELDA,TAMANIO_CELDA); //  fillRect(x, y, ancho, alto)


  // BORDES DEL CUADRADO
  ctx.strokeStyle = "white";  // color del borde
  ctx.strokeRect(x, y, TAMANIO_CELDA,TAMANIO_CELDA);  // dibuja el contorno
}


// PARTE 2: PASO 3 - CREAR FUNCION PINTARSERPIENTE
/*    function pintarSerpiente(){
      for(let i=0; i<SERPIENTE.length; i++){
        pintarParte(SERPIENTE[i].x, SERPIENTE[i].y);
      }
    }    */


// PARTE 2: EJERCICIO FINAL - LA CABEZA TENGA UN COLOR DIFERENTE
function pintarSerpiente(){
  for(let i=0; i<SERPIENTE.length; i++){
      if(i==0){   //pintamos de diferente color a la cabeza
        ctx.fillStyle = "white"; //cabezaa
      } else{
        ctx.fillStyle = "#3e8a36"; //cuerpo
      }

      let x = SERPIENTE[i].x * TAMANIO_CELDA;
      let y = SERPIENTE[i].y * TAMANIO_CELDA;
      ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
      ctx.strokeStyle = "#2f3422";
      ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

  }
}



//****************************************************************/ PARTE 3

// PARTE 1: MOVIMIENTO A LA DERECHA
function moverDerecha(){
  let cabezaActual = SERPIENTE[0];  // la cabeza está siempre al inicio [0] del arreglo

  let nuevaCabeza = {
    x: cabezaActual.x + 1,
    y: cabezaActual.y
  };

  SERPIENTE.unshift(nuevaCabeza);  // unshift agrega un elemento al inicio del arreglo
  SERPIENTE.pop();                 // pop() elimina el ultimo elemento del arreglo
} // fin funcion moverDerecha



// PARTE 2: funcion cambiarDireccion(direccion)
//   1. EVITAR QUE LA SERPIENTE RETROCEDA

function cambiarDireccion(direccion){
  
      // si su direccion de izquierda a derecha, no puede ir a la izquierda
      if(direccion === "derecha" && direccionActual === "izquierda"){
        return;
      }

      // si su direccion es de derecha a izquierda, no puede ir a la derecha
      if(direccion === "izquierda" && direccionActual === "derecha" ){
        return;
      }

      // si su direccion es de arriba a abajo, no puede ir arriba
      if(direccion === "abajo"  &&  direccionActual === "arriba"){
        return;
      }

      // si su direccion es de abajo a arriba, no puede ir abajo
      if(direccion === "arriba"  && direccionActual === "abajo"){
        return;
      }

      direccionActual = direccion;

}// fin de  cambiarDireccion



// PARTE 3: crear funciones para movimiento de la serpierte
function moverIzquierda(){
  let cabezaActual = SERPIENTE[0];

  let nuevaCabeza = {
    x: cabezaActual.x - 1,
    y: cabezaActual.y
  };

  SERPIENTE.unshift(nuevaCabeza);
  SERPIENTE.pop();    // elimina el ultimo elemento

} // fin de funcion mover izquierda


function moverArriba(){
  let cabezaActual = SERPIENTE[0];
  
  let nuevaCabeza = {
    x: cabezaActual.x,
    y: cabezaActual.y -1
  };

  SERPIENTE.unshift(nuevaCabeza);
  SERPIENTE.pop();  // elimina el ultimo elemento

} // fin de funcion mover arriba


function moverAbajo(){
  let cabezaActual = SERPIENTE[0];

  let nuevaCabeza = {
    x: cabezaActual.x,
    y: cabezaActual.y + 1
  };

  SERPIENTE.unshift(nuevaCabeza);
  SERPIENTE.pop();  // elimina el ultimo elemento

}// fin de funcion mover abajo



// PARTE 4: crear funciones iniciarJuego con setInterval que es automatizar el movimiento
function iniciarJuego(){

  clearInterval(intervaloSerpiente);

  if(juegoTerminado){  // validamos si la variable de control del juego está en true/false
    return;
  }

  intervaloSerpiente = setInterval(moverSerpiente, velocidad);

  document.getElementById("estado").textContent = "Jugando";
  document.getElementById("mensaje").textContent = "";
}


// pausar juego
function pausarJuego(){
  clearInterval(intervaloSerpiente);

  document.getElementById("estado").textContent = "Juego Pausado";
}


//
function moverSerpiente(){ // cambiamos direccionActual para darle otra direccion a la vibora
  
  if(juegoTerminado){   return; }  // no hacer nada si el juego terminó


  if(direccionActual === "derecha")    { moverDerecha();   }
  if(direccionActual === "izquierda")  { moverIzquierda(); }
  if(direccionActual === "arriba")     { moverArriba();    }
  if(direccionActual === "abajo")      { moverAbajo();     }

  verificarColision();

  if(juegoTerminado){
    dibujarTodo();
    return;
  }


  if(atrapaComida() === true){  // si es true: incrementa el puntaje
    
    pintarComida();
    
    // incrementamos 1 punto
    let puntajeActual = parseInt(document.getElementById("puntaje").textContent);
    document.getElementById("puntaje").textContent = puntajeActual + 1;


    // incrementamos un cuadro a la serpiente
    let colaSerpiente = SERPIENTE[SERPIENTE.length - 1]; // traemos el ultimo elemento del arreglo

    //agregamos un elemento al final de la cola d la serpiente

      if(direccionActual === "derecha"){
        SERPIENTE.push({ x: colaSerpiente.x - 1, y: colaSerpiente.y });
      }
      
      if(direccionActual === "izquierda"){
        SERPIENTE.push({ x: colaSerpiente.x + 1, y: colaSerpiente.y });
      }

      if(direccionActual === "arriba"){
        SERPIENTE.push({ x: colaSerpiente.x, y: colaSerpiente.y + 1 });
      }

      if(direccionActual === "abajo"){
        SERPIENTE.push({ x: colaSerpiente.x, y: colaSerpiente.y -1 });
      }

  } // fin de if

  dibujarTodo();

}



//***************************************** PARTE 8 :  COMIDA ALEATORIA

function pintarComida(){

  // calcular cantidad de celdas en el canvas
  let celdasX = canvas.width / TAMANIO_CELDA;
  let celdasY = canvas.height / TAMANIO_CELDA;

  comidaX = Math.floor(Math.random() * celdasX );    //Math.floor: redondea hacia abajo
  comidaY = Math.floor(Math.random() * celdasY );

}

function dibujarComida(){
  ctx.fillStyle = "#3e8a36";  // pintar color d comida
  pintarParte(comidaX, comidaY); 
}


//********   PARTE 9 – Detectar colisión con la comida
function atrapaComida(){
      let cabeza = SERPIENTE[0];


      //validamos si la cabeza d la serpiente coincide con la comida
      if(cabeza.x === comidaX && cabeza.y === comidaY){
        return true;
      } else{
        return false;
      }
}//fin de atraparComida



//-----------------PARTE 4: 

//Actividad 1: Implementar GAME OVER al tocar los bordes
function verificarColision(){
  
  let cabeza = SERPIENTE[0]; //

  // calcular total de celdas q existen ancho y largo del canvas dividido para tamaño de celdas
  let totalCeldas_x = canvas.width / TAMANIO_CELDA;
  let totalCeldas_y = canvas.height / TAMANIO_CELDA;

      if(cabeza.x<0 || cabeza.x >= totalCeldas_x || cabeza.y<0 || cabeza.y >= totalCeldas_y ){
        clearInterval(intervaloSerpiente);
        juegoTerminado=true;   // cambiamos estatus d variable de control de juego

        document.getElementById("estado").textContent = "☠️ GAME OVER ☠️";
        document.getElementById("mensaje").textContent = "Chocaste con las paredes del juego";
      } // fin de if

} // fin de verificarColision()




/*splice(): altera directamente el arreglo sobre el que se aplica 
            y devuelve un nuevo arreglo con los elementos eliminados. 
            array.splice(inicio, cantidadEliminar, elemento1, elemento2, ...)    */


//Actividad 2: Implementar botón “Reiniciar juego”
function reiniciarJuego(){

  clearInterval(intervaloSerpiente); //detener los intervalos

  SERPIENTE.splice(0, SERPIENTE.length); //dejamos en cero el arreglo

  //********* Arreglo de la serpiente 
  //cargamos pocision inicial de la serpiente
SERPIENTE.push({x:0, y:2});       //cabeza
SERPIENTE.push({x:0, y:3});       //cuerpo
SERPIENTE.push({x:0, y:4});       //cola


direccionActual = "derecha";  // direccion inicial

juegoTerminado=false;
document.getElementById("puntaje").textContent = "0";
velocidad = 300;

document.getElementById("estado").textContent = "listo";
document.getElementById("mensaje").textContent = "Presiona iniciar para comenzar.";

pintarComida();
dibujarTodo();

} // fin de reiniciarJuego


//++++++++++++++++++++++++ MEJORAS ADICIONALES





//   2. UTILIZAR LAS TECLAS DE DIRECCION DEL TECLADO
/*  evento.key: contiene el evento de la tecla de direccion del teclado
    Para las flechas, se utilizan: "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"
    tecla "Enter" (Intro) y tecla barra espaciadora " " para pausar  */

document.addEventListener("keydown",
              function(evento){   
                     switch(evento.key){
                          case "ArrowRight" :  cambiarDireccion("derecha");    break;
                          case "ArrowLeft"  :  cambiarDireccion("izquierda");  break;
                          case "ArrowUp"    :  cambiarDireccion("arriba");     break;
                          case "ArrowDown"  :  cambiarDireccion("abajo");      break;
                          case "Enter"      :  iniciarJuego();                 break;
                          case " "          :  pausarJuego();                  break;     
                          default           :  break;
                     }
              }
);


//****************ORIGINAL*****************/    

    // Primera pintura del juego al cargar la página
    pintarComida();
    dibujarTodo();

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero();   //PASO 7: INVOCAR dibujarTablero()
      dibujarComida();      
      pintarSerpiente();
    }



