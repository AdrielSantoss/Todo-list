import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'data' })
export class DataPipe implements PipeTransform {
    constructor(private date: DatePipe) {}

    transform(value: Date | string | null | undefined) {
        return value ? this.date.transform(value, 'dd/MMM/yyyy') : '';
    }
}
