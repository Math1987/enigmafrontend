import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReplaySubject} from 'rxjs';
import {Chara} from '../models/chara.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService{

  resources : ReplaySubject<any> = new ReplaySubject<any>(null);

  constructor(
    private http: HttpClient
  ) {
    console.log(`${environment.apiUserCharaURL}/resources`);
    this.http.get(`${environment.apiUserCharaURL}/resources`, {responseType:'json'}).subscribe(res=>{
      console.log(res);
      this.resources.next(res);
    });

  }



}
