import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash-estatico',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'cosas-lindas',
    loadChildren: () =>
      import('./cosas-lindas/cosas-lindas.module').then(
        (m) => m.CosasLindasPageModule
      ),
  },
  {
    path: 'cosas-feas',
    loadChildren: () =>
      import('./cosas-feas/cosas-feas.module').then(
        (m) => m.CosasFeasPageModule
      ),
  },
  {
    path: 'graficos',
    loadChildren: () =>
      import('./graficos/graficos.module').then((m) => m.GraficosPageModule),
  },
  {
    path: 'graficos-cosas-lindas',
    loadChildren: () =>
      import('./graficosCosasLindas/graficosCosasLindas.module').then((m) => m.GraficosCosasLindasPageModule),
  },
  {
    path: 'cosas-propias',
    loadChildren: () =>
      import('./cosas-propias/cosas-propias.module').then(
        (m) => m.CosasPropiasPageModule
      ),
  },
  {
    path: 'splash-estatico',
    loadChildren: () =>
      import('./splash-estatico/splash-estatico.module').then(
        (m) => m.SplashEstaticoPageModule
      ),
  },
  {
    path: 'splash-animado',
    loadChildren: () =>
      import('./splash-animado/splash-animado.module').then(
        (m) => m.SplashAnimadoPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
