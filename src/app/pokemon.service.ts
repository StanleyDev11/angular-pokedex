import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { Pokemon, PokemonList } from './pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly POKEMON_API = 'http://localhost:3000/pokemons/';

  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<PokemonList> {
    return this.http.get<PokemonList>(this.POKEMON_API);
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.POKEMON_API}${id}`);
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const url = `${this.POKEMON_API}${pokemon.id}`;
    return this.http.put<Pokemon>(url, pokemon);
  }

  deletePokemon(id: number): Observable<void> {
    const url = `${this.POKEMON_API}${id}`;
    return this.http.delete<void>(url);
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.POKEMON_API, pokemon).pipe(
      tap((newPokemon: Pokemon) => console.log(`Nouveau Pokémon ajouté : ${newPokemon.name}`)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur est survenue:', error);
    // Tu peux adapter ce message d’erreur pour l’utilisateur
    return throwError(() => new Error('Erreur lors de la requête. Veuillez réessayer plus tard.'));
  }

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
