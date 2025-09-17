package com.jorgemagzul.ahorcado.service;

import com.jorgemagzul.ahorcado.model.Usuarios;
import com.jorgemagzul.ahorcado.repository.UsuariosRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuariosServiceImpl implements UsuariosService{

    private final UsuariosRepository usuariosRepository;

    public UsuariosServiceImpl(UsuariosRepository usuariosRepository) { //constructor
        this.usuariosRepository = usuariosRepository;
    }

    @Override
    public List<Usuarios> getAllUsuarios() {
        return usuariosRepository.findAll();
    }

    @Override
    public Usuarios getUsuarioByCorreo(String correoUsuario) {
        return usuariosRepository.findByCorreoUsuario(correoUsuario);
    }

    @Override
    public Usuarios getUsuarioById(Integer idUsuario) {
        return usuariosRepository.findById(idUsuario).orElse(null);
    }

    @Override
    public Usuarios saveUsuario(Usuarios usuarios) {
        // Validar que el correo sea único
        if (usuariosRepository.existsByCorreoUsuario(usuarios.getCorreoUsuario())) {
            throw new IllegalArgumentException("Este correo ya existe, intenta de nuevo.");
        }
        return usuariosRepository.save(usuarios);
    }

    @Override
    public Usuarios updateUsuario(Integer idUsuario, Usuarios usuarios) {
        Usuarios existinUsuarios = usuariosRepository.findById(idUsuario).orElse(null);
        if (existinUsuarios != null) {
            // Validar que el correo sea único al actualizar
            if (!existinUsuarios.getCorreoUsuario().equals(usuarios.getCorreoUsuario())
                    && usuariosRepository.existsByCorreoUsuarioAndIdUsuarioNot(usuarios.getCorreoUsuario(), idUsuario)) {
                throw new IllegalArgumentException("Este correo ya está en uso, intenta con otros datos.");
            }
            existinUsuarios.setCorreoUsuario(usuarios.getCorreoUsuario());
            existinUsuarios.setContrasena(usuarios.getContrasena());
            return usuariosRepository.save(existinUsuarios);
        }
        return null;
    }

    @Override
    public void deleteUsuario(Integer idUsuario) {
        usuariosRepository.deleteById(idUsuario);
    }
}