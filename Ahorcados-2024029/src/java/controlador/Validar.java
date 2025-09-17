package controlador;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import modelo.Palabras;
import modelo.PalabrasDAO;

@WebServlet(name = "Validar", urlPatterns = {"/Validar"})
public class Validar extends HttpServlet {

    PalabrasDAO palabrasDAO = new PalabrasDAO();
    Palabras palabras = new Palabras();
    
    // Configuración del puerto - cambia aquí si cambias el puerto de Spring
    private static final String SPRING_PORT = "8081";
    private static final String SPRING_URL = "http://localhost:" + SPRING_PORT + "/api/Usuarios/validar";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String accion = request.getParameter("accion");
        
        if ("Ingresar".equalsIgnoreCase(accion)) {
            String email = request.getParameter("usuario");
            String password = request.getParameter("contrasena");

            // Validar con Spring Boot
            if (validarUsuario(email, password)) {
                HttpSession session = request.getSession();
                session.setAttribute("cuentas", palabras);
                session.setAttribute("usuarioEmail", email);
                request.getRequestDispatcher("Juego.jsp").forward(request, response);
            } else {
                request.setAttribute("error", "Usuario o contraseña incorrectos");
                request.getRequestDispatcher("index.jsp").forward(request, response);
            }
        } else {
            request.getRequestDispatcher("index.jsp").forward(request, response);
        }
    }

private boolean validarUsuario(String email, String password) {
    try {
        URL url = new URL(SPRING_URL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);
        
        String json = "{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}";
        System.out.println("Enviando JSON: " + json); // AÑADIR
        System.out.println("URL: " + SPRING_URL); // AÑADIR
        
        conn.getOutputStream().write(json.getBytes());
        
        int responseCode = conn.getResponseCode();
        System.out.println("Response Code: " + responseCode); // AÑADIR
        
        return responseCode == 200;
    } catch (Exception e) {
        System.out.println("Error en validarUsuario: " + e.getMessage()); // AÑADIR
        return false;
    }
}

    @Override
    public String getServletInfo() {
        return "Servlet para validar usuarios";
    }
}