import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {BackService} from './services/back.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'enigmafrontend';

  constructor(
    private backService : BackService,
    private userService : UserService
  ){}

  ngOnInit(): void {

  }

}
