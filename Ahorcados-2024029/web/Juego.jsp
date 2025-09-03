<%-- 
    Document   : Juego
    Created on : 3 sept 2025, 09:48:51
    Author     : informatica
--%>

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
            <h1>🪢 Juego de Ahorcado</h1> 

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
                <button id="restartBtn">🔁 Reiniciar</button>
                <button id="pauseBtn">⏸ Pausa</button>
                <button id="exitBtn">✖️ Salir</button>
            </div>

            <!--imagen del ahorcado-->
            <div class="contenido">
                <div class="juego">
                    <h3>Estado del Ahorcado</h3>
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
