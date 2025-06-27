import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pokemon, PokemonList } from './pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly POKEMON_API = 'http://localhost:3000/pokemons/';

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste complète des pokémons depuis l'API
   */
  getPokemonList(): Observable<PokemonList> {
    return this.http.get<PokemonList>(this.POKEMON_API);
  }

  /**
   * Récupère un Pokémon par son identifiant (version API)
   */
  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.POKEMON_API}${id}`);
  }

  /**
   * Met à jour un Pokémon existant via l'API
   */
  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const url = `${this.POKEMON_API}${pokemon.id}`;
    return this.http.put<Pokemon>(url, pokemon);
  }

  /**
   * Retourne une liste statique des types de Pokémons
   */
  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrick',
      'Poison',
      'Fée',
      'Vol',
    ];
  }
}
