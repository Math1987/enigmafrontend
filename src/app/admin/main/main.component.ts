import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  test = new BehaviorSubject('bonjour');

  constructor(
    public adminService : AdminService
  ) { }

  ngOnInit(): void {}
  logOut(){
    this.adminService.logOut();
  }

}
