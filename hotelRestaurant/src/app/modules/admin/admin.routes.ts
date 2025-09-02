import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '', // La ruta vacía es un buen reemplazo para '/' en rutas hijas
    loadComponent: () =>
      import('./components/layout-admin/layout-admin.component').then(
        (m) => m.LayoutAdminComponent
      ),
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('../admin/inicio-admin/inicio-admin.component').then(
            (m) => m.InicioAdminComponent
          ),
      },
      {
        path: 'hoteles',
        loadComponent: () =>
          import('./components/hotel-admin/hotelinicio/hotelinicio.component').then(
            (m) => m.HotelinicioComponent
          ),
      },
      {
        path: 'empleados',
        loadComponent: () => import('./components/empleado/inicio-emp-admin/inicio-emp-admin.component').then(
          (m) => m.InicioEmpAdminComponent),
      },
      // Las rutas comentadas se han eliminado por completo para evitar errores
      // {
      //   path: 'habitaciones',
      //   loadComponent: () =>
      //     import('./components/hoteles/crud-habitaciones/crud-habitaciones.component').then(
      //       (m) => m.CrudHabitacionesComponent
      //     ),
      // },
      {
        path: 'restaurantes',
        loadComponent: () =>
         import('./components/restaurant-admin/restauinicio/restauinicio.component').then(
            (m) => m.RestauinicioComponent
          ),
      },
      // {
      //   path: 'menu',
      //   loadComponent: () =>
      //     import('./components/restaurantes/crud-menu/crud-menu.component').then(
      //       (m) => m.CrudMenuComponent
      //     ),
      // },
      // ... y así sucesivamente para todas las rutas que no se usarán por ahora.
    ],
  },
];