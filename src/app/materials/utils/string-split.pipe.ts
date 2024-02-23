import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class StringSplitPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if(value.includes("/"))
       return value.split("/")[1];
      return value;
  }

}
