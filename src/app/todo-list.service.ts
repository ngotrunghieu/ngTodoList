import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TodoList} from '../models/todoList';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';

const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private todoListURL = 'http://localhost:3000/todolist';
  getAllTodoList(): Observable<TodoList[]> {
    return this.http.get<TodoList[]>(this.todoListURL).pipe(
      tap(received => console.log(`get All TodoList: ${JSON.stringify(received)}`)),
      catchError(() => of([]) )
    );
  }

  getTodoByID(id: number): Observable<TodoList> {
    const url = `${this.todoListURL}/${id}`;
    return this.http.get<TodoList>(url).pipe(
      tap(getTodoByID => console.log(`Get todo By ID: ${JSON.stringify(getTodoByID)}`)),
      catchError(() => of(new TodoList()))
    );
  }

  addTodoList(newToto): Observable<TodoList> {
    return this.http.post<TodoList>(this.todoListURL, newToto, httpOption).pipe(
      tap(insertTodo => console.log(`insert todo: ${JSON.stringify(insertTodo)}`)),
      catchError(() => of(new TodoList()))
    );
  }

  updateTodoList(todo): Observable<any> {
    const url = `${this.todoListURL}/${todo.id}`;
    return this.http.put(url, todo, httpOption).pipe(
      tap(updateTodo => console.log(`update todo: ${JSON.stringify(updateTodo)}`)),
      catchError(() => of(new TodoList()))
    );
  }

  deleteTodolist(id): Observable<TodoList> {
    const url = `${this.todoListURL}/${id}`;
    return this.http.delete<TodoList>(url, httpOption).pipe(
      tap(deleteTodo => console.log(`delete todo: ${JSON.stringify(deleteTodo)}`)),
      catchError(() => of(new TodoList()))
    );
  }
  constructor(
    private http: HttpClient
  ) { }
}
