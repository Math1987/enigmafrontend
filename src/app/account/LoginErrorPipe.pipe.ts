import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'LoginErrorPipe'
})
export class LoginErrorPipePipe implements PipeTransform{

  transform(value: any): string {
    let rvalue : string = null ;
    if ( value !== null ){
      if ( value['backend'] ){
        rvalue = `problème technique` ;
      }else if ( value['emailNotExist'] === true ){
        rvalue = `email non reconnu`;
      }else if ( value['email'] === true){
        rvalue = `email invalid` ;
      }
    }
    return rvalue ;
  }


}