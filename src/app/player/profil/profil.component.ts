import { AccountService } from "./../../shared/services/account.service";
import { Component, OnInit } from "@angular/core";

import { CharaService } from "../../shared/services/chara.service";
import { Chara } from "../../shared/models/chara.model";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

import { Sharp } from "sharp";
import { Router } from '@angular/router';

/**
 * profil component give a visual interface containing all the user personnal informations
 * as name, email, avatar etc..
 */
@Component({
  selector: "app-profile",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.scss"],
  animations: [
    trigger("intro", [
      state(
        "normal",
        style({
          opacity: 1.0,
        })
      ),
      transition("* => normal", animate(`1s 0ms ease-out`)),
    ]),
  ],
})




export class ProfilComponent implements OnInit {


  img = null ;

  openAvatarFile() {
    let input_ = document.getElementById("avatarInputFile") as HTMLInputElement;
    input_.click();
  }

  /**
   * ProfileComponent is build when Player's module is lazy loaded (if user is connected)
   * @param userService: give the observable currentUser
   */
  constructor(
    private router : Router,
    public accountService: AccountService,
    public charaService: CharaService
  ) {}

  removeAccount(){

    if ( confirm('êtes vous certain(e) de vouloir supprimer définitivement votre accompte (et à tout jamais) ??' )){

      this.accountService.removeAccount( accountRes => {

        alert('votre compte a bien été éradiqué de façon totale et définitive.');
        this.accountService.logOut();
        this.router.navigate(['']);

      });

    }

  }

  /**
   * take the userService's currentUser observable's pointer
   */
  ngOnInit(): void {

    this.accountService.getAccount().subscribe( account => {

      if ( account['img']){
        this.img = account['img'];
      }else{
        this.img = "assets/images/humain.png";
      }

    });

  }
  
  validateImg(){

    this.accountService.updateAccount({img: this.img});

  }
  cancelImg(){
    if ( this.accountService.getActualAccount().img ){
      this.img = this.accountService.getActualAccount().img ;
    }else{
      this.img = "assets/images/humain.png"
    }
  }

  setAvatarFile( avatar ){

    console.log('ACCOUNT', this.accountService.getActualAccount());

    console.log(avatar.target.files[0]);

    let oldImg = new Image();
    oldImg.addEventListener('load', () => {

      const elem = document.createElement('canvas');
      elem.width = 128;
      elem.height = 128*(oldImg.height / oldImg.width) ;
      const ctx = elem.getContext('2d');
      ctx.drawImage(oldImg, 0, 0, 128, 128*(oldImg.height / oldImg.width));
      const data = ctx.canvas.toDataURL();

      this.img = data ;
    

    });
    oldImg.src = window.URL.createObjectURL(avatar.target.files[0]);

  }
}
