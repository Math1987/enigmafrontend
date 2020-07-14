import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReplaySubject} from 'rxjs';
import {Chara} from '../models/chara.model';
import {environment} from '../../../environments/environment';
import {MetaService} from './meta.service';

@Injectable({
  providedIn: 'root'
})
export class ValuesService{

  values : ReplaySubject<any> = new ReplaySubject<any>(null);
  resources :  ReplaySubject<any> = new ReplaySubject<any>(null);
  skills :  ReplaySubject<any> = new ReplaySubject<any>(null);

  constructor(
    private http: HttpClient,
    private metadatas:  MetaService
  ) {
    this.http.get(`${environment.apiUserCharaURL}/values`, {responseType:'json'}).subscribe(res=>{

      this.metadatas.metaDatasSubject.subscribe( metadatas =>{

        if ( res instanceof Array){

          let datas = res.slice() ;
          let resources = [] ;
          for( let row of metadatas['resource'] ){
            for ( let row2 of datas ){
              if ( row2.key_ === row.key_ ){
                resources.push(row2);
              }
            }
          }
          this.resources.next(resources) ;

          let skills = [] ;
          for( let row of metadatas['skill'] ){
            for ( let row2 of datas ){
              if ( row2.key_ === row.key_ ){
                skills.push(row2);
              }
            }
          }
          this.skills.next(skills) ;

          this.values.next(datas);
        }


      });



    });

  }



}
