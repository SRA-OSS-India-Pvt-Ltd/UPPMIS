import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'formselection',
    loadChildren: () => import('./pages/formselection/formselection.module').then( m => m.FormselectionPageModule)
  },
  {
    path: 'slitcontent',
    loadChildren: () => import('./pages/slitcontent/slitcontent.module').then( m => m.SlitcontentPageModule)
  },
  {
    path: 'slumptest',
    loadChildren: () => import('./pages/slumptest/slumptest.module').then( m => m.SlumptestPageModule)
  },
  {
    path: 'cccube28',
    loadChildren: () => import('./pages/cccube28/cccube28.module').then( m => m.Cccube28PageModule)
  },
  {
    path: 'seive',
    loadChildren: () => import('./pages/seive/seive.module').then( m => m.SeivePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
