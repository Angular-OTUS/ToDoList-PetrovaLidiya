import { inject, Injectable } from "@angular/core";
import { ToDoListType } from "../interfaces";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {

    private baseUrl = 'http://localhost:3000/items';

    private http = inject(HttpClient);

    public getAll(): Observable<ToDoListType[]> {
      return this.http.get<ToDoListType[]>(this.baseUrl);
    }

    public getById(id: number): Observable<ToDoListType> {
      return this.http.get<ToDoListType>(`${this.baseUrl}/${id}`);
    }

    public update(id: number, partial: Partial<ToDoListType>): Observable<ToDoListType> {
      return this.http.patch<ToDoListType>(`${this.baseUrl}/${id}`, partial);
    }

    public delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    public add(title: string, description?: string): Observable<ToDoListType> {
        const trimmed = title?.trim();
        if (!trimmed) 
          return of();
        const item = {
            title: trimmed,
            description: description?.trim(),
            status: 'InProgress',
        };
        return this.http.post<ToDoListType>(this.baseUrl, item);
    }
}