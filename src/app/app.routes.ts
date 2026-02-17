import { Routes } from '@angular/router';
import { Login } from './Pages/login/login';
import { Acceso } from './Pages/acceso/acceso';
import { AccesoAdmin } from './Pages/acceso-admin/acceso-admin';
import { Prestamos } from './Pages/prestamos/prestamos';
import { Home } from './Pages/home/home';
export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'acceso',
    component: Acceso,
  },
  {
    path: 'acceso-admin',
    component: AccesoAdmin,
  },
  {
    path: 'prestamos',
    component: Prestamos,
  },
  {
    path: 'home',
    component: Home,
  },
];
