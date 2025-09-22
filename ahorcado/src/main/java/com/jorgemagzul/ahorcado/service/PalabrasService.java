package com.jorgemagzul.ahorcado.service;

import com.jorgemagzul.ahorcado.model.Palabras;
import com.jorgemagzul.ahorcado.model.Usuarios;

import java.util.List;

public interface PalabrasService {
    List<Palabras> getAllPalabra();
    Palabras getPalabraById(Integer idPalabra);
    Palabras savePalabra(Palabras idPalabra);
    Palabras updatePalabra(Integer idPalabra, Palabras palabras);
    void deletePalabra(Integer idPalabra); //se crea un metodo
}