<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Juego de Ahorcado</title>
        <link rel="stylesheet" href="css/Juego.css">
    </head>
    <body>
        <!--Líneas para el fondo-->
        <div class="lines">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>

        <div class="container">
            <h1>🪢🧍 Juego de Ahorcado 🧍🪢</h1> 

            <div class="stats"><!--Estadísticas-->
                <div class="stat">
                    <div id="currentWord">1</div>
                    <div>Palabra</div>
                </div>
                <div class="stat">
                    <div id="errorsCount">0</div>
                    <div>Errores</div>
                </div>
                <div class="stat">
                    <div id="correctGuesses">0</div>
                    <div>Aciertos</div>
                </div>
            </div>

            <div id="contador"> Tiempo 5:00</div>

            <!--Controles de juego-->
            <div class="controls">
                <button id="startBtn">▶ Iniciar</button>
                <button id="restartBtn"><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3V8M3 8H8M3 8L6 5.29168C7.59227 3.86656 9.69494 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.71683 21 4.13247 18.008 3.22302 14" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg> Reiniciar</button>
                <button id="pauseBtn">⏸ Pausa</button>
                <button id="exitBtn"><svg width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path></g></svg>Salir</button>
            </div>

            <!--imagen del ahorcado-->
            <div class="contenido">
                <div class="juego">
                    <div class="hangman-container">
                        <img id="hangmanImage" alt="Estado del ahorcado">
                    </div>
                </div>
            </div>

            <!--Mostrar la palabra-->
            <div id="wordDisplay">_ _ _ _ _ _ _ _</div>

            <!--Pistas-->
            <div class="pistas">
                <h3>💡 Pistas:</h3>
                <ul id="hintsList">
                    <li>Presiona iniciar para comenzar</li>
                </ul>
            </div>

            <!--Alfabeto-->
            <div id="alfabeto" class="alfabeto"></div>

            <!--Mensajes-->
            <div id="gameMessage" class="mensaje"></div>

            <!--Botón resolver-->
            <button class="button" onclick="resolverPalabra()">
                <span class="button__text">Resolver</span>
                <span class="button__icon">
                    <svg
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                        fill="currentColor"
                        ></path>
                    </svg>
                </span>
            </button>
        </div>

        <script src="script/script.js"></script>
    </body>
</html>
