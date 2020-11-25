import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculsComponent } from './calculs.component';

describe('CalculsComponent', () => {
  let component: CalculsComponent;
  let fixture: ComponentFixture<CalculsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
