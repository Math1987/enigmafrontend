import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReplaySubject} from 'rxjs';
import {Chara} from '../models/chara.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValuesService{

  values : ReplaySubject<any> = new ReplaySubject<any>(null);

  constructor(
    private http: HttpClient
  ) {
    this.http.get(`${environment.apiUserCharaURL}/values`, {responseType:'json'}).subscribe(res=>{
      this.values.next(res);
    });

  }



}
