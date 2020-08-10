import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapViewverComponent } from './map-viewver.component';

describe('MapViewverComponent', () => {
  let component: MapViewverComponent;
  let fixture: ComponentFixture<MapViewverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapViewverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapViewverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
