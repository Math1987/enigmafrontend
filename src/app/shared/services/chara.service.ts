import { AccountService } from "./account.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, ReplaySubject, Subscription } from "rxjs";
import { Chara } from "../models/chara.model";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { MetaService } from "./meta.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CharaService {
  character: BehaviorSubject<Object> = new BehaviorSubject(null);
  skills: BehaviorSubject<Object> = new BehaviorSubject(null);
  resources: BehaviorSubject<Object> = new BehaviorSubject(null);
  playTokens: BehaviorSubject<Object> = new BehaviorSubject(null);

  actualCharacter: Object = null;

  subscription: Subscription = null;

  /**
   * charaService is used only when player is connected, from player's module.
   * When charaService is instancied, it observe the currentUser
   * and when get id, ask the character to backend.
   * If got it, then build it,
   * else, navigate to creation page.
   * @param http
   * @param router
   * @param authService
   * @param userService
   */
  constructor(
    private http: HttpClient,
    private router: Router,
    private accountService: AccountService,
    private metaData: MetaService
  ) {
    this.accountService.getAccount().subscribe((account) => {
      if (account && account["chara"]) {
        this.updateLocalChara(account["chara"]);
      }
    });
    this.character.subscribe((chara) => {
      console.log(chara);
      this.actualCharacter = chara;
    });
  }
  updateLocalChara(chara: Object) {
    if (chara) {
      this.character.next(chara);
      this.metaData.metaDatasSubject.subscribe((metadatas) => {
        if (metadatas) {
          let skills = [];
          for (let row of metadatas["skill"]) {
            for (let row2 in chara) {
              if (row2 === row.key_) {
                let skill = {};
                Object.assign(skill, row);
                skill["value"] = chara[row2];
                skills.push(skill);
              }
            }
          }
          this.skills.next(skills);

          let resources = [];
          for (let row of metadatas["resource"]) {
            for (let row2 in chara) {
              if (row2 === row.key_) {
                let resource = {};
                Object.assign(resource, row);
                resource["value"] = chara[row2];
                resources.push(resource);
              }
            }
          }
          this.resources.next(resources);

          let playTokens = [];
          for (let row of metadatas["playtoken"]) {
            for (let row2 in chara) {
              if (row2 === row.key_) {
                let playToken = {};
                Object.assign(playToken, row);
                playToken["value"] = chara[row2];
                playTokens.push(playToken);
              }
            }
          }
          this.playTokens.next(playTokens);
        }
      });
    } else {
      this.skills.next(null);
      this.resources.next(null);
    }
  }

  init() {
    // this.character = new ReplaySubject<Chara>();
    // this.actualCharacter = null;
    // this.subscription = this.userService.currentUser
    //   .pipe()
    //   .subscribe((user) => {
    //     if (user !== null) {
    //       this.http
    //         .post<Chara>(`${environment.apiURL}/u/chara`, user)
    //         .subscribe(
    //           (charaRes) => {
    //             if (charaRes) {
    //               this.actualCharacter = charaRes;
    //               this.character.next(charaRes);
    //             } else {
    //               this.actualCharacter = null;
    //               this.character.next(null);
    //             }
    //           },
    //           (error) => {
    //             this.actualCharacter = null;
    //             this.character.next(null);
    //           }
    //         );
    //     } else {
    //       this.actualCharacter = null;
    //       this.character.next(null);
    //     }
    //   });
  }
  destroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = null;
  }

  create(chara: Chara) {
    return this.http.post(`${environment.apiURL}/u/chara/create`, chara).pipe(
      map((createRes) => {
        if (createRes && createRes["chara"]) {
          this.accountService.setChara(createRes["chara"]);
          this.character.next(createRes["chara"]);
        }
      })
    );
  }

  updateLocalValues(values) {
    let newChara = {};
    let oldChara = this.character.getValue();
    if (oldChara) {
      Object.assign(newChara, oldChara);
      for (let key in values) {
        if (oldChara[key]) {
          newChara[key] = values[key];
        }
      }
      this.updateLocalChara(newChara);
    }
  }

  addSkill(key_: string, adder: number) {
    return this.http
      .post(`${environment.apiURL}/u/chara/addSkill`, {
        key: key_,
        adder: adder,
      })
      .pipe(
        map((values) => {
          this.updateLocalValues(values);
        })
      );
  }
}
