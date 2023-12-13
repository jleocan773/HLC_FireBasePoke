import { Component } from '@angular/core';
import {Pokemon} from '../pokemon'
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pokemonEditando = {} as Pokemon;
  arrayColeccionPokemon: any = [{
    id: "",
    pokemon: {} as Pokemon
  }];
  idPokemonSelec: string = "";

  constructor(private firestoreService: FirestoreService) {
    this.obtenerListaPokemons();
  }

  clicBotonInsertar() {
    this.firestoreService.insertar("pokemons", this.pokemonEditando).then(() => {
      console.log('Pokemon creado correctamente');
      this.pokemonEditando= {} as Pokemon;
    }, (error) => {
      console.error(error);
    });
  }

  obtenerListaPokemons() {
    // Hacer una consulta cada vez que se detectan nuevos datos en la BD
    this.firestoreService.consultar("pokemons").subscribe((datosRecibidos) => {
      // Limpiar el array para que no se dupliquen los datos anteriores
      this.arrayColeccionPokemon = [];
      // Recorrer todos los datos recibidos de la BD
      datosRecibidos.forEach((datosPokemon) => {
        // Cada elemento de la BD se almacena en el array que se muestra en pantalla
        this.arrayColeccionPokemon.push({
          id: datosPokemon.payload.doc.id,
          pokemon: datosPokemon.payload.doc.data() as Pokemon
        });
      });
    });
  }
  

  selecPokemon(idPokemon: string, pokemonSelec: Pokemon) {
    this.pokemonEditando = pokemonSelec;
    this.idPokemonSelec = idPokemon;
  }
  

  clicBotonBorrar() {
    this.firestoreService.borrar("pokemons", this.idPokemonSelec).then(() => {
      console.log('Pokemon borrado correctamente');
      this.pokemonEditando= {} as Pokemon;
      this.idPokemonSelec = "";
    }, (error) => {
      console.error(error);
    });
  }

  clicBotonModificar(){
    this.firestoreService.modificar("pokemons", this.idPokemonSelec, this.pokemonEditando).then(() => {
      console.log('Pokemon editado correctamente');
    }, (error) => {
      console.error(error);
    });
  }

}