import { Component, inject } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.store';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { SignInModel } from '../models/auth';
import { setSession } from '../../../store/auth.actions';


@Component({
  selector: 'app-auth-user',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './auth-user.component.html',
  styleUrl: './auth-user.component.scss'
})
export class AuthUserComponent {

formBuilder: FormBuilder = inject(FormBuilder)
  authService: AuthService = inject(AuthService)
  router: Router = inject(Router)
  store = inject(Store<AppState>)

  hideConfirmPassword = true;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  login() {
    const email = this.loginForm.get('email')!.value!
    let signInModel: SignInModel = {
      email: email,
      password: this.loginForm.get('password')!.value!
    }
    this.authService.signIn(signInModel).subscribe((resp: any) => {
      this.store.dispatch(setSession({ session: resp }))
      localStorage.setItem("current_user", email)

      if (resp) {
        switch (resp.roleName) {
          case "ADMIN":
            this.router.navigate(['user/inicio'])
            break
          case "CUSTOMER":
            this.router.navigate(['client/inicio'])
            break
          case "EMPLOYEE":
            this.router.navigate(['user/inicio'])
            break
        }
      } else {
        this.router.navigate(['/session/login'])
      }
    })
  }
}
