import { Component, Input } from '@angular/core';
import { Task } from 'src/app/app.service';

@Component({
    selector: 'app-cards-mode',
    templateUrl: './cards-mode.component.html',
    styles: []
})
export class CardsModeComponent {
    @Input() tasks: Task[];
    constructor() {}
}
