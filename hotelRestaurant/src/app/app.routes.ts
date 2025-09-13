import { Routes } from '@angular/router';
import { AuthUserComponent } from './modules/auth/auth-user/auth-user.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { roleGuard } from './core/guards/auth.guard';

export const routes: Routes = [

    {path: "session",
    children: [
        {
            path: "login", component: AuthUserComponent
        },
        {
            path: "register", component: RegisterComponent
        }
     ]
        },
        
        {path: "client",
          canActivate: [roleGuard(['CUSTOMER'])],
         loadChildren: () => import('./modules/client/client.routes').then((m) => m.CLIENT_ROUTES),
        },
    {
        path: '',
        redirectTo: 'session/login',
        pathMatch: 'full',
    },
    {
        path: '**',
        component: AuthUserComponent
    }
];
