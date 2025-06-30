import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-profile',
  standalone: true,
  imports: [RouterModule, DatePipe],
  templateUrl: './pokemon-profile.html',
  styles: ``
})
export class PokemonProfile implements OnDestroy {
  readonly #route = inject(ActivatedRoute);
  readonly #pokemonService = inject(PokemonService);
  readonly #router = inject(Router);

  readonly pokemon = signal<any>(null);
  private subscription: Subscription;

  constructor() {
    this.subscription = this.#route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      if (!isNaN(id)) {
        this.#pokemonService.getPokemonById(id).subscribe({
          next: (data) => this.pokemon.set(data),
          error: (err) => console.error('Erreur de chargement du Pokémon :', err)
        });
      }
    });
  }

  onDelete() {
    if (!confirm('Voulez-vous vraiment supprimer ce Pokémon ?')) return;

    const poke = this.pokemon();
    if (!poke?.id) return;

    this.#pokemonService.deletePokemon(poke.id).subscribe({
      next: () => {
        console.log('Pokémon supprimé');
        this.#router.navigateByUrl('/pokemons');
      },
      error: (err) => console.error('Erreur suppression', err),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
