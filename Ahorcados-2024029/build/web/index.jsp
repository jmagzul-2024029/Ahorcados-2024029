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
            <form id="loginForm" action="" method="POST">
                <h1>Login</h1>
                <div class="input-box">
                    <input type="text" placeholder="Usuario" name="usuario" id="usuario" required>
                    <i class="bx bxs-user"></i>
                </div>
                <div class="input-box">
                    <input type="password" placeholder="Contraseña" name="contraseña" id="clave" required>
                    <i class="bx bxs-lock-alt"></i>
                </div>
                <div class="remember-forgot">
                    <label><input type="checkbox">Recordar</label>
                    <a href="#">¿Olvidaste la contraseña?</a>
                </div>
                <button type="submit" class="btn">Login</button>

                <div class="register-link">
                    <p>¿No tienes una cuenta?<a href="#">Regirtrate</a></p>
                </div>
            </form>
        </div>
        <script src="script/script.js"></script>
    </body>
</html>