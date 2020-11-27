import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { WorldViewverComponent } from 'src/app/shared/modules/world-viewver/world-viewver.component';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AdminWorldSocketService } from './admin-world-socket.service';

@Component({
  selector: 'app-admin-world',
  templateUrl: './admin-world.component.html',
  styleUrls: ['./admin-world.component.scss']
})
export class AdminWorldComponent implements OnInit {

  @ViewChild('viewver') viewver : WorldViewverComponent ;

  worlds : ReplaySubject<any> = new ReplaySubject();
  worldsActual : Object[] ;
  world : BehaviorSubject<any> = new BehaviorSubject(null);

  chara : BehaviorSubject<Object> = new BehaviorSubject({ position : {x : 0, y : 0}});
  focusedCase : BehaviorSubject<Object[]> = new BehaviorSubject(null);

  constructor(
    public adminService : AdminService,
    public socketService : AdminWorldSocketService
  ) { }

  ngOnInit(): void {

    this.worlds.subscribe( worlds => {
      this.worldsActual = worlds ;
    })

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
  selectWorld(worldName){
    for ( let ws of this.worldsActual ){
      if ( ws['name'] === worldName ) {
        this.world.next(ws) ;
        break ;
      }
    }
  }

  pass(){
    this.adminService.pass(this.world.getValue()['name']);
  }

  test(worldName, key, value){
    this.adminService.updateConstantValue(worldName, key, value, res => {
        console.log('res', res );
    });
  }

  sendUpdate(obj, key, newValue){
    console.log('send update', this.world.getValue(), obj, key, newValue);
    this.adminService.updateWorldValue(this.world.getValue()['name'], obj, key, newValue, res => {
      
      console.log(this.viewver);
      console.log('res update', res );
      if ( res ){
        this.viewver.updateObjs([res], updateRes => {
          
        });
      }

    })
  }

}