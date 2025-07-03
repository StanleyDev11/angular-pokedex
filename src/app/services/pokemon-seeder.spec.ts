import { TestBed } from '@angular/core/testing';

import { PokemonSeeder } from './pokemon-seeder';

describe('PokemonSeeder', () => {
  let service: PokemonSeeder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonSeeder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
