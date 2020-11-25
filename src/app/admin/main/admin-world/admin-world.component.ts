import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AdminWorldSocketService } from './admin-world-socket.service';

@Component({
  selector: 'app-admin-world',
  templateUrl: './admin-world.component.html',
  styleUrls: ['./admin-world.component.scss']
})
export class AdminWorldComponent implements OnInit {


  worlds : ReplaySubject<any> = new ReplaySubject();
  world : BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    public adminService : AdminService,
    public socketService : AdminWorldSocketService
  ) { }

  ngOnInit(): void {

    this.adminService.getWorlds().subscribe(worlds => {

      this.worlds.next(worlds);

      this.world.next(worlds[0]) ;
      
      console.log("admin worlds", worlds)
    });

  }
  selectWorld(){

  }

}