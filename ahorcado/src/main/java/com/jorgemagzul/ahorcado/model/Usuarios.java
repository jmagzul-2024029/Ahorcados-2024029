package com.jorgemagzul.ahorcado.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Usuarios")
public class Usuarios {

    //mapeo
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //que se genere el id porque es auto increment
    private Integer idUsuario;

    @Column(name = "correoUsuario")
    @Email(message = "Debe ser un correo electrónico válido")
    // para que funcione hasta la parte del dominio          //que tenga al menos dos letras después del punto
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",
            message = "El correo debe tener un dominio completo, como .com, .net, etc.")
    @NotBlank(message = "El correo no puede estar vacío") // para que se indique que se debe llenar el campo sí o sí
    private String correoUsuario;

    @Column(name = "contrasena")
    @NotBlank(message = "La contraseña no puede estar vacía")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String contrasena;

    //setters and getters


    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getCorreoUsuario() {
        return correoUsuario;
    }

    public void setCorreoUsuario(String correoUsuario) {
        this.correoUsuario = correoUsuario;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
}
