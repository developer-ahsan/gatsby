import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateformat'
})
export class DateformatPipe implements PipeTransform {

  transform(date: any, format: string): any {
    if (date) {
     return moment(date).format(format);
    }
}

}
