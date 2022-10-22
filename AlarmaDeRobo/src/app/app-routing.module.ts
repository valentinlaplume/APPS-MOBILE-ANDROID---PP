import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'splash-estatico', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {path: 'loged', redirectTo: 'loged'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'splash-estatico',
    loadChildren: () => import('./splash-estatico/splash-estatico.module').then( m => m.SplashEstaticoPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
