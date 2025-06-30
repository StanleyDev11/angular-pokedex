import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-pokemon-add',
  standalone: true,
  imports:[ReactiveFormsModule,NgIf,RouterModule],
  templateUrl: './pokemon-ajout.html',
  styles: ``
})
export class PokemonAddComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pokemonService: PokemonService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
      life: [0, [Validators.required, Validators.min(1), Validators.max(999)]],
      damage: [0, [Validators.required, Validators.min(1), Validators.max(999)]],
      picture: ['', Validators.required],
      types: this.fb.array([], [Validators.required, Validators.maxLength(3)])
    });
  }

  get pokemonTypeList(): FormArray {
    return this.form.get('types') as FormArray;
  }

  isPokemonTypeSelected(type: string): boolean {
    return this.pokemonTypeList.value.includes(type);
  }

  onPokemonTypeChange(type: string, isChecked: boolean) {
    if (isChecked) {
      if (this.pokemonTypeList.length < 3) this.pokemonTypeList.push(this.fb.control(type));
    } else {
      const index = this.pokemonTypeList.controls.findIndex(ctrl => ctrl.value === type);
      if (index >= 0) this.pokemonTypeList.removeAt(index);
    }
  }

  getPokemonColor(type: string): string {
    // exemple basique
    return this.pokemonService.getColor(type);
  }

  onSubmit() {
    if (this.form.valid) {
      this.pokemonService.addPokemon(this.form.value).subscribe(() => {
        this.router.navigate(['/pokemons']);
      });
    }
  }
}
