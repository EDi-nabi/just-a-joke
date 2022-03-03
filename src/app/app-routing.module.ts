import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('src/app/home/home.module').then(m => m.HomeModule) },
  { path: 'jokes', loadChildren: () => import('src/app/jokes/jokes.module').then(m => m.JokesModule) },
  { path: 'form', loadChildren: () => import('src/app/form/form.module').then(m => m.FormModule) },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
