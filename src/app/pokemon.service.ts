import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

import { Pokemon, PokemonList } from './pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  [x: string]: any;
  private readonly POKEMON_API = 'http://localhost:3000/pokemons/';
  apiUrl: any;

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
 * Supprime un Pokémon via l'API à partir de son ID
 */
deletePokemon(id: number): Observable<void> {
  const url = `${this.POKEMON_API}${id}`;
  return this.http.delete<void>(url);
}
addPokemon(pokemon: Pokemon): Observable<Pokemon> {
  return this.http.post<Pokemon>(`${this.apiUrl}`, pokemon).pipe(
    tap((newPokemon: Pokemon) => console.log(`Nouveau Pokémon ajouté : ${newPokemon.name}`)),
    catchError(this.handleError<Pokemon>('addPokemon'))
  );
}
  handleError<T>(arg0: string): (err: any, caught: Observable<Pokemon>) => import("rxjs").ObservableInput<any> {
    throw new Error('Method not implemented.');
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


getColor(type: string): string {
  switch (type.toLowerCase()) {
    case 'plante': return 'green';
    case 'feu': return 'red';
    case 'eau': return 'blue';
    case 'insecte': return 'limegreen';
    case 'normal': return 'gray';
    case 'electrick': return 'gold';
    case 'poison': return 'purple';
    case 'fée': return 'pink';
    case 'vol': return 'skyblue';
    default: return 'lightgray';
  }
}

}
