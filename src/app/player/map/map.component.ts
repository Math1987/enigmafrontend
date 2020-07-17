import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../shared/services/auth.service';
import {AuthInterceptor} from '../../shared/interceptors/auth.interceptor';

/**
 * Map component
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit() { }
}
