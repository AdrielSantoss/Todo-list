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
    task: FormGroup;
    submitted = false;

    constructor(public modal: NgbActiveModal, private fb: FormBuilder, private service: AppService) {
        this.task = this.fb.group({
            titulo: [null as string, [Validators.required, Validators.minLength(6)]],
            descricao: [null as string],
            criadoEm: [new Date()]
        });
    }

    ngOnInit(): void {}

    create() {
        this.submitted = true;
        if (this.task.invalid || this.task.errors) {
            return;
        }

        this.service.createTask(this.task.value as Task).subscribe(
            () => this.modal.close(this.task.value as Task),
            (err) => this.modal.close(err)
        );
    }
}
