import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-profile',
  standalone: true, // Important pour standalone components
  imports: [RouterModule, DatePipe],
  templateUrl: './pokemon-profile.html',
  styles: ``
})
export class PokemonProfile implements OnDestroy {

  readonly #route = inject(ActivatedRoute);
  readonly #pokemonService = inject(PokemonService);

  readonly pokemon = signal<any>(null);
  private subscription: Subscription;

  constructor() {
    // Abonnement aux paramètres de la route
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
