import { AppService, Task } from '../../app.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-task-modal',
    templateUrl: './task-modal.component.html',
    styles: []
})
export class TaskModalComponent implements OnInit {
    @Input() currentTask: Task = null;
    task: FormGroup;
    submitted = false;

    constructor(public modal: NgbActiveModal, private fb: FormBuilder, private service: AppService) {
        this.task = this.fb.group({
            id: [null],
            titulo: [null as string, [Validators.required, Validators.minLength(6)]],
            descricao: [null as string],
            criadoEm: [new Date()]
        });
    }

    ngOnInit(): void {
        if (this.currentTask) {
            this.task.patchValue(this.currentTask);
        }
    }

    create() {
        this.submitted = true;
        if (this.task.invalid || this.task.errors) {
            return;
        }

        if (!this.currentTask) {
            this.service.createTask(this.task.value as Task).subscribe(
                (id) => {
                    this.task.controls.id.setValue(id[0]);
                    this.modal.close(this.task.value as Task);
                },
                (err) => this.modal.close(err)
            );
        } else {
            this.service.editTask(this.task.value as Task).subscribe(
                () => this.modal.close(this.task.value as Task),
                (err) => this.modal.close(err)
            );
        }
    }
}
