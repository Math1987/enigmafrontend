import {Pipe, PipeTransform} from '@angular/core';
/**
 * Pipe used for connection's validators
 */
@Pipe({
  name: 'inputMail'
})
export class InputMailPipe implements PipeTransform {

  /**
   * transform : validator used for connection's forms
   * @param value: this is the error sent by the email validator
   * @param type: determine if the transform pipe focalise on "sign In" method or "sign Up".
   *  =>signIn: the email must be found in database
   *  =>signOut: the email and name must not be found in database
   */
  transform(value: any, type: string): string {
    let rvalue: string = null ;
    if ( value ) {
      if (type === 'signIn') {
        if (value.backend) {
          rvalue = `problème technique`;
        } else if (value.emailNotExist === true) {
          rvalue = `email non reconnu`;
        } else if (value.email === true) {
          rvalue = `email invalid`;
        }
      } else if (type === 'create') {
        if (value.backend) {
          rvalue = `problème technique`;
        } else if (value.emailExist === true) {
          rvalue = `email déjà pris`;
        } else if (value.email === true) {
          rvalue = `email invalid`;
        } else if (value.nameExist === true) {
          rvalue = `pseudo déjà pris`;
        } else if (value.require === true) {
          rvalue = `champ requis`;
        }
      }
    }
    return rvalue ;
  }


}
