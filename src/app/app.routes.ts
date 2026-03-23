import { Routes } from '@angular/router';
import { ToDoListComponent } from './components/to-do-list/to-do-list';
import { ToDoItemViewComponent } from './components/to-do-item-view/to-do-item-view';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    { path: 'tasks', component: ToDoListComponent, children: [ { path: ':id', component: ToDoItemViewComponent }] },
    { path: '**', redirectTo: 'tasks' },
];
