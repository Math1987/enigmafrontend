import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

/**
 * Character component
 */
@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  constructor(
    private http : HttpClient
  ) { }

  ngOnInit() {

    this.http.get(`${environment.backURL}/u/test`).subscribe(res=>{
      console.log(res);
    });
  }

}
