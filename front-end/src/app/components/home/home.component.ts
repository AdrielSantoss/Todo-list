import { AppService, Task } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dto, TaskModalComponent } from '../task-modal/task-modal.component';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

export enum TasksMode {
    Card = 'Cards',
    List = 'Lista'
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers: [DatePipe]
})
export class HomeComponent implements OnInit {
    tasks?: Task[] = null;
    modes = TasksMode;
    currentMode: TasksMode;

    constructor(private modal: NgbModal, private service: AppService, private toast: ToastrService) {
        this.service.getTasks().subscribe((tasks: Task[]) => (this.tasks = tasks));
    }

    openModalTask(task?: Task) {
        const modal = this.modal.open(TaskModalComponent, {
            backdrop: 'static',
            size: 'lg',
            keyboard: false
        });
        modal.componentInstance.currentTask = task;
        modal.result
            .then((newTask?: Dto) => {
                if (newTask && newTask.task) {
                    if (newTask.mode === 'create') {
                        this.tasks.push(newTask.task);
                    }
                    if (newTask.mode === 'edit') {
                        this.tasks[this.tasks.findIndex((item: Task) => newTask.task.id === item.id)] = newTask.task;
                    }
                    this.toast.info(`Tarefa ${newTask.mode === 'edit' ? 'editada' : 'criada'} com sucesso!`);
                }
            })
            .catch((err) => this.toast.error(err));
    }

    deleteTask(id: number) {
        Swal.fire({
            title: `Aviso`,
            text: 'Você deseja excluir essa tarefa?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Não',
            confirmButtonColor: '#0275d8',
            confirmButtonText: 'Sim'
        }).then((result) => {
            if (result.value) {
                this.service.deleteTask(id).subscribe(
                    () => {
                        this.tasks.splice(
                            this.tasks.findIndex((item: Task) => id === item.id),
                            1
                        );
                        this.toast.info('Tarefa removida com sucesso!');
                    },
                    (err) => this.toast.error(err)
                );
            }
        });
    }

    deleteProperty(property: 'prazo' | 'notificacao', id: number) {
        let task = this.tasks.find((task: Task) => task.id === id);
        delete task[property];
        this.service.editTask(task as Task).subscribe(() => this.toast.info(`${property} removido com sucesso`));
    }

    ngOnInit(): void {}
}
