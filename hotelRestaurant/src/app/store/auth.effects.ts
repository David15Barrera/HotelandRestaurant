import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginRequested, loginSucceeded, loginFailed, logout } from './auth.actions';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../environments/environment';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginRequested),
      switchMap(({ email, password }) =>
        this.http.post<{ token: string; user: any }>(`${environments.API_URL}/auth/login`, { email, password }).pipe(
          map(({ token, user }) => loginSucceeded({ token, user })),
          catchError((err) => of(loginFailed({ error: err?.error?.message ?? 'Login error' })))
        )
      )
    )
  );

  //Limpiar el Token al salir
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        map(() => {
          localStorage.removeItem('auth');
        })
      ),
    { dispatch: false }
  );
}
