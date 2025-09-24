// Arreglo de objetos con palabras del juego con las pistas
let palabras = [];

// Objeto que mantiene el estado actual del juego mientras se interactua
let juego = {
    palabraActual: 0, //palabra que se está ejecutando
    palabra: '', //la palabra actual para adivinar
    palabraAdivinada: [], //array con las letras que se adivinaron
    errores: 0, //contador de letras incorrectas
    aciertos: 0, //contador de letras correctas
    letrasUsadas: [], //array de letras ya usadas
    iniciado: false, //estado si el juego está iniciado
    pausado: false, //estado si el juego está pausado
    tiempoRestante: 300, //tiempo en segundos - 5min
    timer: null //temporizador
};

// Objeto que almacena referencias a los elementos del HTML para actualizar la interfaz
const elementos = {
    resolverBtn: document.getElementById('resolverBtn'), //boton para resolver la palabra actual
    startBtn: document.getElementById('startBtn'), //boton de iniciar juego
    restartBtn: document.getElementById('restartBtn'), //boton para reiniciar
    pauseBtn: document.getElementById('pauseBtn'), //boton para pausar o reanudar
    exitBtn: document.getElementById('exitBtn'), //boton para salir
    wordDisplay: document.getElementById('wordDisplay'), //donde se muestra la palabra adivinada
    hangmanImage: document.getElementById('hangmanImage'), //la imagen del ahorcado
    hintsList: document.getElementById('hintsList'), //listado de las pistas
    alfabeto: document.getElementById('alfabeto'), //contenedor del teclado (virtual)
    gameMessage: document.getElementById('gameMessage'), //para los mensajes del juego
    currentWord: document.getElementById('currentWord'), //para el numero de la palabra actual del juego
    errorsCount: document.getElementById('errorsCount'), //contar los errores que lleva el jugador
    correctGuessesCount: document.getElementById('correctGuesses'), //contar los aciertos que lleva el jugador
    contador: document.getElementById('contador') //para el temporizador
};

//Imágenes del ahorcado
const imagenesAhorcado = [
    "img/estado0.png",
    "img/estado1.png",
    "img/estado2.png",
    "img/estado3.png",
    "img/estado4.png",
    "img/estado5.png",
    "img/estado6.png"
];

/*Funcion para cargar las palabras, 
 * se mapean los datos recibidos para adoptarlos al formato requerido
*/
function cargarPalabra() {
    fetch('Controlador') //petición al serverlet/controlador
            .then(response => response.json()) //convertir a json
            .then(data => {
                //mapear datos de DB al formato del juego 
                palabras = data.map(item => ({
                        palabra: item.textoPalabra.toUpperCase(), //convertir a palabras mayúsculas
                        pistas: [item.pista1, item.pista2, item.pista3], //array con las 3 pistas
                        imagen: item.imagen  // imagen de la palabra
                    }));
                console.log('Palabras cargadas de la base de datos:', palabras);
                mostrarMensaje(`${palabras.length} palabras cargadas, suerte intentando resolverlas`, `success`);
            })
            .catch(error => {
                //manejo de errores en caso de que la carga falle
                document.write('Error al cargar palabras', error);
                mostrarMensaje("Error: No se pudieron cargar las palabras de la base de datos", "error");
            });
}

//Mostrar / limpiar mensajes
function mostrarMensaje(texto = '', tipo = '') {
    if (texto) {
        elementos.gameMessage.textContent = texto;
        elementos.gameMessage.className = `message ${tipo}`; //aplica estilos según el tipo
        elementos.gameMessage.style.display = 'block'; //mostrar mensaje
    } else {
        elementos.gameMessage.style.display = 'none'; //oculta el mensaje
}
}

//funcion para limpiar mensaje
function limpiarMensaje() {
    mostrarMensaje();
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function () { //Espera a que el html se cargue
    crearAlfabeto(); //Llama a la funcion que crea el teclado virtual
    configurarEventos(); //Asigna los eventos de clic a los botones
    cargarPalabra(); //para cargar la palabra de la base de datos
    reiniciarJuego(); //inicializar el estado del juego
    mostrarMensaje("Bienvenidos al ahorcado, presiona iniciar para comenzar", 'info');
});

// Crear los botones del teclado virtual para cada letra
function crearAlfabeto() {
    const letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
    elementos.alfabeto.innerHTML = ''; //limpia el contenedor del teclado

    letras.forEach(letra => {
        const btn = document.createElement('button'); //Crea un boton para cada letra
        btn.className = 'letter-btn';
        btn.textContent = letra;
        btn.id = `letra-${letra}`; //Para asignar un id
        btn.onclick = () => adivinarLetra(letra); //Asignar una fnci[on al hacer clic
        elementos.alfabeto.appendChild(btn); //Agregar al DOM
    });
}

//Configurar los eventos listener del juego para los botones y teclado físico
function configurarEventos() {
    //evento para iniciar el juego
    elementos.startBtn.onclick = iniciarJuego;

    //evento para reiniciar
    elementos.restartBtn.onclick = () => {
        if (confirm('Estás seguro de que quieres reiniciar?')) {
            terminarJuego(); //detener el juego actual
            reiniciarJuego(); //para volver a empezar desde cero
            mostrarMensaje('Juego reiniciado, preciona iniciar para comenzar de nuevo', 'info');
        }
    };

    elementos.pauseBtn.onclick = alternarPausa; //evento para pausar/reanudar
    //evento para salir
    elementos.exitBtn.onclick = () => {
        if (confirm('Estás seguro de que quieres salir del juego?')) {
            terminarJuego();
            mostrarMensaje('Gracias por jugar, recarga la página para jugar otra vez', 'info');
        }
    };

    //evento para el teclado físico 
    document.addEventListener('keydown', (e) => {
        if (juego.iniciado && !juego.pausado) {
            const letra = e.key.toUpperCase();
            //verifica que sea una letra válida incluyengo ñ y acentos
            if (letra.match(/[A-ZÑÁÉÍÓÚ]/) && letra.length === 1) {
                adivinarLetra(letra);
            }
        }
    });

    //evento para cerrar sesión
    document.getElementById('logOut').onclick = () => {
        if (confirm('Seguro que quieres cerrar sesión?')) {
            window.location.href = 'index.jsp';
        }
    };
}

//Iniciar juego
function iniciarJuego() {
    //para verificar si hay palabras cargadas
    if (palabras.length === 0) {
        mostrarMensaje("No hay palabras disponibles", 'error');
        return;
    }
    //cambia el estado del juego
    juego.iniciado = true;
    juego.pausado = false;
    
    document.getElementById('imagenResultado').style.display = 'none';
    cargarPalabraActual();//carga la primera palabra
    iniciarTimer(); //inicia el temporizador
    actualizarPantalla(); //actualiza la interfaz
    mostrarMensaje("Juego iniciado, adivina la palabra correcta", 'success');

    elementos.startBtn.style.display = 'none';
    elementos.pauseBtn.style.display = 'inline-block';
    elementos.resolverBtn.style.display = 'inline-block';

}

function cargarPalabraActual() {
    //verificar si hay palabras
    if (palabras.length === 0) {
        mostrarMensaje("No hay palabras disponibles", 'error');
        return;
    }

    const dato = palabras[juego.palabraActual];
    juego.palabra = dato.palabra;
    //guines bajos de la cantidad de letras de la palabra
    juego.palabraAdivinada = Array(juego.palabra.length).fill('_');
    juego.letrasUsadas = [];
    juego.errores = 0;

    //para mostrar las pistas
    elementos.hintsList.innerHTML = '';
    dato.pistas.forEach(pista => {
        const li = document.createElement('li');
        li.textContent = pista;
        elementos.hintsList.appendChild(li);
    });
    reiniciarAlfabeto(); //reactiva todas las letras
}

//para adivinar letra
function adivinarLetra(letra) {
    //verificsar condiciones para poder jugar
    if (!juego.iniciado || juego.pausado || juego.letrasUsadas.includes(letra)) {
        return;
    }
    //poner la letra como ya usada
    juego.letrasUsadas.push(letra);
    const boton = document.getElementById(`letra-${letra}`);
    boton.disabled = true; //para desactivar el botón

    if (juego.palabra.includes(letra)) {
        for (let i = 0; i < juego.palabra.length; i++) {
            if (juego.palabra[i] === letra) {
                juego.palabraAdivinada[i] = letra;
            }
        }
        juego.aciertos++;
        boton.classList.add('Correct'); //estilo para el acierto
        mostrarMensaje(`Bien hecho! "${letra}" está en la palabra`, 'success');

        //ver si la palabra está completa
        if (!juego.palabraAdivinada.includes('_')) {
            const imagenResultado = document.getElementById('imagenResultado');
            imagenResultado.src = `img/${palabras[juego.palabraActual].imagen}`;
            imagenResultado.style.display = 'block';

            setTimeout(() => {
                imagenResultado.style.display = 'none';
                siguientePalabra();
            }, 1000);
        }

    } else {
        //ver la letra incorrecta
        juego.errores++;
        boton.classList.add('wrong'); //estilo para el error
        mostrarMensaje(`La letra "${letra}" no está en la palabra`, `error`);

        if (juego.errores >= 6) { //ver si se acabaron los intentos, máximo de 6
            setTimeout(() => juegoTerminado(), 1000);
        }
    }
    actualizarPantalla();
}

//Pasar a la siguiente palabra
function siguientePalabra() {
    if (juego.palabraActual < palabras.length - 1) {
        juego.palabraActual++;
        juego.tiempoRestante = 120;
        cargarPalabraActual();
        actualizarPantalla();
        mostrarMensaje(`Correcto, siguiente palabra: ${juego.palabraActual + 1}/${palabras.length}`, 'success');
    } else {
        mostrarMensaje('Felicidades, completaste todas las palabras', 'success'); //mostrar mensaje de felicitaciones
        const imagenResultado = document.getElementById('imagenResultado');
        imagenResultado.src = 'img/ganaste.png'; //cargar imagen de felicitaciones
        imagenResultado.style.display = 'block'; //estilo de imagen
        imagenResultado.style.background = 'White'; //estilo de imagen
        imagenResultado.style.border = 'none'; //estilo de imagen
        terminarJuego();//terminr juego
    }
}

function actualizarPantalla() {
    //Actualiza todos los elementos visuales
    elementos.wordDisplay.textContent = juego.palabraAdivinada.join(' ');
    elementos.currentWord.textContent = juego.palabraActual + 1;
    elementos.errorsCount.textContent = juego.errores;
    elementos.correctGuessesCount.textContent = juego.aciertos;
    //Para cambiar la imagen del ahorcado si hay errores
    elementos.hangmanImage.src = imagenesAhorcado[juego.errores] || imagenesAhorcado[6];
}

// Reiniciar juego
function reiniciarJuego() {
    //limpiar el temporizador
    if (juego.timer) {
        clearInterval(juego.timer);
    }

    //reinicia el objeto del estado de juego
    juego = {
        palabraActual: 0,
        palabra: '',
        palabraAdivinada: [],
        errores: 0,
        aciertos: 0,
        letrasUsadas: [],
        iniciado: false,
        pausado: false,
        tiempoRestante: 120,
        timer: null
    };

    //reinicia la parte visual del juego
    reiniciarAlfabeto();
    elementos.wordDisplay.textContent = '_ _ _ _ _ _ _ _';
    elementos.hintsList.innerHTML = '<li>Presiona Iniciar para comenzar</li>';
    elementos.hangmanImage.src = imagenesAhorcado[0];
    elementos.contador.textContent = 'Tiempo 2:00';
    limpiarMensaje();
    document.getElementById('imagenResultado').style.display = 'none';

    //permite ver de nuevo los botones
    elementos.startBtn.style.display = 'inline-block';
    elementos.pauseBtn.style.display = 'none';
    elementos.resolverBtn.style.display = 'none';
}

function reiniciarAlfabeto() {
    const botones = document.querySelectorAll('.letter-btn');
    botones.forEach(btn => {
        btn.disabled = false; //activa de nuevo el botón
        btn.className = 'letter-btn'; //para quitar los estilos/colores de correcto/incorrecto
    });
}
;

//Temporizador de 5 min
function iniciarTimer() {
    actualizarContador();
    juego.timer = setInterval(() => {
        if (!juego.pausado) { //cuenta solo si no está pausado
            juego.tiempoRestante--;
            actualizarContador();
            //verificar si se acabó el tiempo
            if (juego.tiempoRestante <= 0) {
                clearInterval(juego.timer);
                mostrarMensaje("⏰ ¡Se acabó el tiempo!", 'error');
                setTimeout(() => juegoTerminado(), 1000);
            }
        }
    }, 1000); //y se ejecuta cada segundo
}

function actualizarContador() {
    let min = Math.floor(juego.tiempoRestante / 60);
    let seg = juego.tiempoRestante % 60;
    if (seg < 10) {
        seg = '0' + seg;
    }
    elementos.contador.textContent = `Tiempo ${min}:${seg}`;
}

//terminar el juegop
function juegoTerminado() {
    mostrarMensaje(`Juego terminado, la palabra era: "${juego.palabra}"`, 'error');

    const imagenResultado = document.getElementById('imagenResultado');
    imagenResultado.src = 'img/perdio.png';  // Cambia esta ruta si tu imagen está en otro lugar
    imagenResultado.style.display = 'block';
    imagenResultado.style.background = '#ffffff';

    setTimeout(() => {
        imagenResultado.style.display = 'none';
        reiniciarJuego();
    }, 3000); // Espera 3 segundos para reiniciar el juego
}

//Pausar / reanudar el juego
function alternarPausa() {
    if (!juego.iniciado) {
        return;
    }
    juego.pausado = !juego.pausado;

    if (juego.pausado) {
        elementos.pauseBtn.textContent = 'Reanudar';
        mostrarMensaje('Juego en pausa.', 'info');
    } else {
        elementos.pauseBtn.textContent = 'Pausa';
        mostrarMensaje('Juego reanudado.', 'success');
    }
}

// Terminar
function terminarJuego() {
    juego.iniciado = false;
    clearInterval(juego.timer); // detiene el temporizador

    document.querySelectorAll('.letter-btn').forEach(btn => btn.disabled = true);//desactiva todas las letras del teclado

    // volver a mostrar boton iniciar
    elementos.startBtn.style.display = 'inline-block';
    elementos.pauseBtn.style.display = 'none';
    elementos.resolverBtn.style.display = 'none';
}

function resolverPalabra() {
    if (!juego.iniciado || juego.pausado) {
        return;
    }//Revelar todas las letras de la palabra
    juego.palabraAdivinada = juego.palabra.split('');// Marcar todos los aciertos según el largo de la palabra
    juego.aciertos = juego.palabra.length; //prar desactivar todas las letras del teclado

    document.querySelectorAll('.letter-btn').forEach(btn => btn.disabled = true);
    actualizarPantalla();
    mostrarMensaje(`¡Palabra resuelta! Era "${juego.palabra}".`, 'success');

    const imagenResultado = document.getElementById('imagenResultado');
    imagenResultado.src = `img/${palabras[juego.palabraActual].imagen}`;
    imagenResultado.style.display = 'block';

    setTimeout(() => {
        imagenResultado.style.display = 'none';
        siguientePalabra();
    }, 2000);
}

// Llama esta función cuando el jugador gane o se rinda para terminar el juego
function verificarResultado(juegoGanado, jugadorSeRindio) {
    if (juegoGanado) {
        mostrarImagenResultado('ganar');
    } else if (jugadorSeRindio) {
        mostrarImagenResultado('rendirse');
    }
}