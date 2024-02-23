import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDifference'
})
export class DateDifferencePipe implements PipeTransform {
  transform(sqlDate: string): number {
    // Convert the SQL date string to a JavaScript Date object
    const inputDate = new Date(sqlDate);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const timeDifference = currentDate.getTime() - inputDate.getTime();

    // Calculate the difference in days
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    return Math.abs(daysDifference);
  }
}