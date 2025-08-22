import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.models';
import { loginRequested, loginSucceeded, loginFailed, logout } from './auth.actions';

export const authFeatureKey = 'auth';

export const authReducer = createReducer(
  initialAuthState,
on(loginRequested, (state) => ({ ...state, status: 'authenticating' as const, error: null })),
on(loginSucceeded, (state, { token, user }) => ({ ...state, token, user, status: 'authenticated' as const })),
on(loginFailed, (state, { error }) => ({ ...state, status: 'error' as const, error })),
on(logout, () => initialAuthState)
);
