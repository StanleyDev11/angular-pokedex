import { Component, inject, signal, effect } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getPokemonColor, POKEMON_RULES, Pokemon } from '../../pokemon.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-pokemon-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './pokemon-edit.html',
})
export class PokemonEdit {
  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);

  readonly pokemonId = signal(Number(this.route.snapshot.paramMap.get('id') ?? 0));

  // Signal qui contiendra le Pokémon (null au départ)
  readonly pokemon = signal<Pokemon | null>(null);

  // FormGroup initialisé plus tard
  form!: FormGroup;

  constructor() {
    // On récupère le Pokémon via l'Observable et on met à jour le signal pokemon
    this.pokemonService.getPokemonById(this.pokemonId()).subscribe({
      next: (poke) => this.pokemon.set(poke),
      error: (err) => console.error('Erreur chargement pokemon', err),
    });

    // Effet déclenché à chaque fois que le signal pokemon change
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
    return this.pokemonTypeList.controls.some(
      control => control.value === type
    );
  }

  onPokemonTypeChange(type: string, isChecked: boolean) {
    if (isChecked) {
      if (!this.isPokemonTypeSelected(type)) {
        this.pokemonTypeList.push(new FormControl(type));
      }
    } else {
      const index = this.pokemonTypeList.controls.findIndex(
        control => control.value === type
      );
      if (index !== -1) {
        this.pokemonTypeList.removeAt(index);
      }
    }
  }

  getPokemonColor(type: string) {
    return getPokemonColor(type);
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

    console.log('Formulaire validé : ', this.form.value);
  }

  get pokemonName(): FormControl {
    return this.form.get('name') as FormControl;
  }
}
