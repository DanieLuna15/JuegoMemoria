//inicializacion de variables
let tarjetasDestapadas=0;
let tarjeta1=null;
let tarjeta2=null;
let primerResultado=null;
let segundoResultado=null;
let movimientos =null;
let aciertos =null;
let temporizador=false;
let timer=120;
let timerInicial=120;
let tiempoRegresivoId=null;
let botonReintentar= null;


let winAudio=new Audio('./sounds/win.wav');
let loseAudio=new Audio('./sounds/lose.wav');
let clickAudio=new Audio('./sounds/click.wav');
let rightAudio=new Audio('./sounds/right.wav');
let wrongAudio=new Audio('./sounds/wrong.wav');

//apuntando a doc HTML
let mostrarMovimientos=document.getElementById('movimientos');
let mostrarAciertos=document.getElementById('aciertos');
let mostrarTiempo=document.getElementById('t-restante');

//generacion de numeros ALEATORIOS
let numeros=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18];
numeros=numeros.sort(()=>{return Math.random() -0.5});
console.log(numeros);

//funciones
function contarTiempo(){
    tiempoRegresivoId=setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML=`Tiempo: ${timer} segundos`;
        if(timer==0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas(numeros);
            loseAudio.play();
        }
    }, 1000);
}

function bloquearTarjetas(){
    for(let i=0;i<=35;i++){
        let tarjetaBloqueada=document.getElementById(i);
        tarjetaBloqueada.innerHTML=`<img src="./images/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled=true;
    }
}

//funcion principal
function destapar(id){

    if(temporizador==false){
        contarTiempo();
        temporizador=true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);
    if(tarjetasDestapadas==1){
        //mostrar el primer numero
        tarjeta1=document.getElementById(id);
        primerResultado=numeros[id]
        tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt="">`;
        clickAudio.play();
        //deshabilitar primer boton
        tarjeta1.disabled=true;
    }else if(tarjetasDestapadas==2){
        //mostrar el segundo numero
        tarjeta2=document.getElementById(id);
        segundoResultado=numeros[id]
        tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png" alt="">`;

        //deshailitar segundo boton
        tarjeta2.disabled=true;

        //incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML=`Movimientos: ${movimientos}`;

        //----------------------------
        if(primerResultado==segundoResultado){
            //encerrar contador tarjetas destapadas
            tarjetasDestapadas=0;

            //aumentar Aciertos
            aciertos++;
            mostrarAciertos.innerHTML=`Aciertos: ${aciertos} 👍`;
            rightAudio.play();
            if(aciertos == 18){
                winAudio.play();
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML=`Aciertos: ${aciertos} 😱`;
                mostrarTiempo.innerHTML=`Bien! 👑 Sólo demoraste ${timerInicial-timer} segundos`;
                mostrarMovimientos.innerHTML=`Movimientos: ${movimientos} ✌🤓`;
                botonReintentar=document.getElementById(reintentar).style.display = 'none';
            }
        }else{
            wrongAudio.play();
            //mostrar momentaneamente valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML= ' ';
                tarjeta2.innerHTML= ' ';
                tarjeta1.disabled= false;
                tarjeta2.disabled= false;
                tarjetasDestapadas=0;
                botonReintentar=document.getElementById(reintentar).style.display = 'none';
            },500)
        }
    }
}