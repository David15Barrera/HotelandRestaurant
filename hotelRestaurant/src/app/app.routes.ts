import { Routes } from '@angular/router';
import { AuthUserComponent } from './modules/auth/auth-user/auth-user.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { InicioComponent } from './modules/client/inicio/inicio.component';
import { InicioAdminComponent } from './modules/admin/inicio-admin/inicio-admin.component';
import path from 'path';

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
         loadChildren: () => import('./modules/client/client.routes').then((m) => m.CLIENT_ROUTES),
        },

        {path: "admin",
            loadChildren: () => import('./modules/admin/admin.routes').then( (m) => m.ADMIN_ROUTES),
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
