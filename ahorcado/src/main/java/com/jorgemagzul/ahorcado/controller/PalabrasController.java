package com.jorgemagzul.ahorcado.controller;

import com.jorgemagzul.ahorcado.model.Palabras;
import com.jorgemagzul.ahorcado.service.PalabrasService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/Palabras")

public class PalabrasController {

    private final PalabrasService palabrasService;

    public PalabrasController(PalabrasService palabrasService) {
        this.palabrasService = palabrasService;
    }

    @GetMapping
    public List<Palabras> getAllPalabra() {
        return palabrasService.getAllPalabra();
    }

    @GetMapping("/{idPalabra}")
    public Palabras getPalabraById(@PathVariable Integer idPalabra) {
        return palabrasService.getPalabraById(idPalabra);
    }

    @PostMapping
    public Palabras createPalabras(@RequestBody Palabras cliente) {
        return palabrasService.savePalabra(cliente);
    }

    @PutMapping("/{idPalabra}")
    public Palabras updatePalabras(@PathVariable Integer idPalabra, @RequestBody Palabras cliente) {
        return palabrasService.updatePalabra(idPalabra, cliente);
    }

    @DeleteMapping("/{idPalabra}")
    public void deletePalabras(@PathVariable Integer idPalabra) {
        palabrasService.deletePalabra(idPalabra);
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
