import { AppService, Task } from '../../app.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export type Mode = 'create' | 'edit';

export interface Dto {
    task: Task;
    mode: Mode;
}

@Component({
    selector: 'app-task-modal',
    templateUrl: './task-modal.component.html',
    styles: []
})
export class TaskModalComponent implements OnInit {
    @Input() currentTask: Task = null;
    task: FormGroup;
    submitted = false;
    isCollapsed = true;

    constructor(public modal: NgbActiveModal, private fb: FormBuilder, private service: AppService) {
        this.task = this.fb.group({
            id: [null],
            titulo: [null as string, [Validators.required, Validators.minLength(6)]],
            descricao: [null as string],
            criadoEm: [new Date()],
            prazo: [null as Date],
            date: [null],
            time: [null],
            notificacao: [null]
        });
    }

    ngOnInit(): void {
        if (this.currentTask) {
            this.task.patchValue(this.currentTask);
            if (this.currentTask.prazo) {
                this.isCollapsed = false;
                this.task.controls.date.setValue(this.jsDateToNgbDatePicker(new Date(this.currentTask.prazo)));
                this.task.controls.time.setValue(this.jsDateToNgbTimePicker(new Date(this.currentTask.prazo)));
            }
        }
    }

    jsDateToNgbDatePicker(date: Date) {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
    }

    jsDateToNgbTimePicker(time: Date) {
        return {
            hour: time.getHours(),
            minute: time.getMinutes(),
            second: time.getSeconds()
        };
    }

    ngbDatePickerToJsDate(date: any) {
        return new Date(date.year, date.month, date.day);
    }

    ngbDatePickerToJsTime(time: any) {
        let datePrazo = this.task.controls.prazo.value as Date;
        if (!datePrazo) {
            datePrazo = new Date();
        }

        datePrazo.setHours(time.hour);
        datePrazo.setMinutes(time.minute);
        datePrazo.setSeconds(time.second);
        return datePrazo;
    }

    create() {
        this.submitted = true;
        if (this.task.invalid || this.task.errors) {
            return;
        }

        if (this.task.controls.date.value) {
            this.task.controls.prazo.setValue(this.ngbDatePickerToJsDate(this.task.controls.date.value));
        }

        if (this.task.controls.time.value) {
            this.task.controls.prazo.setValue(this.ngbDatePickerToJsTime(this.task.controls.time.value));
        }

        delete this.task.value.date;
        delete this.task.value.time;

        if (!this.currentTask) {
            this.service.createTask(this.task.value as Task).subscribe(
                (id) => {
                    this.task.controls.id.setValue(id[0]);
                    this.modal.close(<Dto>{
                        task: this.task.value as Task,
                        mode: 'create'
                    });
                },
                (err) => this.modal.close(err)
            );
        } else {
            this.service.editTask(this.task.value as Task).subscribe(
                () =>
                    this.modal.close(<Dto>{
                        task: this.task.value as Task,
                        mode: 'edit'
                    }),
                (err) => this.modal.close(err)
            );
        }
    }
}
