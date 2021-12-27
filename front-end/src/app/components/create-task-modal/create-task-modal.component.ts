import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-create-modal',
    templateUrl: './create-task-modal.component.html',
    styles: []
})
export class CreateTaskModalComponent implements OnInit {
    tarefa: FormGroup;

    constructor(public modal: NgbActiveModal, private fb: FormBuilder) {
        this.tarefa = this.fb.group({});
    }

    ngOnInit(): void {}
}
