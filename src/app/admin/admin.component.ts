import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  test= "bonjour";

  constructor(
    public adminService : AdminService,
    public router : Router
  ) {

  }

  ngOnInit(): void {
  }
  connect(admin, password){
    console.log('connect', admin, password);
    this.adminService.login( admin ,password ,logRes => {
      if ( logRes ){
        //alert('Bienvenue cher administarteur.');

      }else{
        alert(`Vos identifiants ne sont pas correct.`);
      }

    });
  }

}
