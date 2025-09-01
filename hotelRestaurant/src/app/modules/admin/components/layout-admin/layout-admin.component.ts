import { Component, inject } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.store';
import { signOut } from '../../../../store/auth.actions';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.scss'
})
export class LayoutAdminComponent {

    store: Store<AppState> = inject(Store<AppState>)
    menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  signOut() {
    this.store.dispatch(signOut())
  }

}
