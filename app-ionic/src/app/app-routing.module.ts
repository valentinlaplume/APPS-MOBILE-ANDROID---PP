import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginVerifiedGuard } from './login-verified.guard';
import { PasajeSplash } from './pasaje-splash.guard';

const routes: Routes = [
  
  { path: '', redirectTo: 'splashInicial', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    , canActivate: [LoginVerifiedGuard]
    
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then(m => m.VerifyEmailPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'splashAnimado',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
    , canDeactivate: [PasajeSplash]
  },
  {
    path: 'splashInicial',
    loadChildren: () => import('./splash-inicial/splash-inicial.module').then(m => m.SplashInicialPageModule)
  },
  {
    path: 'chatAulaA',
    loadChildren: () => import('./chat-aula-a/chat-aula-a.module').then( m => m.ChatAulaAPageModule)
  },
  {
    path: 'chatAulaB',
    loadChildren: () => import('./chat-aula-b/chat-aula-b.module').then( m => m.ChatAulaBPageModule)
  }



  // este ultimo siempre
  ,{ path: '**', redirectTo: 'splashInicial', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
