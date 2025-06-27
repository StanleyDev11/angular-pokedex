import { DatePipe, JsonPipe,  } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getPokemonColor, POKEMON_RULES } from '../../pokemon.model';


@Component({
  selector: 'app-pokemon-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './pokemon-edit.html',
  styles: ``,


})
export class PokemonEdit {
  [x: string]: any;

  // Injection des dépendances
  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);

  // Récupération de l'ID depuis l'URL et sécurisation avec un fallback à 0
  readonly pokemonId = signal(Number(this.route.snapshot.paramMap.get('id') ?? 0)).asReadonly();

  // Récupération du Pokémon, avec vérification de sa présence
  readonly pokemon = signal(
    this.pokemonService.getPokemonById(this.pokemonId())
  ).asReadonly();

  // Formulaire initialisé à partir du Pokémon avec validation selon POKEMON_RULES
  readonly form = new FormGroup({
    name: new FormControl(this.pokemon().name, [
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_NAME),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.pattern(POKEMON_RULES.NAME_PATTERN),
    ]),
    life: new FormControl(this.pokemon().life, [
      Validators.required,
      Validators.min(POKEMON_RULES.MIN_LIFE),
      Validators.max(POKEMON_RULES.MAX_LIFE),
    ]),
    damage: new FormControl(this.pokemon().damage, [
      Validators.required,
      Validators.min(POKEMON_RULES.MIN_DAMAGE),
      Validators.max(POKEMON_RULES.MAX_DAMAGE),
    ]),
    types: new FormArray(
      this.pokemon().types.map((type) => new FormControl(type))
    ),
  });



  // Raccourci pour accéder à l'array des types
  get pokemonTypeList(): FormArray {
    return this.form.get('types') as FormArray;
  }

  // Vérifie si un type est déjà sélectionné
  isPokemonTypeSelected(type: string): boolean {
    return this.pokemonTypeList.controls.some(
      (control) => control.value === type
    );
  }

  // Ajoute ou retire un type selon le statut de la case à cocher
  onPokemonTypeChange(type: string, isChecked: boolean) {
    if (isChecked) {
      if (!this.isPokemonTypeSelected(type)) {
        this.pokemonTypeList.push(new FormControl(type));
      }
    } else {
      const index = this.pokemonTypeList.controls.findIndex(
        (control) => control.value === type
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
    // Vérification du nombre de types sélectionnés
    if (
      this.pokemonTypeList.length < POKEMON_RULES.MIN_TYPES ||
      this.pokemonTypeList.length > POKEMON_RULES.MAX_TYPES
    ) {
      console.error(
        `Le nombre de types doit être entre ${POKEMON_RULES.MIN_TYPES} et ${POKEMON_RULES.MAX_TYPES}.`
      );
      return;
    }

    // Vérifie que le formulaire est valide
    if (this.form.invalid) {
      console.error('Le formulaire est invalide, merci de corriger les erreurs.');
      return;
    }

    // Si tout est ok, on peut envoyer les données
    console.log('Formulaire validé : ', this.form.value);
  }

  get pokemonNanme():FormControl{
    return this.form.get('name') as FormControl;
  }
  
}
