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
  openAvatarFile() {
    let input_ = document.getElementById("avatarInputFile") as HTMLInputElement;
    input_.click();
  }
  setAvatarFile(event) {}

  /**
   * ProfileComponent is build when Player's module is lazy loaded (if user is connected)
   * @param userService: give the observable currentUser
   */
  constructor(
    public accountService: AccountService,
    public charaService: CharaService
  ) {}

  removeAccount(){

    if ( confirm('êtes vous certain(e) de vouloir supprimer définitivement votre accompte (et à tout jamais) ??' )){

      this.accountService.removeAccount( accountRes => {

      });

    }

  }

  /**
   * take the userService's currentUser observable's pointer
   */
  ngOnInit(): void {}
}
