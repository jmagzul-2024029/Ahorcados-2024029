package controlador;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import modelo.Palabras;
import modelo.PalabrasDAO;


@WebServlet(name = "Controlador", urlPatterns = {"/Controlador"})
public class Controlador extends HttpServlet {


    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet Controlador</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Controlador at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        try {
            PalabrasDAO dao = new PalabrasDAO();
            List<Palabras> lista = dao.listar();

            // Construir JSON manualmente
            StringBuilder json = new StringBuilder();
            json.append("[");
            for (int i = 0; i < lista.size(); i++) {
                Palabras p = lista.get(i);
                json.append("{")
                        .append("\"idPalabra\":").append(p.getIdPalabra()).append(",")
                        .append("\"textoPalabra\":\"").append(p.getTextoPalabra()).append("\",")
                        .append("\"pista1\":\"").append(p.getPista1()).append("\",")
                        .append("\"pista2\":\"").append(p.getPista2()).append("\",")
                        .append("\"pista3\":\"").append(p.getPista3()).append("\"")
                        .append("}");
                if (i < lista.size() - 1) {
                    json.append(",");
                }
            }
            json.append("]");

            out.print(json.toString());

        } catch (Exception e) {
            e.printStackTrace();
            out.print("{\"error\":\"No se pudo obtener las palabras\"}");
        }
    }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
