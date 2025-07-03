import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class PokemonSeederService {
  constructor(private firestore: AngularFirestore) {}

  seedPokemons() {
    const pokemons = [
      {
        id: 1, name: "Bulbizarre", life: 25, damage: 5,
        picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
        types: ["Plante", "Poison"],
        created: new Date("2024-08-16T00:00:00Z"),
        update: new Date("2025-01-16T00:00:00Z")
      },
      {
        id: 2, name: "Salamèche", life: 20, damage: 7,
        picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
        types: ["Feu"],
        created: new Date("2024-08-16T00:00:00Z"),
        update: new Date("2025-01-16T00:00:00Z")
      },
      {
        id: 3, name: "Carapuce", life: 21, damage: 4,
        picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
        types: ["Eau"],
        created: new Date("2024-08-16T00:00:00Z"),
        update: new Date("2025-01-16T00:00:00Z")
      },
      {
        id: 4, name: "Aspicot", life: 16, damage: 2,
        picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/013.png",
        types: ["Insecte", "Poison"],
        created: new Date("2024-08-16T00:00:00Z"),
        update: new Date("2025-01-16T00:00:00Z")
      },
      {
        id: 5, name: "Roucool", life: 30, damage: 7,
        picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png",
        types: ["Normal", "Vol"],
        created: new Date("2024-08-16T00:00:00Z"),
        update: new Date("2025-01-16T00:00:00Z")
      },
      {
        id: 6, name: "Rattata", life: 18, damage: 6,
        picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/019.png",
        types: ["Normal"],
        created: new Date("2024-08-16T00:00:00Z"),
        update: new Date("2025-01-16T00:00:00Z")
      },
      {
        id: 7, name: "Piafabec", life: 14, damage: 5,
        picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/021.png",
        types: ["Normal", "Vol"],
        created: new Date("2024-08-16T00:00:00Z"),
        update: new Date("2025-01-16T00:00:00Z")
      },
      {
        id: 8, name: "Abo", life: 16, damage: 4,
        picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/023.png",
        types: ["Poison"],
        created: new Date("2024-08-16T00:00:00Z"),
        update: new Date("2025-01-16T00:00:00Z")
      },
      {
        id: 9, name: "Pikachu", life: 21, damage: 7,
        picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png",
        types: ["Electrik"],
        created: new Date("2024-08-16T00:00:00Z"),
        update: new Date("2025-01-16T00:00:00Z")
      },
      {
        id: 10, name: "Sabelette", life: 19, damage: 3,
        picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/027.png",
        types: ["Normal"],
        created: new Date("2024-08-16T00:00:00Z"),
        update: new Date("2025-01-16T00:00:00Z")
      },
      {
        id: 11, name: "Mélofée", life: 25, damage: 5,
        picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/035.png",
        types: ["Fée"],
        created: new Date("2024-08-16T00:00:00Z"),
        update: new Date("2025-01-16T00:00:00Z")
      },
      {
        id: 12, name: "Groupix", life: 17, damage: 8,
        picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/037.png",
        types: ["Feu"],
        created: new Date("2024-08-16T00:00:00Z"),
        update: new Date("2025-01-16T00:00:00Z")
      }
    ];

    pokemons.forEach(pokemon => {
      this.firestore.collection('pokemons').doc(String(pokemon.id)).set(pokemon)
        .then(() => console.log(`✅ Ajouté : ${pokemon.name}`))
        .catch(error => console.error(`❌ Erreur pour ${pokemon.name}`, error));
    });
  }
}
