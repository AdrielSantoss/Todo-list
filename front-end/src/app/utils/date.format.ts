import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DateFormat extends NgbDateParserFormatter {
    parse(value: string) {
        const parts = value.split('/');
        const year = parts.length > 0 ? Number(parts[0]) : 0;
        const month = parts.length > 1 ? Number(parts[1]) : 0;
        const day = parts.length > 2 ? Number(parts[2]) : 0;
        return { year, month, day };
    }

    format(date: NgbDateStruct | null) {
        return date ? `${this.padNumber(date.day)}/${this.padNumber(date.month)}/${date.year}` : '';
    }

    private padNumber(n: number) {
        let s = n.toString();
        if (s.length === 1) {
            s = '0' + s;
        }
        return s;
    }
}
