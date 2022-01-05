import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dataHora' })
export class DataHoraPipe implements PipeTransform {
    constructor(private date: DatePipe) {}

    transform(value: Date | string | null | undefined) {
        const dataHora = (this.date.transform(value, "dd/MMM/yyyy H'h'mm'min'") || '').replace('.', '');
        return dataHora.endsWith(' 0h00min') ? dataHora.slice(0, -8) : dataHora;
    }
}
