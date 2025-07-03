import { Component, computed, inject, signal } from '@angular/core';
import { Pokemon } from '../../pokemon.model';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';
import { PokemonBorder } from '../../pokemon-border';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonBorder, DatePipe, RouterModule],
  templateUrl: './pokemon-list.html',
  styles: ``
})
export class PokemonList {
  readonly #pokemonService = inject(PokemonService);

  // Convertir l'Observable de Firestore en signal Angular
  readonly pokemonList = toSignal(this.#pokemonService.getPokemonList(), {
    initialValue: [],
  });

  readonly searchTerm = signal('');

  // Computed pour filtrer la liste selon le terme de recherche
  readonly pokemonListFiltered = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const pokemons = this.pokemonList();
    return pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(search)
    );
  });

  // Pour indiquer un chargement (ex: afficher spinner si vide)
  readonly loading = computed(() => this.pokemonList().length === 0);

  // Exemple simple de fonctions d'update locale (modifier l'objet pokemon)
  increLife(pokemon: Pokemon) {
    pokemon.life = (pokemon.life ?? 0) + 1;
  }

  decreLife(pokemon: Pokemon) {
    pokemon.life = (pokemon.life ?? 0) - 1;
  }

  size(pokemon: Pokemon): string {
    if (pokemon.life > 25) return 'Grand';
    if (pokemon.life > 15) return 'Moyen';
    return 'Petit';
  }

  // Suppression du code lié à "form" qui n'est pas défini ici.
  // Tu peux l'ajouter plus tard avec ReactiveForms si besoin.

  bonjour() {
    console.log('Hello !');
  }
}
