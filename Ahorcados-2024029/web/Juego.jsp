<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Juego de Ahorcado</title>
        <link rel="stylesheet" href="css/Juego.css">
    </head>
    <body>
        <!-- para el fondo-->
        <div class="area" >
            <ul class="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div >

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

            <!--Mensajes-->
            <div id="gameMessage" class="mensaje"></div>

            <!--Controles de juego-->
            <div class="controls">
                <button id="logOut"><svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z"></path></g></svg>Cerrar sesión</button>
                <button id="startBtn">▶ Iniciar</button>
                <button id="restartBtn" ><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, -1, 0, 0)" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_429_11071)"> <path d="M12 2.99982C16.9706 2.99982 21 7.02925 21 11.9998C21 16.9704 16.9706 20.9998 12 20.9998C7.02944 20.9998 3 16.9704 3 11.9998C3 9.17255 4.30367 6.64977 6.34267 4.99982" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 4.49982H7V8.49982" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_429_11071"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg> Reiniciar</button>
                <button id="pauseBtn">⏸ Pausa</button>
                <button id="exitBtn"><svg fill="#ffffff" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 351.228 351.228" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M258.915,27.652c-1.161-0.642-2.53-0.794-3.803-0.428c-1.275,0.367-2.35,1.226-2.992,2.387l-21.758,39.39 c-1.335,2.417-0.458,5.459,1.96,6.794c37.498,20.713,60.793,60.155,60.793,102.933c0,64.79-52.71,117.5-117.5,117.5 s-117.5-52.71-117.5-117.5c0-42.778,23.294-82.22,60.792-102.933c2.418-1.335,3.294-4.377,1.96-6.794l-21.758-39.39 c-0.642-1.161-1.717-2.02-2.992-2.387c-1.272-0.368-2.642-0.214-3.803,0.428c-55.02,30.391-89.2,88.28-89.2,151.076 c0,95.117,77.383,172.5,172.5,172.5s172.5-77.383,172.5-172.5C348.114,115.933,313.935,58.043,258.915,27.652z"></path> <path d="M153.114,181.16h45c2.761,0,5-2.239,5-5V5c0-2.761-2.239-5-5-5h-45c-2.761,0-5,2.239-5,5v171.16 C148.114,178.921,150.353,181.16,153.114,181.16z"></path> </g> </g></svg>Dejar de jugar</button>
                <button id="resolverBtn" class="game-btn" style="display: none" onclick="resolverPalabra()"><svg fill="#ffffff" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 19.5039 43.1524 L 36.4726 43.1524 C 37.2695 43.1524 37.7617 42.6602 37.7617 41.8633 L 37.7617 38.1133 C 37.7617 32.4414 46.0117 28.7852 46.0117 18.6602 C 46.0117 7.9961 38.7930 .8711 27.9883 .8711 C 17.1836 .8711 9.9883 7.9961 9.9883 18.6602 C 9.9883 28.7852 18.2148 32.4414 18.2148 38.1133 L 18.2148 41.8633 C 18.2148 42.6602 18.7304 43.1524 19.5039 43.1524 Z M 20.3711 49.4805 L 35.6055 49.4805 C 36.8008 49.4805 37.7617 48.4961 37.7617 47.2774 C 37.7617 46.0586 36.8008 45.0742 35.6055 45.0742 L 20.3711 45.0742 C 19.1758 45.0742 18.2148 46.0586 18.2148 47.2774 C 18.2148 48.4961 19.1758 49.4805 20.3711 49.4805 Z M 27.9883 55.1289 C 31.2226 55.1289 33.4961 53.6524 33.7304 51.3789 L 22.2461 51.3789 C 22.4570 53.6524 24.7304 55.1289 27.9883 55.1289 Z"></path></g></svg> Resolver</button>
            </div>

            <!--imagen del ahorcado-->
            <div class="contenido">
                <div class="juego">
                    <div class="hangman-container">
                        <img id="hangmanImage" alt="Estado del ahorcado">
                    </div>
                </div>

                <div id="resultado">
                    <!-- mostrar la imagen del resultado-->
                    <img id="imagenResultado" src="" alt="Resultado del juego">
                </div>
            </div>

            <img id="imagenResultado" src="" alt="Resultado" style="display:none; width: 200px; height: auto; margin-top: 10px;">

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
        </div>

        <script src="script/script.js"></script>
    </body>
</html>