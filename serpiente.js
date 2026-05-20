
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

//*** PASO 4: CONSTANTE
const TAMANIO_CELDA = 25;


//*** ARREGLO DE LA SERPIENTE
/*const SERPIENTE = [
    {x:5, y:4},
    {x:4, y:4},
    {x:3, y:4}
];  

const SERPIENTE = [   // EJERCICIO  1: SERPIENTE HORIZONTAL
    {x:0, y:0},
    {x:1, y:0},
    {x:2, y:0}
];   

const SERPIENTE = [  // EJERCICIO  2: SERPIENTE FORMA DE L
    {x:7, y:8},
    {x:8, y:8},
    {x:9, y:8},
    {x:9, y:9}
];   */

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
        ctx.fillStyle = "white";
      } else{
        ctx.fillStyle = "#3e8a36";
      }

      let x = SERPIENTE[i].x * TAMANIO_CELDA;
      let y = SERPIENTE[i].y * TAMANIO_CELDA;
      ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
      ctx.strokeStyle = "#2f3422";
      ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

  }
}






//****************ORIGINAL*****************/    

    // Primera pintura del juego al cargar la página
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
      
      /* pruebas
      pintarParte(5, 5);    // prueba 1
      pintarParte(10, 2);   // prueba 2
      pintarParte(5,19);    // prueba 3
      pintarParte(19,5);    // prueba 4
      pintarParte(0,5);    // prueba 5
      pintarParte(19,19);    // prueba 6  */

      pintarSerpiente();


    }



