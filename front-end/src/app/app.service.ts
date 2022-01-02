import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Task {
    Titulo: string;
    Descricao: string;
    CriadoEm?: any;
    Prazo?: any;
}

@Injectable()
export class AppService {
    constructor(private http: HttpClient) {}

    createTask(task: Task) {
        return this.http.post('http://localhost:5000/api/task/create', task, { responseType: 'text' });
    }

    editTask(task: Task) {
        return this.http.put('http://localhost:5000/api/task/edit', task, { responseType: 'text' });
    }

    getTasks() {
        return this.http.get<Task[] | null>('http://localhost:5000/api/task/get');
    }
}
