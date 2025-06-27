import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-profile',
  imports: [RouterModule,DatePipe],
  templateUrl: './pokemon-profile.html',
  styles: ``
})
export class PokemonProfile implements OnDestroy {

  readonly #route = inject(ActivatedRoute);
  readonly #pokemonService = inject(PokemonService);

  readonly pokemon = signal<any>(null);

  private subscription: Subscription;

  constructor() {
    // On s'abonne aux changements des paramètres de la route
    this.subscription = this.#route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      const found = this.#pokemonService.getPokemonById(id);
      this.pokemon.set(found);
    });
  }

  ngOnDestroy() {
    // On nettoie l'abonnement pour éviter les fuites mémoire
    this.subscription.unsubscribe();
  }
}
