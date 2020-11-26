import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorldService {

  constructor(
    private http : HttpClient
  ) { }

  getFreeWorld(){
    return this.http.get(`${environment.apiURL}/world/getFreeWorld`) ;
  }

}
