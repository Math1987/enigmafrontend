import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, ReplaySubject, Subscription } from "rxjs";
import { Chara } from "../models/chara.model";
import { environment } from "../../../environments/environment";
import { MetaService } from "./meta.service";
import { map } from "rxjs/operators";
import { CharaService } from "./chara.service";

@Injectable({
  providedIn: "root",
})
export class ValuesService {
  values = new BehaviorSubject<any>(null);
  resources = new ReplaySubject<any>(null);
  resourceActions = new ReplaySubject<any>(null);
  skills = new ReplaySubject<any>(null);

  subscription: Subscription = null;

  init() {
    if (!this.subscription || this.subscription === null) {
      this.values = new BehaviorSubject<any>(null);
      this.resources = new ReplaySubject<any>(null);
      this.skills = new ReplaySubject<any>(null);
      this.resourceActions = new ReplaySubject<any>(null);
      this.subscription = this.callValues();
    }

    this.characterService.character.subscribe((res) => {
      if (res) {
        this.tydiValues(res);
      }
      // if ( res && !this.values.getValue() ){
      //   console.log('NEED TO SET VALUES!');
      //   this.subscription = this.callValues();

      // }
    });
  }
  tydiValues(chara: Object) {
    this.metadatas.metaDatasSubject.subscribe((metadatas) => {
      let datas = {};
      Object.assign(datas, chara);
      let resources = [];
      for (let row of metadatas["resource"]) {
        for (let keyData in datas) {
          if (keyData === row.key_) {
            resources.push({ key_: keyData, value: datas[keyData] });
          }
        }
      }
      this.resources.next(resources);

      let resourceActions = [];
      for (let row of metadatas["resourceAction"]) {
        for (let key in datas) {
          if (key === row.key_) {
            resourceActions.push({ key_: key, value: datas[key] });
          }
        }
      }
      this.resourceActions.next(resourceActions);

      let skills = [];
      for (let row of metadatas["skill"]) {
        for (let key in datas) {
          if (key === row.key_) {
            skills.push({ key_: key, value: datas[key] });
          }
        }
      }
      this.skills.next(skills);

      this.values.next(datas);
    });
  }

  callValues() {
    return this.http
      .get(`${environment.apiUserCharaURL}/values`, { responseType: "json" })
      .subscribe((res) => {
        this.metadatas.metaDatasSubject.subscribe((metadatas) => {
          if (res instanceof Array) {
            let datas = res.slice();
            let resources = [];
            for (let row of metadatas["resource"]) {
              for (let row2 of datas) {
                if (row2.key_ === row.key_) {
                  resources.push(row2);
                }
              }
            }
            this.resources.next(resources);

            let resourceActions = [];
            for (let row of metadatas["resourceAction"]) {
              for (let row2 of datas) {
                if (row2.key_ === row.key_) {
                  resourceActions.push(row2);
                }
              }
            }
            this.resourceActions.next(resourceActions);

            let skills = [];
            for (let row of metadatas["skill"]) {
              for (let row2 of datas) {
                if (row2.key_ === row.key_) {
                  skills.push(row2);
                }
              }
            }
            this.skills.next(skills);

            this.values.next(datas);
          }
        });
      });
  }

  destroy() {
    this.values = null;
    this.resources = null;
    this.skills = null;
    this.subscription.unsubscribe();
    this.subscription = null;
  }

  constructor(
    private http: HttpClient,
    private metadatas: MetaService,
    private characterService: CharaService
  ) {}

  getValue(key_: string): Observable<number> {
    return this.values.pipe(
      map((res) => {
        if (res) {
          let value = 0;
          for (let key in res) {
            if (key === key_) {
              value = res[key];
              break;
            }
          }
          return value;
        } else {
          return 0;
        }
      })
    );
  }

  setValue(key_: string, value: number) {
    let newValue = this.values.getValue();
    if (newValue[key_]) {
      newValue[key_] = value;
    }
    // for (let row in newValue) {
    //   if (key === key_) {
    //     newValue[key] = value;
    //   }
    // }
    //this.values.next(newValue);
  }

  add(valueDatas: Object, adder: number) {
    valueDatas["adder"] = adder;
    return this.http.post(
      `${environment.apiUserCharaURL}/addvalue`,
      valueDatas
    );
  }

  addSkill(valueDatas: Object, adder: number) {
    valueDatas["adder"] = adder;
    return this.http.post(
      `${environment.apiUserCharaURL}/addSkill`,
      valueDatas
    );
  }
}
