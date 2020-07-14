import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ValuesService} from '../../shared/services/values.service';

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
    private http : HttpClient,
    public valueService : ValuesService
  ) { }

  ngOnInit() {

  }

}
