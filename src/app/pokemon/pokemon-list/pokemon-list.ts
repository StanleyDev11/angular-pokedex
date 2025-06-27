import { Component, computed, inject, signal } from '@angular/core';
import { Pokemon } from '../../pokemon.model';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';
import { PokemonBorder } from '../../pokemon-border';
import { RouterLink, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonBorder,DatePipe ,RouterModule],
  templateUrl: './pokemon-list.html',
  styles: ``
})
export class PokemonList {
[x: string]: any;

   readonly #pokemonService =inject(PokemonService);
  readonly pokemonList = toSignal(this.#pokemonService.getPokemonList(),{
    initialValue:[],
  });
  
  readonly searchTerm= signal('');
 
  readonly pokemonListFiltered= computed(() =>{
    const searchTerm= this.searchTerm();
    const pokemonList = this.pokemonList();

    return pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.trim().toLowerCase()))
  })
  form: any;

  bonjour() { 
    console.log('Hello !');
  }

  increLife(pokemon: Pokemon) {
    pokemon.life = pokemon.life + 1;
  }

  decreLife(pokemon: Pokemon) {
    pokemon.life = pokemon.life - 1;
  }

  readonly loading =computed(()=>
    this.pokemonList().length==0);

  size(pokemon: Pokemon) {
    if (pokemon.life > 25) return 'Grand';
    if (pokemon.life > 15) return 'Moyen';
    return 'Petit';
  }

  increaseStat(stat: 'life' | 'damage') {
  const control = this.form.get(stat);
  if (control) {
    control.setValue((control.value || 0) + 1);
  }
}

decreaseStat(stat: 'life' | 'damage') {
  const control = this.form.get(stat);
  if (control) {
    control.setValue(Math.max(0, (control.value || 0) - 1));
  }
}




}
