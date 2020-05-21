import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'inputMail'
})
export class InputMailPipe implements PipeTransform{

  transform(value: any, type : string): string {
    let rvalue : string = null ;
    if ( value !== null ){
      console.log(type);
      if ( type === "login" ){
        if ( value['backend'] ){
          rvalue = `problème technique` ;
        }else if ( value['emailNotExist'] === true ){
          rvalue = `email non reconnu`;
        }else if ( value['email'] === true){
          rvalue = `email invalid` ;
        }
      }else if ( type === "create" ){
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

    }
    return rvalue ;
  }


}
