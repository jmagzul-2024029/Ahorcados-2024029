<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Juego de Ahorcado</title>
        <link rel="stylesheet" href="css/styles.css">
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

        <div class="wrapper">
            <form id="loginForm" action="Validar" method="POST">
                <h1>Login</h1>
                
                <!-- Mostrar mensaje de error si existe -->
                <% if (request.getAttribute("error") != null) { %>
                    <div class="error-message" style="color: red; text-align: center; margin-bottom: 15px; padding: 10px; border: 1px solid red; border-radius: 5px; background-color: #ffe6e6;">
                        <%= request.getAttribute("error") %>
                    </div>
                <% } %>
                
                <div class="input-box">
                    <input type="email" placeholder="Correo electrónico" name="usuario" id="usuario" required>
                    <i class="bx bxs-user"></i>
                </div>
                <div class="input-box">
                    <input type="password" placeholder="Contraseña" name="contrasena" id="clave" required>
                    <i class="bx bxs-lock-alt"></i>
                </div>
                <div class="remember-forgot">
                    <label><input type="checkbox">Recordar</label>
                    <a href="#">¿Olvidaste la contraseña?</a>
                </div>
                
                <input type="hidden" name="accion" value="Ingresar"><!-- Campo oculto para indicar la acción -->
                
                <button type="submit" class="btn">Login</button>

                <div class="register-link">
                    <p>¿No tienes una cuenta?<a href="#">Regístrate</a></p>
                </div>
            </form>
        </div>
        <script src="script/script.js"></script>
    </body>
</html>