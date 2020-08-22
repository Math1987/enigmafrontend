import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerConfirmComponent } from './player-confirm.component';

describe('PlayerConfirmComponent', () => {
  let component: PlayerConfirmComponent;
  let fixture: ComponentFixture<PlayerConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
