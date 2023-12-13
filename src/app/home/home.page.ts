import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pokemons: any;
  filtro: string = '';
  tipoSeleccionado1: string = '';
  tipoSeleccionado2: string = '';
  tiposDisponibles: string[] = [
    'Acero', //#60A1B8
    'Agua', //#2980EF
    'Bicho', //#91A119
    'Dragón', //#5364E3
    'Eléctrico', //#FBC202
    'Fantasma', //#704170
    'Fuego', //#E62829
    'Hada', //#EF71EF
    'Hielo', //#3DD9FF
    'Lucha', //#FF8100
    'Normal', //#9FA19F
    'Planta', //#4BA736
    'Psíquico', //#EF4179
    'Roca', //#AFA981
    'Siniestro', //#50413F
    'Tierra', //#915121
    'Veneno', //#8F41CB
    'Volador', //#81B9EF
  ];
  listaCompletaPokemons: any;

  constructor(private httpClient: HttpClient) {
    this.httpClient
      .get(
        'https://raw.githubusercontent.com/jleocan773/HLC_Agenda/main/json/pokebien.json'
      )
      .pipe(map((res: any) => res))
      .subscribe((data) => {
        this.listaCompletaPokemons = data;
        this.pokemons = data;
      });
  }

  filtrarPorNombre() {
    if (this.filtro.trim() !== '') {
      const filtroLowerCase = this.filtro.toLowerCase();
      this.pokemons = this.listaCompletaPokemons.filter((pokemon: any) => {
        return pokemon.name.english.toLowerCase().includes(filtroLowerCase);
      });
    } else {
      this.pokemons = this.listaCompletaPokemons;
    }
  }

  filtrarPorTipo() {
    let pokemonFiltrados = this.listaCompletaPokemons;
  
    // Filtrar por tipo si se han seleccionado tipos
    if (this.tipoSeleccionado1 !== '' || this.tipoSeleccionado2 !== '') {
      const tipo1 = this.tipoSeleccionado1;
      const tipo2 = this.tipoSeleccionado2;
  
      pokemonFiltrados = pokemonFiltrados.filter((pokemon: any) => {
        const tiposPokemon = pokemon.type;
  
        if (tipo1 !== '' && tipo2 !== '') {
          return tiposPokemon.includes(tipo1) && tiposPokemon.includes(tipo2);
        } else {
          return tiposPokemon.includes(tipo1) || tiposPokemon.includes(tipo2);
        }
      });
    }
  
    this.pokemons = pokemonFiltrados;
  }
    
  
  // getColorClass(type: string): string {
  //   switch (type) {
  //     case 'Acero':
  //       return 'tipo-acero';
  //     case 'Agua':
  //       return 'tipo-agua';
  //     case 'Bicho':
  //       return 'tipo-bicho';
  //     case 'Dragón':
  //       return 'tipo-dragón';
  //     case 'Eléctrico':
  //       return 'tipo-eléctrico';
  //     case 'Fantasma':
  //       return 'tipo-fantasma';
  //     case 'Fuego':
  //       return 'tipo-fuego';
  //     case 'Hada':
  //       return 'tipo-hada';
  //     case 'Hielo':
  //       return 'tipo-hielo';
  //     case 'Lucha':
  //       return 'tipo-lucha';
  //     case 'Normal':
  //       return 'tipo-normal';
  //     case 'Planta':
  //       return 'tipo-planta';
  //     case 'Psíquico':
  //       return 'tipo-psíquico';
  //     case 'Roca':
  //       return 'tipo-roca';
  //     case 'Siniestro':
  //       return 'tipo-siniestro';
  //     case 'Tierra':
  //       return 'tipo-tierra';
  //     case 'Veneno':
  //       return 'tipo-veneno';
  //     case 'Volador':
  //       return 'tipo-volador';
  //     default:
  //       return '';
  //   }
  // }

  getDualTypeClass(types: string[]): string {
    if (types.length === 2) {
      const dualTypeClass = `tipo-${types[0].toLowerCase()}-${types[1].toLowerCase()}`;
      return dualTypeClass;
    } else if (types.length === 1) {
      const singleTypeClass = `tipo-${types[0].toLowerCase()}`;
      return singleTypeClass;
    }
    return '';
  }
  


}
