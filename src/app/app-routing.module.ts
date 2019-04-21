import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoListComponent} from './todoList/todoList.component';
import {TodoDetailComponent} from './todo-detail/todo-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/todo-list', pathMatch: 'full'},
  {path: 'todo-list', component: TodoListComponent},
  {path: 'todo-detail/:id', component: TodoDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
