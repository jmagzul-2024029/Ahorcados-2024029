package com.jorgemagzul.ahorcado.service;

import com.jorgemagzul.ahorcado.model.Palabras;
import com.jorgemagzul.ahorcado.repository.PalabrasRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PalabrasServiceImpl implements PalabrasService {

    private final PalabrasRepository palabrasRepository;

    public PalabrasServiceImpl(PalabrasRepository palabrasRepository) { //constructor
        this.palabrasRepository = palabrasRepository;
    }

    @Override
    public List<Palabras> getAllPalabra() {
        return palabrasRepository.findAll();
    }

    @Override
    public Palabras getPalabraById(Integer idPalabra) {
        return palabrasRepository.findById(idPalabra).orElse(null);
    }

    @Override
    public Palabras savePalabra(Palabras palabras) {
        //validar la duplicación de la palabra
        if (palabrasRepository.existsByTextoPalabra(palabras.getTextoPalabra())) {
            throw new IllegalArgumentException("Esta palabra ya existe en el juego, no pueden haber dos  iguales.");
        }
        return palabrasRepository.save(palabras);
    }

    @Override
    public Palabras updatePalabra(Integer idPalabra, Palabras palabras) {
        Palabras existinPalabras = palabrasRepository.findById(idPalabra).orElse(null);
        if (existinPalabras != null) {//si es diferente a null

            if ((!existinPalabras.getTextoPalabra().equals(palabras.getTextoPalabra()))
                    && palabrasRepository.existsByTextoPalabraAndIdPalabraNot(palabras.getTextoPalabra(), idPalabra)) {
                throw new IllegalArgumentException("Esta palabra ya está registrada");
            }

            //actualizar campos
            existinPalabras.setTextoPalabra(palabras.getTextoPalabra());
            existinPalabras.setPista1(palabras.getPista1());
            existinPalabras.setPista2(palabras.getPista2());
            existinPalabras.setPista3(palabras.getPista3());

            return palabrasRepository.save(existinPalabras);
        }
        return null;
    }

    @Override
    public void deletePalabra(Integer idPalabra) {
        palabrasRepository.deleteById(idPalabra);
    }
}
