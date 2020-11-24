import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  worlds : ReplaySubject<any> = new ReplaySubject();

  constructor(
    public adminService : AdminService
  ) { }

  ngOnInit(): void {

    this.adminService.getWorlds().subscribe(worlds => {
      this.worlds.next(worlds);
      console.log("admin worlds", worlds)
    });

  }

}
