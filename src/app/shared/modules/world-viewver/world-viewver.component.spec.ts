import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldViewverComponent } from './world-viewver.component';

describe('WorldViewverComponent', () => {
  let component: WorldViewverComponent;
  let fixture: ComponentFixture<WorldViewverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldViewverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldViewverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
