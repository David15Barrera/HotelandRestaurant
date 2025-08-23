import { Routes } from '@angular/router';
import { AuthUserComponent } from './modules/auth/auth-user/auth-user.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { InicioComponent } from './modules/client/inicio/inicio.component';
import { InicioUserComponent } from './modules/user/inicio-user/inicio-user.component';
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
        children: [
            {
                path: "inicio", component: InicioComponent
            }
        ]
        },
        {path: "user",
        children: [
            {
                path: "inicio", component: InicioUserComponent
            }
        ]

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
