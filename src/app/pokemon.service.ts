import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp
} from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pokemon } from './pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonCollection;

  constructor(private firestore: Firestore) {
    this.pokemonCollection = collection(this.firestore, 'pokemons');
  }

  getPokemonList(): Observable<Pokemon[]> {
    return collectionData(this.pokemonCollection, { idField: 'id' }).pipe(
      map((pokemons) => (pokemons as Pokemon[]).map(p => this.convertTimestampToDate(p))),
      catchError(error => {
        console.error('Erreur getPokemonList:', error);
        return throwError(() => new Error('Erreur lors de la récupération des pokémons.'));
      })
    );
  }

  getPokemonById(id: string): Observable<Pokemon | undefined> {
    const pokemonDoc = doc(this.firestore, `pokemons/${id}`);
    return docData(pokemonDoc, { idField: 'id' }).pipe(
      map(pokemon => pokemon ? this.convertTimestampToDate(pokemon as Pokemon) : undefined),
      catchError(error => {
        console.error('Erreur getPokemonById:', error);
        return throwError(() => new Error('Erreur lors de la récupération du pokémon.'));
      })
    );
  }

  addPokemon(pokemon: Pokemon): Promise<void> {
    return addDoc(this.pokemonCollection, pokemon)
      .then(() => console.log('Pokémon ajouté'))
      .catch(error => {
        console.error('Erreur addPokemon:', error);
        throw new Error('Erreur lors de l’ajout du pokémon.');
      });
  }

  updatePokemon(pokemon: Pokemon): Promise<void> {
    if (!pokemon.id) {
      return Promise.reject(new Error('Pokémon ID manquant pour mise à jour'));
    }
    const pokemonDoc = doc(this.firestore, `pokemons/${pokemon.id}`);
    return updateDoc(pokemonDoc, { ...pokemon })
      .then(() => console.log('Pokémon mis à jour'))
      .catch(error => {
        console.error('Erreur updatePokemon:', error);
        throw new Error('Erreur lors de la mise à jour du pokémon.');
      });
  }

  deletePokemon(id: string): Promise<void> {
    const pokemonDoc = doc(this.firestore, `pokemons/${id}`);
    return deleteDoc(pokemonDoc)
      .then(() => console.log('Pokémon supprimé'))
      .catch(error => {
        console.error('Erreur deletePokemon:', error);
        throw new Error('Erreur lors de la suppression du pokémon.');
      });
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

  private convertTimestampToDate(pokemon: any): Pokemon {
    return {
      ...pokemon,
      created: (pokemon.created instanceof Timestamp) ? pokemon.created.toDate() : pokemon.created,
      update: (pokemon.update instanceof Timestamp) ? pokemon.update.toDate() : pokemon.update,
    };
  }
}
