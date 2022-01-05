import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Task {
    id: number;
    titulo: string;
    descricao: string;
    criadoEm?: any;
    prazo?: any;
}

@Injectable()
export class AppService {
    constructor(private http: HttpClient) {}

    createTask(task: Task) {
        return this.http.post<number>('http://localhost:5000/api/task/create', task);
    }

    editTask(task: Task) {
        return this.http.put('http://localhost:5000/api/task/edit', task, { responseType: 'text' });
    }

    getTasks() {
        return this.http.get<Task[] | null>('http://localhost:5000/api/task/get');
    }

    deleteTask(id: number) {
        return this.http.delete('http://localhost:5000/api/task/delete/' + id);
    }
}
