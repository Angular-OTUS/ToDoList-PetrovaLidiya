import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'backlog',
    loadChildren: () => import('./modules/backlog/backlog.module').then(m => m.BacklogModule)
  },
  {
    path: 'board',
    loadChildren: () => import('./modules/board/board.module').then(m => m.BoardModule)
  },
  { path: '', redirectTo: '/backlog', pathMatch: 'full' },
  { path: '**', redirectTo: '/backlog' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }