import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementSidebarComponent } from './user-management-sidebar.component';

describe('UserManagementSidebarComponent', () => {
  let component: UserManagementSidebarComponent;
  let fixture: ComponentFixture<UserManagementSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
