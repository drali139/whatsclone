import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'chat/:id',
    loadComponent: () =>
      import('./core/shared/components/chat-screen/chat-screen.component').then((m) => m.ChatScreenComponent),
  },
  {
    path: 'blank',
    loadComponent: () => import('./blank/blank.page').then( m => m.BlankPage)
  }
];