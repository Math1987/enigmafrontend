import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'CreateAccountErrorPipe'
})
export class CreateAccountErrorPipe implements PipeTransform{

  transform(value: any): string {
    console.log(value);
    let rvalue : string = null ;
    if ( value !== null ){
      if ( value['emailExist'] === true ){
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
