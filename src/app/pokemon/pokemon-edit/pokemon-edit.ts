import { Component, inject, signal, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getPokemonColor, POKEMON_RULES, Pokemon } from '../../pokemon.model';
import { NgFor, NgIf } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './pokemon-edit.html',
})
export class PokemonEdit {
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly pokemonService = inject(PokemonService);

  // Firestore IDs sont des strings, on récupère l'id en string
  readonly pokemonId = signal(this.route.snapshot.paramMap.get('id') ?? '');

  // Convert Observable Firestore en signal (évite subscription manuelle)
  readonly pokemon = toSignal(
    this.pokemonService.getPokemonById(this.pokemonId()),
    { initialValue: null }
  );

  form!: FormGroup;

  constructor() {
    // Dès que le signal pokemon change, on initialise ou met à jour le formulaire
    effect(() => {
      const poke = this.pokemon();
      if (poke) {
        this.initForm(poke);
      }
    });
  }

  private initForm(poke: Pokemon) {
    this.form = new FormGroup({
      name: new FormControl(poke.name, [
        Validators.required,
        Validators.minLength(POKEMON_RULES.MIN_NAME),
        Validators.maxLength(POKEMON_RULES.MAX_NAME),
        Validators.pattern(POKEMON_RULES.NAME_PATTERN),
      ]),
      life: new FormControl(poke.life, [
        Validators.required,
        Validators.min(POKEMON_RULES.MIN_LIFE),
        Validators.max(POKEMON_RULES.MAX_LIFE),
      ]),
      damage: new FormControl(poke.damage, [
        Validators.required,
        Validators.min(POKEMON_RULES.MIN_DAMAGE),
        Validators.max(POKEMON_RULES.MAX_DAMAGE),
      ]),
      types: new FormArray(poke.types.map(type => new FormControl(type))),
    });
  }

  get pokemonTypeList(): FormArray {
    return this.form.get('types') as FormArray;
  }

  isPokemonTypeSelected(type: string): boolean {
    return this.pokemonTypeList.controls.some(control => control.value === type);
  }

  onPokemonTypeChange(type: string, isChecked: boolean) {
    if (isChecked) {
      if (!this.isPokemonTypeSelected(type)) {
        this.pokemonTypeList.push(new FormControl(type));
      }
    } else {
      const index = this.pokemonTypeList.controls.findIndex(control => control.value === type);
      if (index !== -1) {
        this.pokemonTypeList.removeAt(index);
      }
    }
  }

  getPokemonColor(type: string) {
    return getPokemonColor(type);
  }

  onDelete() {
    if (!confirm('Voulez-vous vraiment supprimer ce Pokémon ?')) return;

    this.pokemonService.deletePokemon(this.pokemonId())
      .then(() => {
        console.log('Pokémon supprimé');
        this.router.navigateByUrl('/pokemons');
      })
      .catch((err: any) => console.error('Erreur suppression', err));
  }

  onSubmit() {
    if (
      this.pokemonTypeList.length < POKEMON_RULES.MIN_TYPES ||
      this.pokemonTypeList.length > POKEMON_RULES.MAX_TYPES
    ) {
      console.error(
        `Le nombre de types doit être entre ${POKEMON_RULES.MIN_TYPES} et ${POKEMON_RULES.MAX_TYPES}.`
      );
      return;
    }

    if (this.form.invalid) {
      console.error('Le formulaire est invalide, merci de corriger les erreurs.');
      return;
    }

    const updatedPokemon: Pokemon = {
      ...this.pokemon()!, 
      ...this.form.value  
    };

    this.pokemonService.updatePokemon(updatedPokemon)
      .then(() => {
        console.log('Pokémon mis à jour avec succès !');
        window.alert('Modification réussie !');
        this.router.navigateByUrl('/pokemons');
      })
      .catch((err: any) => {
        console.error("Erreur lors de la mise à jour :", err);
      });
  }
}
