import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare const $: any;

import {TodoList} from '../../models/todoList';
import {TodoListService} from '../todo-list.service';

@Component({
  selector: 'app-todo-component',
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.css']
})
export class TodoListComponent implements OnInit {
  todoForm: FormGroup;
  submitted = false;
  todoList: TodoList[];
  todoByID: TodoList;
  title = null;
  delTodoName = null;
  delTodoId = null;
  page = 1;
  perPage = 5;
  currentPage = 1;
  pages = [];
  startShowTodo: number;
  endShowTodo: number;

  constructor(
    private todoListService: TodoListService,
    public formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.getAllTodoList();
    this.getPage();
    this.todoForm = this.formBuilder.group({
      id: [null],
      todo_name: ['', Validators.required],
      date_create: ['', Validators.required],
      due_date: [''],
      status: ['', Validators.required],
      note: ['']
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.todoForm.controls;
  }

  getAllTodoList(): void {
    this.todoListService.getAllTodoList().subscribe(todoList => this.todoList = todoList);
  }

  getColorForStatus = status => {
    switch (status) {
      case 'Success':
        return 'badge badge-success';
      case 'Inprocess':
        return 'badge badge-warning';
      case 'Open':
        return 'badge badge-primary';
      case 'Close':
        return 'badge badge-danger';
      default:
        return '';
    }
  }

  addTodo(): void {
    this.title = 'Add Todo';
    $('#modalTodoList').modal('show');
  }
  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.todoForm.invalid) {
      return;
    }

    const newTodo = new TodoList();
    newTodo.id = this.todoForm.value.id;
    newTodo.todoName = this.todoForm.value.todo_name;
    newTodo.dateCreate = this.todoForm.value.date_create;
    newTodo.dueDate = this.todoForm.value.due_date;
    newTodo.status = this.todoForm.value.status;
    newTodo.note = this.todoForm.value.note;
    // Add new todo_list
    if (this.todoForm.value.id === null) {
      this.todoListService.addTodoList(newTodo).subscribe(
        todoList => this.todoList.push(todoList)
        , error => console.log(error)
        , () => $('#modalTodoList').modal('hide')
      );
    } else {
      this.todoListService.updateTodoList(newTodo).subscribe(
        todoList => this.todoByID = todoList
        , error => console.log(error)
        , () => {
          $('#modalTodoList').modal('hide');
          this.getAllTodoList();
        }
      );
    }
  }

  editTodo(id: number): void {
    this.title = 'Edit todo';
    this.todoListService.getTodoByID(id).subscribe(
      todoList => this.todoByID = todoList
      , error => console.log(error)
      , () => {
        this.setValueModalTodo(this.todoByID);
        $('#modalTodoList').modal('show');
      }
    );
  }

  setValueModalTodo(todoByID: TodoList): void {
    this.todoForm.setValue({
      id: todoByID.id,
      todo_name: todoByID.todoName,
      date_create: todoByID.dateCreate,
      due_date: todoByID.dueDate,
      status: todoByID.status,
      note: todoByID.note ? todoByID.note : ''
    });
  }

  deleteTodo(id: number): void {
    this.todoListService.getTodoByID(id).subscribe(
      todoList => {
        this.delTodoName = todoList.todoName;
        this.delTodoId = todoList.id;
      }
      , error => console.log(error)
      , () => {
        $('#modalDeleteTodoList').modal('show');
      }
    );
  }
  onDeleteTodo(id: number): void {
    this.todoListService.deleteTodolist(id).subscribe(
      () => this.todoList.filter(eachTodo => eachTodo.id !== id)
      , error => console.log(error)
      , () => {
        $('#modalDeleteTodoList').modal('hide');
        this.getAllTodoList();
      });
  }

  getPage(): void {
    this.todoListService.getAllTodoList().subscribe(
      todoList => this.todoList = todoList,
      error => console.log(error),
      () => {
        for (let i = 0; i <= Math.ceil(this.todoList.length / this.perPage); i++) {
          if (i >= 1) {
            this.pages.push(i);
          }
        }
        console.log(`page: ${this.pages.length}`);
      });
  }
  getTodoByPage(page): void {
    this.currentPage = page;
    this.startShowTodo = (this.currentPage * this.perPage) - this.perPage;
    this.endShowTodo = this.startShowTodo + this.perPage;
    console.log(`startShowTodo: ${this.startShowTodo} - endShowTodo: ${this.endShowTodo}`);
  }
}
