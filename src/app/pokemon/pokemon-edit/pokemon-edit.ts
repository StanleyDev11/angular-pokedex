import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getPokemonColor } from '../../pokemon.model';

@Component({
  selector: 'app-pokemon-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './pokemon-edit.html',
  styles: ``,
  //Utiliser le JsonPipe pour déboguer  un formulaire réactif(ajout dans l'import)

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

  // Formulaire initialisé à partir du Pokémon
  readonly form = new FormGroup({
    name: new FormControl(this.pokemon().name),
    life: new FormControl(this.pokemon().life),
    damage: new FormControl(this.pokemon().damage),
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

getPokemonColor(type:string){
  return getPokemonColor(type)
}

  onSubmit(){
    console.log(this.form.value);
  }
}
