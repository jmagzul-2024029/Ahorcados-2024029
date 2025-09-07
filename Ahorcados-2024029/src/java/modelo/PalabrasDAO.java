package modelo;

import config.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class PalabrasDAO {

    Conexion cn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;
    int resp;

    public List<Palabras> listar() {
        List<Palabras> listarPalabras = new ArrayList<>();
        String sql = "{call sp_ListarPalabras()}";

        try {
            con = cn.Conexion();
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                Palabras pl = new Palabras();
                pl.setIdPalabra(rs.getInt(1));
                pl.setTextoPalabra(rs.getString(2));
                pl.setPista1(rs.getString(3));
                pl.setPista2(rs.getString(4));
                pl.setPista3(rs.getString(5));
                listarPalabras.add(pl);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return listarPalabras;
    }

    public int agregar(Palabras p) {
        String sql = "{call sp_AgregarPalabra(?, ?, ?, ?)}";

        try {
            con = cn.Conexion();
            ps = con.prepareStatement(sql);
            ps.setString(1, p.getTextoPalabra());
            ps.setString(2, p.getPista1());
            ps.setString(3, p.getPista2());
            ps.setString(4, p.getPista3());
            resp = ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (Exception e) {
            }
            try {
                if (con != null) {
                    con.close();
                }
            } catch (Exception e) {
            }
        }
        return resp;
    }
}