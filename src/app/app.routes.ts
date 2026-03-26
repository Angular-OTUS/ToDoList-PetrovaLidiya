import { Routes } from '@angular/router';
import { BacklogComponent } from './pages/backlog/backlog.component';
import { BoardComponent } from './pages/board/board.component';

export const routes: Routes = [
  { path: 'backlog', component: BacklogComponent },
  { path: 'board', component: BoardComponent },
  { path: '', redirectTo: '/backlog', pathMatch: 'full' },
  { path: '**', redirectTo: '/backlog' },
];