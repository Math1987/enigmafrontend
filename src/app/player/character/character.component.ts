import { CharaService } from "./../../shared/services/chara.service";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { ValuesService } from "../../shared/services/values.service";
import { pops } from "../../shared/animations/pops";
import { map } from "rxjs/operators";

/**
 * Character component
 */
@Component({
  selector: "app-character",
  templateUrl: "./character.component.html",
  styleUrls: ["./character.component.scss"],
  animations: [pops],
})
export class CharacterComponent implements OnInit {
  skillsAnimator: string = "start";

  constructor(
    private http: HttpClient,
    public valueService: ValuesService,
    public charaService: CharaService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.skillsAnimator = "normal";
    }, 10);
  }
  gotSkillsAdder(number: number) {
    return this.charaService.character.pipe(
      map((res) => {
        if (res["xp"] < number) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
  addSkill(skill: { id: string; key_: string; value: number }, value: number) {
    this.charaService.addValue(skill.key_, value).subscribe((res) => {
      if (res && res["value"]) {
        skill.value = res["value"];
      }
    });
  }
}
