package com.jorgemagzul.ahorcado.service;

import com.jorgemagzul.ahorcado.model.Usuarios;

import java.util.List;

public interface UsuariosService {
    List<Usuarios> getAllUsuarios();
    Usuarios getUsuarioById(Integer idUsuario);
    Usuarios getUsuarioByCorreo(String correoUsuario);
    Usuarios saveUsuario(Usuarios usuarios);
    Usuarios updateUsuario(Integer idUsuario, Usuarios usuarios);
    void deleteUsuario(Integer idUsuario);
}