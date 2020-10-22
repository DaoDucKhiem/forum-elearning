import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementContentComponent } from './user-management-content.component';

describe('UserManagementContentComponent', () => {
  let component: UserManagementContentComponent;
  let fixture: ComponentFixture<UserManagementContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
