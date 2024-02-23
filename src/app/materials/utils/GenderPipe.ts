import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderCheck'
})
export class genderPipe implements PipeTransform {
  transform(value:string,gender:string) {
    console.log(gender);
    
    return gender==="Male"?"Mr."+value:("Mrs."+value);
  }
}