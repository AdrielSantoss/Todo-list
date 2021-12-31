import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styles: []
})
export class LoaderComponent implements OnInit {
    @Input() content: any[];
    @Input() noContentText: string = 'Nenhum conteúdo para exibir.';
    constructor() {}

    ngOnInit(): void {}
}
