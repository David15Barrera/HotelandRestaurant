import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.models";
import { authFeatureKey } from "./auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectToken = createSelector(selectAuthState, (s) => s.token);
export const selectIsAuthenticated = createSelector(selectToken, (t) => !!t);
export const selectCurrentUser = createSelector(selectAuthState, (s) => s.user);