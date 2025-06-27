import { Injectable } from '@angular/core';
import { POKEMON_LIST } from './pokemon-list.fake';
import { Pokemon, PokemonList } from './pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  getPokemonList(): PokemonList{
    return POKEMON_LIST;
  }
 getPokemonById(id: number): Pokemon {
  const pokemon = POKEMON_LIST.find((Pokemon) => Pokemon.id === id);
  if (!pokemon) {
    throw new Error(`No Pokemon with id ${id}`);
  }
  return pokemon;
}

  getPokemonTypeList():string[]{
    return[
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrick',
      'Poison',
      'Fée',
      'Vol',
    ]
   
  }
}
