import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyFree'
})
export class KeyFreePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if ( value === "key" ||
    value === "x" ||
    value === "y" ||
    value === "key_" || 
    value === "id"
    ){
      return null ;
     }else{
       return value ;
     }

  }

}
