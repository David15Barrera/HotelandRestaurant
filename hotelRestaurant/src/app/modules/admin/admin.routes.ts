import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
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
//        loadComponent: () =>
//          import('./components/hoteles/crud-hotel/crud-hotel.component').then(
//            (m) => m.CrudHotelComponent
 //         ),
      },
      {
        path: 'habitaciones',
 //       loadComponent: () =>
 //         import('./components/hoteles/crud-habitaciones/crud-habitaciones.component').then(
 //           (m) => m.CrudHabitacionesComponent
 //         ),
      },
      {
        path: 'restaurantes',
 //       loadComponent: () =>
 //        import('./components/restaurantes/crud-restaurante/crud-restaurante.component').then(
 //           (m) => m.CrudRestauranteComponent
 //         ),
      },
      {
 //       path: 'menu',
 //       loadComponent: () =>
 //         import('./components/restaurantes/crud-menu/crud-menu.component').then(
 //           (m) => m.CrudMenuComponent
 //         ),
      },
      {
        path: 'empleados',
   //     loadComponent: () =>
   //       import('./components/empleados/crud-empleados/crud-empleados.component').then(
   //         (m) => m.CrudEmpleadosComponent
   //       ),
      },
      {
        path: 'reportes',
  //      loadComponent: () =>
  //        import('./components/reportes/reportes.component').then(
  //          (m) => m.ReportesComponent
  //        ),
      },
      {
  //      path: 'promociones',
  //      loadComponent: () =>
  ///        import('./components/promociones/promociones.component').then(
  //          (m) => m.PromocionesComponent
  //        ),
      },
      {
  //      path: 'finanzas',
  //      loadComponent: () =>
  //        import('./components/finanzas/pagos-empleados/pagos-empleados.component').then(
  //          (m) => m.PagosEmpleadosComponent
  //        ),
      },
    ],
  },
];