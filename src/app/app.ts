import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PokemonSeederService } from './services/pokemon-seeder';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']  // correction de styleUrl → styleUrls (avec un s)
})
export class App  implements OnInit{
  constructor(private seeder: PokemonSeederService) {}

  ngOnInit(): void {
    this.seeder.seedPokemons(); // Exécuter une seule fois !
  }
}
