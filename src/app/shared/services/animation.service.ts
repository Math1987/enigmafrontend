import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {

  public background_state : BehaviorSubject<string> = new BehaviorSubject('null') ;



  constructor() {}

}
