import { Pipe, PipeTransform } from '@angular/core';
import * as numberToWords from 'number-to-words';

@Pipe({
  name: 'numberToWords'
})
export class NumberToWordsPipe implements PipeTransform {

  transform(value: number): string {
    const amount= numberToWords.toWords(value);
    return   amount.charAt(0).toUpperCase() + amount.slice(1);

// return '';
  }
  
}
