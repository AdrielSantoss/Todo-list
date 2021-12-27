import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor(private modal: NgbModal) {}

  openModalTask() {
    const modal = this.modal.open(CreateTaskModalComponent, {
      backdrop: 'static',
      size: 'lg',
    });
  }

  ngOnInit(): void {}
}
