
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

//*** PASO 4: CONSTANTE
const TAMANIO_CELDA = 25;


//**** inicio de movimiento de la serpiente
let direccionActual = "derecha";


//***** variables ´para capturar coordenadas d la comida
let comidaX;
let comidaY;


// intervalos de tiempo con setInterval
let intervaloSerpiente;


//********* Arreglo de la serpiente 
const SERPIENTE = [ // EJERCICIO  3: SERPIENTE SUBIENDO LADO IZQUIERDO
    {x:0, y:2},
    {x:0, y:3},
    {x:0, y:4},
    {x:0, y:5},
    {x:0, y:6}
];


//*** PASO 5: CREAR FUNCION dibujarTablero()

function dibujarTablero(){
  ctx.strokeStyle = "#333333";  // lineas color gris oscuro

  ctx.beginPath();                // iniciar trazo, dibujar nueva linea
  ctx.moveTo(25, 0);              // posicion inicial
  ctx.lineTo(25, canvas.height);  // dibuja una linea desde y hasta
  ctx.stroke();                   // dibuja la linea

  /* // PASO 8: VARIAS LINEAS DE PRUEBA
  ctx.beginPath();
  ctx.moveTo(50, 0);
  ctx.lineTo(50, canvas.height);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(75, 0);
  ctx.lineTo(75, canvas.height);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(100, 0);
  ctx.lineTo(100, canvas.height);
  ctx.stroke();
  fin de pruba paso 8   */


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
function cambiarDireccion(direccion){

    direccionActual = direccion;
  
} // fin de funcion



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
  intervaloSerpiente = setInterval(moverSerpiente, 300);

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
  
  if(direccionActual === "derecha")    { moverDerecha();   }
  if(direccionActual === "izquierda")  { moverIzquierda(); }
  if(direccionActual === "arriba")     { moverArriba();    }
  if(direccionActual === "abajo")      { moverAbajo();     }


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

}



//-----------------PARTE 4: Implementar GAMER OVER al chocar con las paredes

let juegoTerminado = false;     // control del juego, si es true el juego termina

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



