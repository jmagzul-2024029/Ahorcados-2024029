package com.jorgemagzul.ahorcado.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Palabras")
public class Palabras {

    //mapeo
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //que se genere el id porque es auto increment
    private Integer idPalabra;

    @Column(name = "textoPalabra") //de la base de datos, si no existe entonces la crea
    private String textoPalabra; //declarar lo de la base de datos pero ya en camelCase

    @Column(name = "pista1") //de la base de datos, si no existe entonces la crea
    private String pista1; //declarar lo de la base de datos pero ya en camelCase

    @Column(name = "pista2") //de la base de datos, si no existe entonces la crea
    private String pista2; //declarar lo de la base de datos pero ya en camelCase

    @Column(name = "pista3") //de la base de datos, si no existe entonces la crea
    private String pista3; //declarar lo de la base de datos pero ya en camelCase

    //setters and getters

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
}
