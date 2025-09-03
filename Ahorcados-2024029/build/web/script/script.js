// Arreglo de objetos con palabras del juego con las pistas
const palabras = [
    {
        palabra: "DRAGONBALL",
        pistas: [
            "Es una historia donde luchadores buscan esferas mágicas.",
            "El protagonista es un guerrero de gran poder que puede cambiar su color de pelo.",
            "La amistad, el entrenamiento y la superación personal son temas centrales de esta aventura."
        ]
    },
    {
        palabra: "MARIPOSA",
        pistas: [
            "Es un insecto que sufre metamorfosis.",
            "Tiene alas coloridas y vuela de flor en flor.",
            "Antes fue una oruga que se envolvió en un capullo"
        ]
    },
    {
        palabra: "DINOSAURIO",
        pistas: [
            "Reptiles que dominaron la Tierra hace millones de años.",
            "Se extinguieron hace aprocimadamente 65 millones de años.",
            "Hay unos carnívoros y otros herbívoros, algunos volaban"
        ]
    },
    {
        palabra: "MEDICINA",
        pistas: [
            "Ciencia que estudia enfermedades y su tratamiendo.",
            "Los profesionales de esra área salvan vidas.",
            "Incluye especualidades como cardiología y pediatría"
        ]
    },
    {
        palabra: "AVENTURA",
        pistas: [
            "Palabra que significa una experiencia emocionante.",
            "Los exploradores y viajeros la buscan constantemente.",
            "Puede involucrar riesgos y descubrimientos nuevos"
        ]
    }
];

// Objeto que mantiene el estado actual del juego mientras se interactua
let juego = {
    palabraActual: 0,
    palabra: '',
    palabraAdivinada: [],
    errores: 0,
    aciertos: 0,
    letrasUsadas: [],
    iniciado: false,
    pausado: false,
    tiempoRestante: 300,
    timer: null,
    piezasReveladas: 0
};

// Referencias a elementos HTML que se actualizan durante el juego, asignar valores a cada elemento para no escribir lo mismo
const elementos = {
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

//Mostrar / limpiar mensajes
function mostrarMensaje(texto = '', tipo = '') {
    if (texto) {
        elementos.gameMessage.textContent = texto;
        elementos.gameMessage.className = `message ${tipo}`;
        elementos.gameMessage.style.display = 'block';
    } else {
        elementos.gameMessage.style.display = 'none';
}
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function () { //Espera a que el html se cargue
    crearAlfabeto(); //Llama a la funcion que crea el teclado virtual
    configurarEventos(); //Asigna los eventos de clic a los botones
    reiniciarJuego();
    mostrarMensaje("Bienvenidos al ahorcado, presiona iniciar para comenzar, 'info'");
});

// Crear los botones del teclado virtual para cada letra
function crearAlfabeto() {
    const letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
    elementos.alfabeto.innerHTML = '';

    letras.forEach(letra => {
        const btn = document.createElement('button'); //Crea un boton
        btn.className = 'letter-btn';
        btn.textContent = letra;
        btn.id = `letra-${letra}`; //Para asignar un id
        btn.onclick = () => adivinarLetra(letra); //Asignar una fnci[on al hacer clic
        elementos.alfabeto.appendChild(btn); //Agregar al DOOM
    });
}

//Configurar los eventos
function configurarEventos() {
    elementos.startBtn.onclick = iniciarJuego;
    elementos.restartBtn.onclick = () => {
        if (confirm('Estás seguro de que quieres reiniciar?')) {
            terminarJuego(); //detener el juego actual
            reiniciarJuego(); //para volver a empezar desde cero
            mostrarMensaje('Juego reiniciado, preciona iniciar para comenzar de nuevo', 'info');
        }
    };
    elementos.pauseBtn.onclick = alternarPausa;
    elementos.exitBtn.onclick = () => {
        if (confirm('Estás seguro de que quieres salir del juego?')) {
            terminarJuego();
            mostrarMensaje('Gracias por jugar, recarga la página para jugar otra vez', 'info');
        }
    };

    //Teclado
    document.addEventListener('keydown', (e) => {
        if (juego.iniciado && !juego.pausado) {
            const letra = e.key.toUpperCase();
            if (letra.match(/[A-ZÑÁÉÍÓÚ]/) && letra.length === 1) {
                adivinarLetra(letra);
            }
        }
    });
}

//Iniciar juego
function iniciarJuego() {
    juego.iniciado = true;
    juego.pausado = false;
    cargarPalabraActual();
    iniciarTimer();
    actualizarPantalla();
    mostrarMensaje("Juego iniciado, adivina la palabra correcta", 'succes');

    elementos.startBtn.style.display = 'none';
    elementos.pauseBtn.style.display = 'inline-block';
}

function cargarPalabraActual() {
    const dato = palabras[juego.palabraActual];
    juego.palabra = dato.palabra;
    juego.palabraAdivinada = Array(juego.palabra.length).fill('_');
    juego.letrasUsadas = [];
    juego.errores = 0;

    //mostrar pistas
    elementos.hintsList.innerHTML = '';
    dato.pistas.forEach(pista => {
        const li = document.createElement('li');
        li.textContent = pista;
        elementos.hintsList.appendChild(li);
    });
    reiniciarAlfabeto();
}

// Adivinar letra
function adivinarLetra(letra) {
    if (!juego.iniciado || juego.pausado || juego.letrasUsadas.includes(letra)) {
        return;
    }
    juego.letrasUsadas.push(letra);
    const boton = document.getElementById(`letra-${letra}`);
    boton.disabled = true;

    if (juego.palabra.includes(letra)) {
        for (let i = 0; i < juego.palabra.length; i++) {
            if (juego.palabra[i] === letra) {
                juego.palabraAdivinada[i] = letra;
            }
        }
        juego.aciertos++;
        boton.classList.add('correct');
        mostrarMensaje(`¡Bien hecho! "${letra}" está en la palabra.`, 'success');

        if (!juego.palabraAdivinada.includes('_')) {
            setTimeout(() => siguientePalabra(), 1500);
        }
    } else {
        juego.errores++;
        boton.classList.add('wrong');
        mostrarMensaje(`La letra "${letra}" no está.`, 'error');

        if (juego.errores >= 6) {
            setTimeout(() => juegoTerminado(), 1000);
        }
    }

    actualizarPantalla();
}


//Pasar a la siguiente palabra
function siguientePalabra() {
    if (juego.palabraActual < palabras.length - 1) {
        juego.palabraActual++;
        juego.tiempoRestante = 300;
        cargarPalabraActual();
        actualizarPantalla();
        mostrarMensaje(`Correcto, siguiente palabra: ${juego.palabraActual + 1}/${palabra.length}`, 'success');
    } else {
        mostrarMensaje('Felicidades, completaste todas las palabras');
        terminarJuego();
    }
}

function actualizarPantalla() {
    elementos.wordDisplay.textContent = juego.palabraAdivinada.join(' ');
    elementos.currentWord.textContent = juego.palabraActual + 1;
    elementos.errorsCount.textContent = juego.errores;
    elementos.correctGuessesCount.textContent = juego.aciertos;
    elementos.hangmanImage.src = imagenesAhorcado[juego.errores] || imagenesAhorcado[6];
}

// Reiniciar juego
function reiniciarJuego() {
    if (juego.timer) {
        clearInterval(juego.timer);
    }
    juego = {
        palabraActual: 0,
        palabra: '',
        palabraAdivinada: [],
        errores: 0,
        aciertos: 0,
        letrasUsadas: [],
        iniciado: false,
        pausado: false,
        tiempoRestante: 300,
        timer: null
    };

    reiniciarAlfabeto();
    elementos.wordDisplay.textContent = '_ _ _ _ _ _ _ _';
    elementos.hintsList.innerHTML = '<li>Presiona Iniciar para comenzar</li>';
    elementos.hangmanImage.src = imagenesAhorcado[0];
    elementos.contador.textContent = 'Tiempo 5:00';
    limpiarMensaje();

    elementos.startBtn.style.display = 'inline-block';
    elementos.pauseBtn.style.display = 'none';
}

function reiniciarAlfabeto() {
    const botones = document.querySelectorAll('.letter-btn');
    botones.forEach(btn => {
        btn.disabled = false;
        btn.className = 'letter-btn';
    });
}
;

//Temporizador
function iniciarTimer() {
    actualizarContador();
    juego.timer = setInterval(() => {
        if (!juego.pausado) {
            juego.tiempoRestante--;
            actualizarContador();
            if (juego.tiempoRestante <= 0) {
                clearInterval(juego.timer);
                mostrarMensaje("⏰ ¡Se acabó el tiempo!", 'error');
                setTimeout(() => juegoTerminado(), 1000);
            }
        }
    }, 1000);
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
    mostrarMensaje(`juego terminado, la palabra era: "${juego.palabra}"`, 'error');
    setTimeout(() => reiniciarJuego(), 3000);
}

//Pausar / reanudar
function alternarPausa() {
    if (!juego.iniciado) {
        return;
    }
    juego.pausado = !juego.pausado;

    if (juego.pausado) {
        elementos.pauseBtn.textContent = '▶️ Reanudar';
        mostrarMensaje('Juego en pausa.', 'info');
    } else {
        elementos.pauseBtn.textContent = '⏸️ Pausa';
        mostrarMensaje('Juego reanudado.', 'success');
    }
}

// Terminar
function terminarJuego() {
    juego.iniciado = false;
    clearInterval(juego.timer);

    //desactiva todas las letras del teclado
    document.querySelectorAll('.letter-btn').forEach(btn => btn.disabled = true);

    //mostrar boton iniciar
    elementos.startBtn.style.display = 'inline-block';
    elementos.pauseBtn.style.display = 'none';

}

function resolverPalabra() {
    if (!juego.iniciado || juego.pausado) {
        return;
    }
    //Revelar todas las letras de la palabra
    juego.palabraAdivinada = juego.palabra.split('');
    // Marcar todos los aciertos según el largo de la palabra
    juego.aciertos = juego.palabra.length;
    //desactiva todas las letras del teclado
    document.querySelectorAll('.letter-btn').forEach(btn => btn.disabled = true);
    actualizarPantalla();
    mostrarMensaje(`¡Palabra resuelta! Era "${juego.palabra}".`, 'success');
    //pasa a la siguiente palabra después de 1.5 segundos
    setTimeout(() => siguientePalabra(), 1500);
}

// Usuario y contraseña
const usuarioValido = "admin";
const claveValida = "1234";

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se recargue la página

    const usuario = document.getElementById("usuario").value;
    const clave = document.getElementById("clave").value;

    if (usuario === usuarioValido && clave === claveValida) {
        alert("¡Bienvenido al juego de ahorcado!");
        // Aquí puedes redirigir, por ejemplo:
        window.location.href = "Juego.jsp";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});
