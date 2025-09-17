package com.jorgemagzul.ahorcado.controller;


import com.jorgemagzul.ahorcado.model.Usuarios;
import com.jorgemagzul.ahorcado.service.UsuariosService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/Usuarios")

public class UsuariosController {

    private final UsuariosService usuariosService;

    public UsuariosController(UsuariosService usuariosService) {
        this.usuariosService = usuariosService;
    }

    @GetMapping
    public List<Usuarios> getAllUsuarios() {
        return usuariosService.getAllUsuarios();
    }

    @GetMapping("/{idUsuario}")
    public Usuarios getUsuarioById(@PathVariable Integer idUsuario) {
        return usuariosService.getUsuarioById(idUsuario);
    }

    @PostMapping
    public Usuarios createUsuarios(@Valid @RequestBody Usuarios usuarios) {
        return usuariosService.saveUsuario(usuarios);
    }

    @DeleteMapping("/{idUsuario}")
    public void deleteUsuario(@PathVariable Integer idUsuario) {
        usuariosService.deleteUsuario(idUsuario);
    }

    @PostMapping("/validar")
    public ResponseEntity<?> validarUsuario(@RequestBody Map<String, String> payload) {
        try {
            String email = payload.get("email");
            String password = payload.get("password");

            if (email == null || password == null) {
                return ResponseEntity.badRequest().body("Email y password requeridos");
            }

            Usuarios usuario = usuariosService.getUsuarioByCorreo(email);

            if (usuario != null && password.equals(usuario.getContrasena())) {
                return ResponseEntity.ok("Login exitoso");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error interno");
        }
    }

    //metodo para manejar los errores IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
    }

    //metodo para errores tipo ResponseStatusException
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<?> handlerResponseStatusException(ResponseStatusException ex) {
        return ResponseEntity.status(ex.getStatusCode()).body(Map.of("error", ex.getReason()));
    }
}