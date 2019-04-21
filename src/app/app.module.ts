import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todoList/todoList.component';
import { AppRoutingModule } from './app-routing.module';
import { TodoListService } from './todo-list.service';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { TodoContentComponent } from './todo-content/todo-content.component';
import { TodoNavPageComponent } from './todo-nav-page/todo-nav-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoDetailComponent,
    TodoHeaderComponent,
    TodoContentComponent,
    TodoNavPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    TodoListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
