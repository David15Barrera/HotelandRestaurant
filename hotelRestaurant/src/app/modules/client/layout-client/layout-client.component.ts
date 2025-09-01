import { Component, inject } from '@angular/core';
import { AppState } from '../../../app.store';
import { Store } from '@ngrx/store';
import { signOut } from '../../../store/auth.actions';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-layout-client',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout-client.component.html',
  styleUrl: './layout-client.component.scss'
})
export class LayoutClientComponent {
    store: Store<AppState> = inject(Store<AppState>)
    menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  signOut() {
    this.store.dispatch(signOut())
  }

}
