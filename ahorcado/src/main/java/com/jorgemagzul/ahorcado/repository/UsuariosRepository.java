package com.jorgemagzul.ahorcado.repository;

import com.jorgemagzul.ahorcado.model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuariosRepository extends JpaRepository<Usuarios, Integer> {

    Usuarios findByCorreoUsuario(String correoUsuario);

    //Validaciones para agregar registros:

    // Verificar si ya existe un correo igual
    boolean existsByCorreoUsuario(String correoUsuario);

    // Validaciones para actualizar:

    //ver email ya está en uso
    boolean existsByCorreoUsuarioAndIdUsuarioNot(String correoUsuario, Integer idUsuario);

}