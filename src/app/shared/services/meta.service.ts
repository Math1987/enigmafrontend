import { Injectable } from '@angular/core';
import {BehaviorSubject, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  metaDatasSubject = new ReplaySubject<any>(null);
  metaDatas:any = null ;


  icons = {
    img : new Image(),
    src: 'assets/images/icons.png',
    rangeX : 16,
    rangeY : 6,
    keys: new BehaviorSubject<any>(null)
  } ;

  constructor(
    private http : HttpClient
  ) {

    this.icons.img.src = this.icons.src ;

    this.http.get<any>(`${environment.apiURL}/metadatas`).subscribe(res => {
      this.metaDatas = res ;
      this.metaDatasSubject.next(res);
    });
    this.http.get<any>(`${environment.apiURL}/metavalues`).subscribe(res => {

      let obj = {} ;
      for ( let row of res ){
        obj[row.key_] = row ;
      }
      console.log(obj) ;
      this.icons.keys.next(obj) ;
    });

  }
  getMetaDatas():any{
    return this.metaDatas;
  }
  getByType(type:string){
    let obj = {} ;
    if ( this.metaDatas[type]) {
      for (let row of this.metaDatas[type]) {
        obj[row.key_] = {...row} ;
        Reflect.deleteProperty(obj[row.key_], 'key_');
      }
    }
    return obj ;
  }
  getAll(type:string){
    let obj = {} ;
    for ( let key of Object.keys(this.metaDatas) ){
      for ( let arr of this.metaDatas[key] ){
        obj[arr.key_] = arr ;
      }
    }
    return obj ;
  }
}
