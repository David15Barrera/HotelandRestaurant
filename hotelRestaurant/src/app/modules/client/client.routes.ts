import { Routes } from '@angular/router';

export const CLIENT_ROUTES: Routes = [
    {
        path:'',
        loadComponent: () => import('./layout-client/layout-client.component').then(
            (m) => m.LayoutClientComponent
        ),
        children: [
            {
             path: 'inicio',
             loadComponent: () => import('./inicio/inicio.component').then(
                (m) => m.InicioComponent
             ),
            },
            {
             path:'hoteles',
             loadComponent: () => import('./hotel/list-hoteles/list-hoteles.component').then(
                (m) => m.ListHotelesComponent
             ),
            },
            {
             path:'habitaciones',
             loadComponent: () => import('./hotel/list-habitaciones/list-habitaciones.component').then(
                (m) => m.ListHabitacionesComponent
             ),
            },
            {
             path:'resarvar/:id',
             loadComponent: () => import('./hotel/reservar-habitaciones/reservar-habitaciones.component').then(
             (m) => m.ReservarHabitacionesComponent
             ),
            },
            {
             path:'restaurantes',
             loadComponent: () => import('./restaurant/list-restaurantes/list-restaurantes.component').then(
                (m) => m.ListRestaurantesComponent
             ),
            },
            {
             path:'menu/:id',
             loadComponent: () => import('./restaurant/menu-restaurante/menu-restaurante.component').then(
                (m) => m.MenuRestauranteComponent
             )
            }
        ]
    }
]