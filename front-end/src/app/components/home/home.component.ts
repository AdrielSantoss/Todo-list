import { AppService, Task } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';
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

    openModalTask() {
        const modal = this.modal.open(CreateTaskModalComponent, {
            backdrop: 'static',
            size: 'lg'
        });
        modal.result
            .then((newTask?: Task) => {
                this.tasks.push(newTask);
                this.toast.info('Tarefa criada com sucesso!');
            })
            .catch((err) => this.toast.error(err));
    }

    ngOnInit(): void {}
}
