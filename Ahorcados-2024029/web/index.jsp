<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Juego de Ahorcado</title>
        <link rel="stylesheet" href="css/styles.css">
    </head>
    <body>

        <!-- Formulario popup -->
        <div class="form-popup">
            <div class="form-box login">
                <div class="form-details">
                    <h2>¡¡Bienvenido!!</h2>
                    <p>Por favor inicia sesión con tus datos para poder empezar a jugar ya</p>
                    <div class="decorative-element"></div>
                </div>
                <div class="form-content">
                    <h2>LOGIN</h2>
                    <form id="loginForm" action="Validar" method="POST">
                        <!-- Mostrar mensaje de error si existe -->
                        <div class="error-message" id="errorMessage" style="display: none;">
                            <!-- Aquí se mostraría el error desde el servidor -->
                        </div>

                        <div class="input-field">
                            <input type="email" name="usuario" id="usuario" required>
                            <label>Correo electrónico</label>
                            <i class="bx bxs-user"></i>
                        </div>

                        <div class="input-field">
                            <input type="password" name="contrasena" id="clave" required>
                            <label>Contraseña</label>
                            <i class="bx bxs-lock-alt"></i>
                        </div>

                        <input type="hidden" name="accion" value="Ingresar">


                        <button type="submit" class="login-btn">Iniciar Sesión</button>
                    </form>
                </div>
            </div>
        </div>

        <div class="header">
            <!--Waves Container-->
            <div>
                <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                     viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g class="parallax">
                <use href="#gentle-wave" x="48" y="0" fill="rgba(25, 25, 112, 0.7)" />   <!-- Midnight Blue -->
                <use href="#gentle-wave" x="48" y="3" fill="rgba(0, 0, 139, 0.5)" />     <!-- Dark Blue -->
                <use href="#gentle-wave" x="48" y="5" fill="rgba(70, 130, 180, 0.3)" />  <!-- Steel Blue -->
                <use href="#gentle-wave" x="48" y="7" fill="rgba(65, 105, 225, 0.9)" />  <!-- Royal Blue -->
                </g>
                </svg>
            </div>
            <!--Waves end-->

        </div>
        <script src="script/script.js"></script>
    </body>

    <!-- Olas superiores -->
    <div class="header top-waves">
        <svg class="waves top" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
        <path id="gentle-wave-top" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
        <use href="#gentle-wave" x="48" y="0" fill="rgba(25, 25, 112, 0.7)" />   <!-- Midnight Blue -->
        <use href="#gentle-wave" x="48" y="3" fill="rgba(0, 0, 139, 0.5)" />     <!-- Dark Blue -->
        <use href="#gentle-wave" x="48" y="5" fill="rgba(70, 130, 180, 0.3)" />  <!-- Steel Blue -->
        <use href="#gentle-wave" x="48" y="7" fill="rgba(65, 105, 225, 0.9)" />  <!-- Royal Blue -->
        </g>
        </svg>
    </div>

</html>