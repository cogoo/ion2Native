import { Injectable, Pipe, PipeTransform } from '@angular/core';

/*
  Generated class for the NumberSplit pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'numberSplit'
})
@Injectable()
export class NumberSplit implements PipeTransform {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: any) {
    let num = value.toString();
    return num.substr(0,4)+' '+num.substr(4,4)+' '+num.substr(8,4)+' '+num.substr(12,4);
  }
}
