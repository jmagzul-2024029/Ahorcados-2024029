package com.jorgemagzul.ahorcado.repository;

import com.jorgemagzul.ahorcado.model.Palabras;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PalabrasRepository extends JpaRepository<Palabras, Integer> {

    //Validaciones para agregar registros:
    // Verificar si ya existe un correo igual
    boolean existsByTextoPalabra(String textoPalabra);

    // Validaciones para actualizar:

    //ver su el nombre, apellido y email nuevos son iguales a unos registros ya existentes
    boolean existsByTextoPalabraAndIdPalabraNot(String textoPalabra, Integer idPalabra);
}