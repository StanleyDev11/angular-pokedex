import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { CommonModule, NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-pokemon-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgIf, NgForOf],
  templateUrl: './pokemon-ajout.html',
  styles: ``
})
export class PokemonAddComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public pokemonService: PokemonService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z]+$/)
      ]],
      life: [0, [Validators.required, Validators.min(1), Validators.max(999)]],
      damage: [0, [Validators.required, Validators.min(1), Validators.max(999)]],
      picture: ['', Validators.required],
      types: this.fb.array([], [
        (formArray: AbstractControl) => {
          const length = (formArray as FormArray).length;
          if (length === 0) return { required: true };
          if (length > 3) return { maxLength: true };
          return null;
        }
      ])
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
      if (this.pokemonTypeList.length < 3) {
        this.pokemonTypeList.push(this.fb.control(type));
      }
    } else {
      const index = this.pokemonTypeList.controls.findIndex(ctrl => ctrl.value === type);
      if (index >= 0) {
        this.pokemonTypeList.removeAt(index);
      }
    }
  }

  // Obtenir la couleur d’un type de Pokémon
  getPokemonColor(type: string): string {
    return this.pokemonService.getColor(type);
  }

  // Soumettre le formulaire
  onSubmit() {
    if (this.form.valid) {
      this.pokemonService.addPokemon(this.form.value).subscribe(() => {
        this.router.navigate(['/pokemons']);
      });
    }
  }
}
