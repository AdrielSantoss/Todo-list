import { AppService, Task } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [DatePipe]
})
export class HomeComponent implements OnInit {
    tasks?: Task[] = null;

    constructor(private modal: NgbModal, private service: AppService, private toast: ToastrService) {
        this.service.getTasks().subscribe((tasks: Task[]) => (this.tasks = tasks));
    }

    openModalTask(task?: Task) {
        const modal = this.modal.open(TaskModalComponent, {
            backdrop: 'static',
            size: 'lg'
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

    ngOnInit(): void {}
}
