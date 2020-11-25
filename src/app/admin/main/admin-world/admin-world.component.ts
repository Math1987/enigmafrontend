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

  chara : BehaviorSubject<Object> = new BehaviorSubject({ position : {x : 0, y : 0}});
  focusedCase : BehaviorSubject<Object[]> = new BehaviorSubject(null);

  constructor(
    public adminService : AdminService,
    public socketService : AdminWorldSocketService
  ) { }

  ngOnInit(): void {

    this.adminService.getWorlds().subscribe(worlds => {

      this.worlds.next(worlds);
      this.world.next(worlds[0]) ;

      this.chara.next({position : { x : 0, y : 0}});
      
      console.log("admin worlds", worlds)
    });

  }
  move(event){
    console.log('move', event);
    let newChara = this.chara.getValue();
    newChara['position']['x'] += event.x ;
    newChara['position']['y'] += event.y ;
    this.chara.next(newChara);
  }
  focus(cases){
    console.log('focusing', cases);
    this.focusedCase.next(cases);
  }
  selectWorld(){

  }

}