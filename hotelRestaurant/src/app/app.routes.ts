import { Routes } from '@angular/router';
import { AuthUserComponent } from './modules/auth/auth-user/auth-user.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { InicioComponent } from './modules/client/inicio/inicio.component';
import { InicioUserComponent } from './modules/user/inicio-user/inicio-user.component';
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
        {path: "user",
        children: [
            {
                path: "inicio", component: InicioUserComponent
            }
        ]

        },
        {path: "admin",
            loadComponent: () =>
            import("../app/modules/admin/components/layout-admin/layout-admin.component")
                .then(m => m.LayoutAdminComponent),

        children:[
            {
                path: "inicio", component: InicioAdminComponent
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
