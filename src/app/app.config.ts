import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Route, Routes } from '@angular/router';
import { PokemonList } from './pokemon/pokemon-list/pokemon-list';
import { PokemonProfile } from './pokemon/pokemon-profile/pokemon-profile';
import { PageNotFound } from './page-not-found/page-not-found';
import { PokemonEdit } from './pokemon/pokemon-edit/pokemon-edit';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './login/login';
import { Title } from '@angular/platform-browser';
import { PokemonAddComponent } from './pokemon/pokemon-ajout/pokemon-ajout';

const routes :Routes =[
  {
     path: 'login',
     component : LoginComponent,
     title :'Connexion',

  },

  {
    path: 'pokemons',
    canActivateChild: [AuthGuard],
    children : [
      { path: 'add', 
        component: PokemonAddComponent,
         title: 'ajout' },
         
       {path: 'edit/:id', component: PokemonEdit, title:"Edition  pokemon "},
  
  {path: ':id', component: PokemonProfile, title:'Pokémon' },
   
    {path: '', component: PokemonList , title:'Pokédex'},

     
 
    ]
  },
  //{path: 'edit/:id', component: PokemonEdit, title:"Edition  pokemon "},
  //{path: 'pokemons/edit/:id', component: PokemonEdit, title:"Edition  pokemon "},

 // {path: ':id', component: PokemonProfile, title:'Pokémon' ,canActivate:[AuthGuard]},
  //{path: 'pokemons/:id', component: PokemonProfile, title:'Pokémon' ,canActivate:[AuthGuard]},

 // {path: '', component: PokemonList , title:'Pokédex', canActivate:[AuthGuard]},
   //{path: 'pokemons', component: PokemonList , title:'Pokédex', canActivate:[AuthGuard]},
  {path :'', redirectTo: '/pokemons', pathMatch: 'full'},
  {path: '**', component: PageNotFound},
]; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
    
  ]
};
