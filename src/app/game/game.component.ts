import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
  }

}
