import { Component, OnInit } from '@angular/core';
import {TodoList} from '../../models/todoList';
import {TodoListService} from '../todo-list.service';

@Component({
  selector: 'app-todo-nav-page',
  templateUrl: './todo-nav-page.component.html',
  styleUrls: ['./todo-nav-page.component.css']
})
export class TodoNavPageComponent implements OnInit {
  perPage = 5;
  currentPage = 1;
  pages = [];
  todoList: TodoList[];
  constructor(
    private todolistService: TodoListService
  ) { }

  getPage(): void {
    this.todolistService.getAllTodoList().subscribe(
      todoList => this.todoList = todoList,
      error => console.log(error),
      () => {
        for (let i = 0; i <= Math.ceil(this.todoList.length / this.perPage); i++){
          this.pages.push(i);
        }
      });
  }
  ngOnInit() {
    this.getPage();
  }

}
