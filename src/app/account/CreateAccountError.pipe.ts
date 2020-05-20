import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'CreateAccountErrorPipe'
})
export class CreateAccountErrorPipe implements PipeTransform{

  transform(value: any): string {
    let rvalue : string = null ;
    if ( value !== null ){
      if ( value['backend'] ){
        rvalue = `problème technique` ;
      }else if ( value['emailExist'] === true ){
        rvalue = `email déjà pris`;
      }else if ( value['email'] === true){
        rvalue = `email invalid` ;
      }else if ( value['nameExist'] === true){
        rvalue = `pseudo déjà pris` ;
      }else if ( value['require'] === true){
        rvalue = `champ requis` ;
      }
    }
    return rvalue ;
  }


}
