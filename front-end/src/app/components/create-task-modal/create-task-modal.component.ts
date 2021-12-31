import { AppService, Task } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-create-modal',
    templateUrl: './create-task-modal.component.html',
    styles: []
})
export class CreateTaskModalComponent implements OnInit {
    tarefa: FormGroup;

    constructor(public modal: NgbActiveModal, private fb: FormBuilder, private service: AppService) {
        this.tarefa = this.fb.group({
            Titulo: [null as string, [Validators.required, Validators.minLength(6)]],
            Descricao: [null as string]
        });
    }

    ngOnInit(): void {}

    create() {
        if (this.tarefa.invalid || this.tarefa.errors) {
            return;
        }

        this.service.createTask(this.tarefa.value as Task).subscribe(
            (task) => this.modal.close(task),
            (err) => console.log(err)
        );
    }
}
