package modelo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Palabras")
public class Palabras implements Serializable {
    
        @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
        
    @Column(name = "idPalabra")
    private Integer idPalabra;
        
    @Column(name = "textoPalabra")
    private String textoPalabra;

    @Column(name = "pista1")
    private String pista1;
    
    @Column(name = "pista2")
    private String pista2;
    
    @Column(name = "pista3")
    private String pista3;

    public Palabras() {
    }

    public Palabras(Integer idPalabra, String textoPalabra, String pista1, String pista2, String pista3) {
        this.idPalabra = idPalabra;
        this.textoPalabra = textoPalabra;
        this.pista1 = pista1;
        this.pista2 = pista2;
        this.pista3 = pista3;
    }

    public Integer getIdPalabra() {
        return idPalabra;
    }

    public void setIdPalabra(Integer idPalabra) {
        this.idPalabra = idPalabra;
    }

    public String getTextoPalabra() {
        return textoPalabra;
    }

    public void setTextoPalabra(String textoPalabra) {
        this.textoPalabra = textoPalabra;
    }

    public String getPista1() {
        return pista1;
    }

    public void setPista1(String pista1) {
        this.pista1 = pista1;
    }

    public String getPista2() {
        return pista2;
    }

    public void setPista2(String pista2) {
        this.pista2 = pista2;
    }

    public String getPista3() {
        return pista3;
    }

    public void setPista3(String pista3) {
        this.pista3 = pista3;
    }

    @Override
    public String toString() {
        return "Palabras{" + "idPalabra=" + idPalabra + ", textoPalabra=" + textoPalabra + ", pista1=" + pista1 + ", pista2=" + pista2 + ", pista3=" + pista3 + '}';
    }
}