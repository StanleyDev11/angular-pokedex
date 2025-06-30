import { Injectable, signal, computed } from "@angular/core";
import { delay, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signal privé pour suivre l'état de connexion
  readonly #isLoggedIn = signal(false);

  // Observable (lecture seule) exposé publiquement
  readonly isLoggedIn$ = this.#isLoggedIn.asReadonly();

  // Méthode de login simulée
  login(name: string, password: string): Observable<boolean> {
    const isLogged = name === 'Pikachu' && password === 'Pikachu#';
    this.#isLoggedIn.set(isLogged);
    return of(isLogged).pipe(delay(1000)); // simulate delay
  }

  // Méthode logout simple
  logout(): void {
    this.#isLoggedIn.set(false);
  }
}
