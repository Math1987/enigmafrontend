import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {Observable} from 'rxjs';
import {UserModel} from '../../shared/models/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthInterceptor} from '../../shared/interceptors/auth.interceptor';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public currentUser: Observable<UserModel> ;

  constructor(
    private userService : UserService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    this.http.get(`${environment.backURL}/user`).subscribe((res)=>{
      console.log(res);
    });

    this.currentUser = this.userService.getCurrentUser();
  }

}
