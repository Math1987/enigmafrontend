import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Account.ConnectionComponent } from './account.connection.component';

describe('Account.ConnectionComponent', () => {
  let component: Account.ConnectionComponent;
  let fixture: ComponentFixture<Account.ConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Account.ConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Account.ConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
