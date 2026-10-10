import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'transferencias',
    loadComponent: () => import('./pages/transferencia/lista/lista').then((m) => m.Lista),
  },

  {
    path: '**',
    redirectTo: '',
  },
];

