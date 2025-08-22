import { createAction, props } from '@ngrx/store';
import { User } from './auth.models'

export const loginRequested = createAction(
  '[Auth] Login Requested',
  props<{ email: string; password: string }>()
);

export const loginSucceeded = createAction(
  '[Auth] Login Succeeded',
  props<{ token: string; user: User }>()
);

export const loginFailed = createAction(
  '[Auth] Login Failed',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');